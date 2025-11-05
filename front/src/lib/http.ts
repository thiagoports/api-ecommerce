import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    withCredentials: false,
});

type TokenPair = { access: string; refresh: string };
const ACCESS_KEY = "jwt_access";
const REFRESH_KEY = "jwt_refresh";

export function getAccessToken() {
    return localStorage.getItem(ACCESS_KEY);
}
export function setTokens(tokens: TokenPair) {
    localStorage.setItem(ACCESS_KEY, tokens.access);
    localStorage.setItem(REFRESH_KEY, tokens.refresh);
}
export function clearTokens() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
}
export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
}

api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

let isRefreshing = false;
let queue: Array<() => void> = [];

api.interceptors.response.use(
    (res) => res,
    async (err) => {
        const original = err.config;
        const status = err?.response?.status;

        if (status === 401 && !original._retry) {
            original._retry = true;

            if (isRefreshing) {
                await new Promise<void>((resolve) => queue.push(resolve));
                original.headers.Authorization = `Bearer ${getAccessToken()}`;
                return api(original);
            }

            try {
                isRefreshing = true;
                const refresh = getRefreshToken();
                if (!refresh) throw new Error("No refresh token");

                const { data } = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}token/refresh/`,
                    { refresh }
                );
                setTokens({ access: data.access, refresh: refresh });
                queue.forEach((fn) => fn());
                queue = [];
                original.headers.Authorization = `Bearer ${data.access}`;
                return api(original);
            } catch (e) {
                clearTokens();
                queue.forEach((fn) => fn());
                queue = [];
                throw e;
            } finally {
                isRefreshing = false;
            }
        }

        throw err;
    }
);

export default api;
