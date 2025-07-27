import { Injectable } from '@angular/core';
import { UserForAut } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    USER_KEY: string = '[user]';
    user: UserForAut | null = null;

    constructor() {
        try {
            const lsUser = localStorage.getItem(this.USER_KEY) || '';
            this.user = JSON.parse(lsUser);
        } catch (error) {
            this.user = null;
        }
    }


    public get isLoggedIn(): boolean {
        return !!this.user;
    }

    login() {
        this.user = {
            firstName: 'John',
            email: 'john@doe.mail.com',
            password: '1234',
            id: '123456ads123dsa2',
        }
        localStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
    }

    logout() {
        this.user = null;
        localStorage.removeItem(this.USER_KEY);
    }
}
