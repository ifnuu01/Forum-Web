export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

export interface RegisterRequest {
    name: string;
    email  : string;
    password: string;
}

export interface RegisterResponse {
    status: "success" | "fail";
    message: string;
    data?: {
        user?: User;
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

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}