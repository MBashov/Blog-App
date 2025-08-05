import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentsResponse, CreatedComment } from '../../models/comment';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getCommentsByBlog(blogId: string): Observable<CommentsResponse> {
        let url = `${this.apiUrl}/comments/blog/${blogId}`;

        return this.http.get<CommentsResponse>(url);
    }

    postComment(blogId: string, content: string): Observable<CreatedComment> {
        let url = `${this.apiUrl}/comments/blog/${blogId}`;

        const accessToken: string = JSON.parse(localStorage.getItem('accessToken') || 'null');

        const headers = new HttpHeaders({
            Authorization: `Bearer ${accessToken}`
        });

        return this.http.post<CreatedComment>(url, { content }, { headers });
    }
}
