import { User } from "./User.model";

export interface UserAuthResponse {
    user: User,
    accessToken: string,
}

export interface accessToken {
    accessToken: string
}