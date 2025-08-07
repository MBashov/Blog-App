import { Blog } from "../blog";

export interface CommentWithAuthor {
    _id: string,
    blogId: Blog,
    author: {
        _id: string,
        firstName: string,
        lastName: string
    },
    content: string,
    publishedAt: Date,
    updatedAt: Date,
}

export interface MyCommentsResponse {
    comments: CommentWithAuthor[]
}