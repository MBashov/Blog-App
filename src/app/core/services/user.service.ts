import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

import { UpdateUserResponse, User } from "../../models/user";
import { environment } from "../../../environments/environment.development";
import { authHeaders } from "../../shared/utils";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = environment.apiUrl;

    constructor(private httpClient: HttpClient,) { }

    updateUser(firstName: string | undefined, lastName: string | undefined, email: string | undefined)
        : Observable<UpdateUserResponse> {
            
        const url: string = `${this.apiUrl}/users/current`;
        const headers = authHeaders();

        return this.httpClient.put<UpdateUserResponse>(url, { firstName, lastName, email }, { headers });
    };
}






