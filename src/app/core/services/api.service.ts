import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BlogResponse, CreateBlogResponse, singleBlogResponse } from '../../models/blog';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAllBlogs(limit?: number): Observable<BlogResponse> {
        let url = `${this.apiUrl}/blogs`;

        if (limit) {
            url += `?limit=${limit}`;
        }

        return this.http.get<BlogResponse>(url);
    }

    getSingleBLog(slug: string): Observable<singleBlogResponse> {
        const url = `${this.apiUrl}/blogs/${slug}`;

        return this.http.get<singleBlogResponse>(url);
    }

    createBlog(formData: FormData): Observable<CreateBlogResponse> {
        const url = `${this.apiUrl}/blogs`;
        const accessToken = JSON.parse(localStorage.getItem('accessToken') || 'nul');
        
        const headers = new HttpHeaders({
            Authorization: `Bearer ${accessToken}`
        });

        return this.http.post<CreateBlogResponse>(url, formData, { headers });
    }

    updateBlog(formData: FormData, blogId: string): Observable<singleBlogResponse> {
        const url = `${this.apiUrl}/blogs/${blogId}`;
        const accessToken = JSON.parse(localStorage.getItem('accessToken') || 'nul');
        
        const headers = new HttpHeaders({
            Authorization: `Bearer ${accessToken}`
        });

        return this.http.put<singleBlogResponse>(url, formData, { headers });
    }

    deleteBlog(blogId: string): Observable<void> {
        const url = `${this.apiUrl}/blogs/${blogId}`;
        const accessToken = JSON.parse(localStorage.getItem('accessToken') || 'nul');
        
        const headers = new HttpHeaders({
            Authorization: `Bearer ${accessToken}`
        });

        return this.http.delete<void>(url, { headers });
    }
}
