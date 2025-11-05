import { useMutation } from "@tanstack/react-query";
import { login, register, logout } from "../services/auth.service";

export const useLogin = () =>
    useMutation({
        mutationFn: ({ username, password }: { username: string; password: string }) =>
            login(username, password),
    });

export const useRegister = () =>
    useMutation({
        mutationFn: (payload: {
            username: string;
            password: string;
            email?: string;
            first_name?: string;
            last_name?: string;
        }) => register(payload),
    });

export { logout };
