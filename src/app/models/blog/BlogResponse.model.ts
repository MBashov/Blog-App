import { Blog } from "./Blog.model";

export interface BlogResponse {
    blogs: Blog[],
    limit: number,
    offset: number,
    totalBlogs: number,
}

export interface singleBlogResponse {
    blog: Blog;
}