import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BlogResponse, singleBlogResponse } from '../../models/blog';
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

    addBlog(title: string, slug: string, content: string, images: string, status: string) {
        const url = `${this.apiUrl}/blogs`;
        const payload = {
            title, 
            slug, 
            content, 
            images, 
            status,
        }
        return this.http.post(url, payload);
    }
}
