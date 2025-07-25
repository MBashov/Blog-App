import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor (private http: HttpClient) {}

    getAllBlogs() {
        const url = `${environment.apiUrl}/blogs`;
        return this.http.get(url);
    }
}
