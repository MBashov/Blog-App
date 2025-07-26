type Banner = {
    publicId: string,
    url: string,
    width: string,
    height: string,
}

type Author = {
    name: string,
    lastName: string,
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
    status: 'draft' | 'published',
}

export interface BlogResponse {
    blogs: Blog[],
    limit: number,
    offset: number,
    totalBlogs: number,
}