import {RegisterForm} from "./RegisterForm.ts";
import {axiosInstance} from "../../../AxiosClient.ts";
import {LoginForm} from "./LoginForm.ts";

export class AuthApiAxios {
    async register(form: RegisterForm): Promise<String> {
        const response = await axiosInstance.put<String>("/auth/register", form);
        return response.data;
    }

    async login(form: LoginForm): Promise<String> {
        const response = await axiosInstance.post<String>("/auth/login", form);
        return response.data;
    }

    async logout(): Promise<String> {
        const response = await axiosInstance.post<String>("/auth/logout");
        return response.data;
    }
}