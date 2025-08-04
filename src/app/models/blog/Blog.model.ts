export type Banner = {
    publicId: string,
    url: string,
    width: string,
    height: string,
}

type Author = {
    _id: string,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
}

export interface Blog  {
    title: string,
    slug: string,
    content: string,
    banner: Banner,
    author: Author,
    viewsCount: number,
    likesCount: number,
    commentsCount: number,
    publishedAt: Date,
    updatedAt: Date,
    _id: string,
    status: 'draft' | 'published',
}