export interface LeaderboardResponse {
    status: 'success' | 'fail';
    message: string;
    data: {
        leaderboards: Array<{
            user: {
                id: string;
                name: string;
                email: string;
                avatar: string;
            },
            score: number;
        }>;
    }
}