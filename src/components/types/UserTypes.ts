export interface IUser {
    id: string,
    email: string,
    role: string
}

export interface IResponse {
    user: IUser,
    accessToken: string,
    refreshToken: string,
}