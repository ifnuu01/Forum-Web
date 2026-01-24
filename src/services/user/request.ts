import axiosInstance from "../../api/client";
import type { GetAllUsersResponse, OwnProfileResponse } from "./type";

export const getAllUsers = async (): Promise<GetAllUsersResponse> => {
    const response = await axiosInstance.get<GetAllUsersResponse>("/users");
    return response.data;
}

export const getOwnProfile = async (): Promise<OwnProfileResponse> => {
    const response = await axiosInstance.get<OwnProfileResponse>("/users/me");
    return response.data;
}