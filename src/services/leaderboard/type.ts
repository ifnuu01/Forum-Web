export interface LeaderboardResponse {
    status: "success" | "fail";
    message: string;
    data: {
        leaderboard: Array<{
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