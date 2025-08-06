import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { UserAuthResponse, User, UpdateUserResponse, accessToken } from '../../models/user';
import { Router } from '@angular/router';
import { authHeaders, getAccessToken } from '../../shared/utils';

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

        return this.httpClient.post<UserAuthResponse>(
            url,
            { email, password },
            { withCredentials: true })
            .pipe(
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
        const headers: HttpHeaders = authHeaders();

        return this.httpClient.post<accessToken>(url, {}, { headers, withCredentials: true }).pipe(
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
        const accessToken: string | null = getAccessToken();
        if (!accessToken) {
            this.localLogout();
            return of(void (0));
        }

        const headers: HttpHeaders = authHeaders();


        return this.httpClient.post<void>(url, {}, { headers, withCredentials: true }).pipe(
            tap(() => {
                this.localLogout();
            }),
            catchError(err => {
                this.localLogout();
                return throwError(() => err);
            })
        );
    }


    updateUser(user: User): Observable<User> {
        const url: string = `${this.apiUrl}/users/current`;

        return this.httpClient.put<UpdateUserResponse>(url, { user }, {
            withCredentials: true //TODO Fix the accessToken token
        }).pipe(
            map((response: UpdateUserResponse) => {
                this._currentUser.set(response.user);
                localStorage.setItem('currentUser', JSON.stringify(response.user));

                return response.user;
            })
        );
    };

    isAuthor(authorId: string): boolean {
        const currentUser: User | null = JSON.parse(localStorage.getItem('currentUser') || 'nul');

        if (currentUser) {
            return authorId === currentUser._id
        } else {
            return false;
        }
    }

    private localLogout(): void {
        this._currentUser.set(null);
        this._isLoggedIn.set(false);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('accessToken');
        this.router.navigate(['/']);
    }
}

//TODO  Set up an HTTP Interceptor to handle tokens globally.