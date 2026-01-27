import axiosInstance from '../../api/client'
import type { CommentRequest, CommentResponse } from './type'

export const createComment = async (threadId: string, payload: CommentRequest): Promise<CommentResponse> => {
  const response = await axiosInstance.post<CommentResponse>(`/threads/${threadId}/comments`, payload)
  return response.data
}