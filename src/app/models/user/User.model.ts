export interface User {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    _id: string,
    role?: string,
    socialLinks?: string,
} 

export interface UpdateUserResponse {
    user: User
}