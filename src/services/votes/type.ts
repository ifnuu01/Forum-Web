export interface UpVoteThreadResponse {
    status: 'success' | 'fail';
    message: string;
    data: {
        vote: {
            id: string;
            userId: string;
            threadId: string;
            voteType: 1;
        }
    }
}

export interface DownVoteThreadResponse {
    status: 'success' | 'fail';
    message: string;
    data: {
        vote: {
            id: string;
            userId: string;
            threadId: string;
            voteType: -1;
        }
    }
}

export interface NeutralVoteThreadResponse {
    status: 'success' | 'fail';
    message: string;
    data: {
        vote: {
            id: string;
            userId: string;
            threadId: string;
            voteType: 0;
        }
    }
}

export interface UpVoteCommentResponse {
    status: 'success' | 'fail';
    message: string;
    data: {
        vote: {
            id: string;
            userId: string;
            commentId: string;
            voteType: 1;
        }
    }
}

export interface DownVoteCommentResponse {
    status: 'success' | 'fail';
    message: string;
    data: {
        vote: {
            id: string;
            userId: string;
            commentId: string;
            voteType: -1;
        }
    }
}

export interface NeutralVoteCommentResponse {
    status: 'success' | 'fail';
    message: string;
    data: {
        vote: {
            id: string;
            userId: string;
            commentId: string;
            voteType: 0;
        }
    }
}