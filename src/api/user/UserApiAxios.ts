import {AppUserDTO} from "./AppUserDTO.ts";
import {axiosInstance} from "../../../AxiosClient.ts";
import {EditUserForm} from "./EditUserForm.ts";

export class UserApiAxios {
    async getUserByEmail(email: string): Promise<AppUserDTO> {
        const response = await axiosInstance.get<AppUserDTO>(`/users/getByEmail/${email}`)
        return response.data;
    }

    async getUserById(id: string): Promise<AppUserDTO> {
        const response = await axiosInstance.get<AppUserDTO>(`/users/${id}`)
        return response.data;
    }

    async editUser(id: string, form: EditUserForm): Promise<AppUserDTO> {
        const response = await axiosInstance.put<AppUserDTO>(`/users/${id}`, form);
        return response.data;
    }
}