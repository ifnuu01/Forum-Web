export interface ThreadRequest{
    title: string;
    body : string;
    category: string;
}

export interface ThreadResponse{
    status: "success" | "fail";
    message: string;
    data?: {
        thread?: {
            id: string;
            title: string;
            body: string;
            category: string;
            createdAt: string;
            ownerId: string;
            upVotesBy: string[];
            downVotesBy: string[];
            totalComments: number;
        }
    }
}

export interface GetAllThreadsResponse{
    status: "success" | "fail";
    message: string;
    data: {
        threads: Array<{
            id: string;
            title: string;
            body: string;
            category: string;
            createdAt: string;
            ownerId: string;
            upVotesBy: string[];
            downVotesBy: string[];
            totalComments: number;
        }>;
    }
}

export interface DetailThreadResponse{
    status: "success" | "fail";
    message: string;
    data: {
        detailThread: {
            id: string;
            title: string;
            body: string;
            category: string;
            createdAt: string;
            owner: {
                id: string;
                name: string;
                avatar: string;
            },
            upVotesBy: string[];
            downVotesBy: string[];
            comments: Array<{
                id: string;
                content: string;
                createdAt: string;
                owner: {
                    id: string;
                    name: string;
                    avatar: string;
                },
                upVotesBy: string[];
                downVotesBy: string[];
            }>;
        }
    }
}