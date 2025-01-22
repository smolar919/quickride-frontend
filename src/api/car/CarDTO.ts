import {CarCategory} from "./AddCarForm.ts";

export interface CarDTO {
    id: string;
    make: string;
    model: string;
    year: number;
    pricePerDay: number;
    category: CarCategory;
    available: boolean;
}