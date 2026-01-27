import axiosInstance from '../../api/client'
import type { ThreadRequest, ThreadResponse, GetAllThreadsResponse, DetailThreadResponse } from './type'

export const createThread = async (payload: ThreadRequest): Promise<ThreadResponse> => {
  const response = await axiosInstance.post<ThreadResponse>('/threads', payload)
  return response.data
}

export const getAllThreads = async (): Promise<GetAllThreadsResponse> => {
  const response = await axiosInstance.get<GetAllThreadsResponse>('/threads')
  return response.data
}

export const getDetailThread = async (id: string): Promise<DetailThreadResponse> => {
  const response = await axiosInstance.get<DetailThreadResponse>(`/threads/${id}`)
  return response.data
}