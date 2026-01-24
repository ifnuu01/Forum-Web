export interface RegisterRequest {
    name: string;
    email  : string;
    password: string;
}

export interface RegisterResponse {
    status: "success" | "fail";
    message: string;
    data?: {
        user?: {
            id: string;
            name: string;
            email: string;
            avatar: string;
        }
    }
}

export interface LoginRequest {
    email : string;
    password: string;
}

export interface LoginResponse {
    status: "success" | "fail";
    message: string;
    data?: {
        token?: string;
    }
}