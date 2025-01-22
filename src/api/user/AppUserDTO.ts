export interface AppUserDTO {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
}

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
}