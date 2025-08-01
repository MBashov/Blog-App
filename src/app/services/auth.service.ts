import { Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';
import { UserAuthResponse, User } from '../models/user';
import { HttpClient } from '@angular/common/http';

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
                this._currentUser.set(response.user)
                this._isLoggedIn.set(true)

                localStorage.setItem('accessToken', response.accessToken)
                localStorage.setItem('currentUser', JSON.stringify(response.user))

                return response.user;
            }));
    }

    logout() {
        this._currentUser.set(null);
        localStorage.removeItem('currentUser');
    }
}