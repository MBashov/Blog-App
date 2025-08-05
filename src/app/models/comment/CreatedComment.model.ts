export interface CreatedComment {
    comment: {
        _id: string,
        blogId: string,
        author: string,
        content: string,
        publishedAt: Date,
        updatedAt: Date,
    }
}