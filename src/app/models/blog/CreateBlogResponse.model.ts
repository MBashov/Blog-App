import { Banner } from "./Blog.model";

export interface CreateBlogResponse {
    code: {
        title: string,
        slug: string,
        content: string,
        banner: Banner,
        author: string,
        viewsCount: number,
        likesCount: number,
        commentsCount: number,
        publishedAt: Date,
        updatedAt: Date,
        _id: string,
        status: 'draft' | 'published',
    }
}