import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { environment } from '../../environments/environment.development';
import { UserAuthResponse, User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = environment.apiUrl;
    private _isLoggedIn = signal<boolean>(false);
    private _currentUser = signal<User | null>(null);

    public isLoggedIn = this._isLoggedIn.asReadonly();
    public currentUser = this._currentUser.asReadonly();

    constructor(private httpClient: HttpClient) {
        const savedUser = localStorage.getItem('currentUser');

        if (savedUser) {
            const user = JSON.parse(savedUser);
            this._currentUser.set(user);
            this._isLoggedIn.set(true);
        }
    }

    login(email: string, password: string): Observable<User> {
        const url: string = `${this.apiUrl}/auth/login`;

        return this.httpClient.post<UserAuthResponse>(url, { email, password }).pipe(
            map((response: UserAuthResponse) => {
                this._currentUser.set(response.user);
                this._isLoggedIn.set(true);

                localStorage.setItem('accessToken', response.accessToken);
                localStorage.setItem('currentUser', JSON.stringify(response.user));

                return response.user;
            }));
    }

    logout(): Observable<void> {
        const url: string = `${this.apiUrl}/auth/logout`;
        const token = localStorage.getItem('accessToken') as string;

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        return this.httpClient.post<void>(url, {}, { headers }).pipe(
            tap(() => {
                this._currentUser.set(null);
                this._isLoggedIn.set(false);
                localStorage.removeItem('currentUser');
                localStorage.removeItem('accessToken');
            }));
    }
}