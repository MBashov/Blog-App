export interface Comment {
    _id: string,
    blogId: string,
    author: {
        _id: string,
        firstName: string,
        lastName: string
    },
    content: string,
    publishedAt: Date,
    updatedAt: Date,
}