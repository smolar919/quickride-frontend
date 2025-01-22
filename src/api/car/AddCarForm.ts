export interface AddCarForm {
    make: string;
    model: string;
    year: number;
    pricePerDay: number;
    category: CarCategory;
}

export enum CarCategory {
    ECONOMY = 'ECONOMY',
    COMPACT = 'COMPACT',
    LUXURY = 'LUXURY',
    SUV = 'SUV',
}