import axiosInstance from '../../api/client';
import type {
  UpVoteThreadResponse,
  DownVoteThreadResponse,
  NeutralVoteThreadResponse,
  UpVoteCommentResponse,
  DownVoteCommentResponse,
  NeutralVoteCommentResponse
} from './type';


export const upVoteThread = async (threadId: string): Promise<UpVoteThreadResponse> => {
  const response = await axiosInstance.post<UpVoteThreadResponse>(`/threads/${threadId}/up-vote`);
  return response.data;
};

export const downVoteThread = async (threadId: string): Promise<DownVoteThreadResponse> => {
  const response = await axiosInstance.post<DownVoteThreadResponse>(`/threads/${threadId}/down-vote`);
  return response.data;
};

export const neutralVoteThread = async (threadId: string): Promise<NeutralVoteThreadResponse> => {
  const response = await axiosInstance.post<NeutralVoteThreadResponse>(`/threads/${threadId}/neutral-vote`);
  return response.data;
};

export const upVoteComment = async (threadId: string, commentId: string): Promise<UpVoteCommentResponse> => {
  const response = await axiosInstance.post<UpVoteCommentResponse>(`/threads/${threadId}/comments/${commentId}/up-vote`);
  return response.data;
};

export const downVoteComment = async (threadId: string, commentId: string): Promise<DownVoteCommentResponse> => {
  const response = await axiosInstance.post<DownVoteCommentResponse>(`/threads/${threadId}/comments/${commentId}/down-vote`);
  return response.data;
};

export const neutralVoteComment = async (threadId: string, commentId: string): Promise<NeutralVoteCommentResponse> => {
  const response = await axiosInstance.post<NeutralVoteCommentResponse>(`/threads/${threadId}/comments/${commentId}/neutral-vote`);
  return response.data;
};