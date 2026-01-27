import axiosInstance from '../../api/client'
import type { LeaderboardResponse } from './type'

export const getLeaderboard = async (): Promise<LeaderboardResponse> => {
  const response = await axiosInstance.get<LeaderboardResponse>('/leaderboards')
  return response.data
}