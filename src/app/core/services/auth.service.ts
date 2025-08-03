import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { UserAuthResponse, User, UpdateUserResponse, accessToken } from '../../models/user';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = environment.apiUrl;
    private _isLoggedIn = signal<boolean>(false);
    private _currentUser = signal<User | null>(null);

    public isLoggedIn = this._isLoggedIn.asReadonly();
    public currentUser = this._currentUser.asReadonly();

    constructor(private httpClient: HttpClient, private router: Router) {
        const savedUser = localStorage.getItem('currentUser');

        if (savedUser) {
            const user = JSON.parse(savedUser);
            this._currentUser.set(user);
            this._isLoggedIn.set(true);
        }
    }

    register(
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ): Observable<User> {
        const url: string = `${this.apiUrl}/auth/register`;

        return this.httpClient.post<UserAuthResponse>(url, { firstName, lastName, email, password }).pipe(
            map((response: UserAuthResponse) => {
                this._currentUser.set(response.user);
                this._isLoggedIn.set(true);

                localStorage.setItem('accessToken', JSON.stringify(response.accessToken));
                localStorage.setItem('currentUser', JSON.stringify(response.user));

                return response.user;
            })
        )
    };

    login(email: string, password: string): Observable<User> {
        const url: string = `${this.apiUrl}/auth/login`;

        return this.httpClient.post<UserAuthResponse>(url, { email, password }).pipe(
            map((response: UserAuthResponse) => {
                this._currentUser.set(response.user);
                this._isLoggedIn.set(true);

                localStorage.setItem('accessToken', JSON.stringify(response.accessToken));
                localStorage.setItem('currentUser', JSON.stringify(response.user));

                return response.user;
            })
        );
    };

    refreshToken(): Observable<string> {
        const url: string = `${this.apiUrl}/auth/refresh-token`;
        const expiredAccessToken = JSON.parse(localStorage.getItem('accessToken') || 'null');

        const headers = new HttpHeaders({
            Authorization: `Bearer ${expiredAccessToken}`
        });
        return this.httpClient.post<accessToken>(url, {}, { headers }).pipe(
            map((response: accessToken) => {
                localStorage.setItem('accessToken', JSON.stringify(response.accessToken));

                return response.accessToken;
            })
        )
    };

    logout(sendRequest = true): Observable<void> {
        if (!sendRequest) {
            this.localLogout();
            return of(void 0);
        }

        const url: string = `${this.apiUrl}/auth/logout`;
        const accessToken: string = JSON.parse(localStorage.getItem('accessToken') || 'null');
        if (!accessToken) {
            this.localLogout();
            return of(void (0));
        }

        const headers = new HttpHeaders({
            Authorization: `Bearer ${accessToken}`
        });


        return this.httpClient.post<void>(url, {}, { headers }).pipe(
            tap(() => {
                this._currentUser.set(null);
                this._isLoggedIn.set(false);
                localStorage.removeItem('currentUser');
                localStorage.removeItem('accessToken');
            }));
    }


    updateUser(user: User): Observable<User> {
        const url: string = `${this.apiUrl}/users/current`;

        return this.httpClient.put<UpdateUserResponse>(url, { user }, {
            withCredentials: true //TODO Fix the accessToken token
        }).pipe(
            map((response: UpdateUserResponse) => {
                this._currentUser.set(response.user);

                // localStorage.setItem('accessToken', JSON.stringify(response.accessToken));
                localStorage.setItem('currentUser', JSON.stringify(response.user));

                return response.user;
            })
        );
    };

    private localLogout(): void {
        this._currentUser.set(null);
        this._isLoggedIn.set(false);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('accessToken');
        this.router.navigate(['/']);
    }
}

