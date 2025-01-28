import {CarDTO} from "../car/CarDTO.ts";
import {AppUserDTO} from "../user/AppUserDTO.ts";

export interface ReservationDTO {
    id: string;
    startDate: Date;
    endDate: Date;
    user: AppUserDTO;
    car: CarDTO;
    confirmed: boolean;
    fullPrice: number;
}