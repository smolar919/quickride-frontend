import {CreateReservationForm} from "./CreateReservationForm.ts";
import {ReservationDTO} from "./ReservationDTO.ts";
import {axiosInstance} from "../../../AxiosClient.ts";
import {EditReservationForm} from "./EditReservationForm.ts";

export class ReservationApiAxios {
    async createReservation(form: CreateReservationForm): Promise<ReservationDTO> {
        const response = await axiosInstance.post<ReservationDTO>("/reservations", form);
        return response.data;
    }

    async getUserReservations(userId: string): Promise<ReservationDTO[]> {
        const response = await axiosInstance.get<ReservationDTO[]>(`/reservations/user/${userId}`);
        return response.data;
    }

    async getReservationById(id: string): Promise<ReservationDTO> {
        const response = await axiosInstance.get<ReservationDTO>(`/reservations/${id}`);
        return response.data;
    }

    async editReservation(id: string, form: EditReservationForm): Promise<ReservationDTO> {
        const response = await axiosInstance.put<ReservationDTO>(`/reservations/${id}`, form);
        return response.data;
    }

    async getAllReservations() : Promise<ReservationDTO[]> {
        const response = await axiosInstance.get<ReservationDTO[]>(`/reservations/all`);
        return response.data;
    }
}