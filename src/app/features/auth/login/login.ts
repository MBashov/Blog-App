import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-login',
    imports: [RouterLink],
    templateUrl: './login.html',
    styleUrl: './login.css'
})
export class Login {
    constructor (private authService: AuthService, private router: Router) { }

    onLogin(event: Event, email: string, password: string) {
        event.preventDefault();
        
        this.authService.login();
        this.router.navigate(['/home']);
    }
}
