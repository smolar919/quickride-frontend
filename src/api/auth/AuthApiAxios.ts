import {RegisterForm} from "./RegisterForm.ts";
import {axiosInstance} from "../../../AxiosClient.ts";
import {LoginForm} from "./LoginForm.ts";

export class AuthApiAxios {
    async register(form: RegisterForm): Promise<string> {
        const response = await axiosInstance.post<string>("/auth/register", form);
        return response.data;
    }

    async login(form: LoginForm): Promise<string> {
        const response = await axiosInstance.post<string>("/auth/login", form);
        return response.data;
    }

    async logout(): Promise<string> {
        const response = await axiosInstance.post<string>("/auth/logout");
        return response.data;
    }
}