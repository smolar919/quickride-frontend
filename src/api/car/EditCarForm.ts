import {CarCategory} from "./AddCarForm.ts";

export interface EditCarForm {
    make: string;
    model: string;
    year: number;
    pricePerDay: number;
    category: CarCategory;
}