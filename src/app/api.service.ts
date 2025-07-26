import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { BlogResponse } from './models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }

    getAllBlogs(limit?: number): Observable<BlogResponse> {
        let url = `${environment.apiUrl}/blogs`;

        if (limit) {
            url += `?limit=${limit}`;
        }

        return this.http.get<BlogResponse>(url);
    }
}
