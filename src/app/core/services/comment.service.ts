import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentResponse } from '../../models/comment';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private apiUrl = environment.apiUrl;

    constructor (private http: HttpClient) {}

    getCommentsByBlog(blogId: string): Observable<CommentResponse> {
        let url = `${this.apiUrl}/comments/blog/${blogId}`;

        return this.http.get<CommentResponse>(url);
    }
}
