export interface UpdatedComment {
    comment: {
        _id: string,
        author: string,
        content: string,
        updatedAt: Date,
    }
}