import axiosInstance from "../../api/client";
import type { LoginRequest, RegisterRequest, LoginResponse, RegisterResponse } from "./type";

export const register = async (payload: RegisterRequest): Promise<RegisterResponse> => {
    const response = await axiosInstance.post<RegisterResponse>("/register", payload);
    return response.data;
}

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>("/login", payload);
    return response.data;
}


