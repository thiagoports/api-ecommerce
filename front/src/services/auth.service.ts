import api, { setTokens, clearTokens } from "../lib/http";
import type { LoginResponse } from "../types/api";

export async function login(username: string, password: string) {
    const { data } = await api.post<LoginResponse>("token/", { username, password });
    setTokens({ access: data.access, refresh: data.refresh });
    return data;
}

export async function register(payload: {
    username: string;
    password: string;
    email?: string;
    first_name?: string;
    last_name?: string;
}) {
    console.log(payload)
    const { data } = await api.post("v1/register/", payload);

    console.log(data)
    return data;
}

export function logout() {
    clearTokens();
}
