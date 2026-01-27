export interface GetAllUsersResponse {
    status: 'success' | 'fail';
    message: string;
    data: {
        users: Array<{
            id: string;
            name: string;
            email: string;
            avatar: string;
        }>;
    }
}

export interface OwnProfileResponse {
    status: 'success' | 'fail';
    message: string;
    data: {
        user: {
            id: string;
            name: string;
            email: string;
            avatar: string;
        }
    }
}