import {CarDTO} from "../car/CarDTO.ts";
import {UserDTO} from "../user/AppUserDTO.ts";

export interface ReservationDTO {
    id: string;
    startDate: Date;
    endDate: Date;
    user: UserDTO;
    car: CarDTO;
    confirmed: boolean;
}