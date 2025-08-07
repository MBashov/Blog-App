import { Blog } from "../blog";

export interface Like {
    _id: string,
    blogId: Blog
    userId: string,
}