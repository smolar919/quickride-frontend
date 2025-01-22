import {CarDTO} from "./CarDTO.ts";
import {axiosInstance} from "../../../AxiosClient.ts";
import {AddCarForm} from "./AddCarForm.ts";
import {EditCarForm} from "./EditCarForm.ts";

export class CarApiAxios {
    async getAvailableCars() : Promise<CarDTO[]> {
        const response = await axiosInstance.get<CarDTO[]>("/cars/available");
        return response.data;
    }

    async addCar(form: AddCarForm): Promise<CarDTO> {
        const response = await axiosInstance.post<CarDTO>("/cars", form);
        return response.data;
    }

    async getCarById(id: string): Promise<CarDTO> {
        const response = await axiosInstance.get<CarDTO>(`/cars/${id}`);
        return response.data;
    }

    async getAllCars(): Promise<CarDTO[]> {
        const response = await axiosInstance.get<CarDTO[]>("/cars");
        return response.data;
    }

    async editCar(id: string, form: EditCarForm): Promise<CarDTO> {
        const response = await axiosInstance.put<CarDTO>(`/cars/${id}`, form);
        return response.data;
    }
}