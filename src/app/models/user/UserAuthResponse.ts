import { User } from "./User";

export interface UserAuthResponse {
    user: User,
    accessToken: string,
}