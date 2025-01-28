import {jwtDecode} from "jwt-decode";

export class AuthStorage {
    private static TOKEN_KEY = 'auth_token';

    static saveToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    static getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    static clearToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    static isAuthenticated(): boolean {
        return !!this.getToken();
    }
}

interface DecodedToken {
    sub: string;
    exp: number;
}

export function getUserId(): string | null {
    const token = AuthStorage.getToken();
    if (token) {
        try {
            const decoded = jwtDecode<DecodedToken>(token);
            return decoded.sub;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    } else {
        console.error('Token not found');
        return null;
    }
}
