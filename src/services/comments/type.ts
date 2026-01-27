export interface CommentRequest {
    content: string;
}

export interface CommentResponse {
    status: 'success' | 'fail';
    message: string;
    data: {
        comment: {
            id: string;
            content: string;
            createdAt: string;
            upVotesBy: string[];
            downVotesBy: string[];
            owner: {
                id: string;
                name: string;
                email: string;
            }
        }
    }
}