import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Blog, BlogResponse, CreateBlogResponse, singleBlogResponse } from '../../models/blog';
import { Observable } from 'rxjs';
import { authHeaders } from '../../shared/utils';
import { LikeResponse } from '../../models/likes';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAllBlogs(limit?: number, offset?: number): Observable<BlogResponse> {
        let url = `${this.apiUrl}/blogs`;

        if (limit) {
            url += `?limit=${limit}`;
        } else if (offset) {
            url += `&offset=${offset}`;
        }

        return this.http.get<BlogResponse>(url);
    }

    getPopularBlogs(limit: number): Observable<{ blogs: Blog[] }> {
        let url = `${this.apiUrl}/blogs/popular`;

        if (limit) {
            url += `?limit=${limit}`;
        }

        return this.http.get<{ blogs: Blog[] }>(url);
    }

    searchBlogs(query: string): Observable<{ blogs: Blog[] }> {
        let url = `${this.apiUrl}/blogs/search?q=${query}`;

        return this.http.get<{ blogs: Blog[] }>(url);
    }

    getSingleBLog(slug: string): Observable<singleBlogResponse> {
        const url = `${this.apiUrl}/blogs/${slug}`;

        return this.http.get<singleBlogResponse>(url);
    }

    getBlogsByUser(userId: string): Observable<BlogResponse> {
        let url = `${this.apiUrl}/blogs/user/${userId}`;

        return this.http.get<BlogResponse>(url);
    }

    createBlog(formData: FormData): Observable<CreateBlogResponse> {
        const url = `${this.apiUrl}/blogs`;
        const headers: HttpHeaders = authHeaders();

        return this.http.post<CreateBlogResponse>(url, formData, { headers });
    }

    updateBlog(formData: FormData, blogId: string): Observable<singleBlogResponse> {
        const url = `${this.apiUrl}/blogs/${blogId}`;
        const headers: HttpHeaders = authHeaders();

        return this.http.put<singleBlogResponse>(url, formData, { headers });
    }

    deleteBlog(blogId: string): Observable<void> {
        const url = `${this.apiUrl}/blogs/${blogId}`;
        const headers: HttpHeaders = authHeaders();

        return this.http.delete<void>(url, { headers });
    }

    checkHasLiked(blogId: string): Observable<{ hasLiked: boolean }> {
        const url = `${this.apiUrl}/likes/blog/${blogId}/has-liked`;
        const headers: HttpHeaders = authHeaders();

        return this.http.get<{ hasLiked: boolean }>(url, { headers });
    }

    likeBlog(blogId: string): Observable<{ likesCount: number }> {
        const url = `${this.apiUrl}/likes/blog/${blogId}`;
        const headers: HttpHeaders = authHeaders();

        return this.http.post<{ likesCount: number }>(url, null, { headers });
    }

    unLikeBlog(blogId: string): Observable<{ likesCount: number }> {
        const url = `${this.apiUrl}/likes/blog/${blogId}`;
        const headers: HttpHeaders = authHeaders();

        return this.http.delete<{ likesCount: number }>(url, { headers });
    }

    getMyLikes(): Observable<LikeResponse> {
        let url = `${this.apiUrl}/likes/user/current`;

        return this.http.get<LikeResponse>(url);
    }

}
