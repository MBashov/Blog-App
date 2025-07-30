import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    imports: [RouterLink, FormsModule],
    templateUrl: './login.html',
    styleUrl: './login.css'
})
export class Login {

    constructor(private authService: AuthService, private router: Router) { }

    protected onLogin(formRef: NgForm) {
        console.log(formRef.form.value);
        
        this.authService.login();
        this.router.navigate(['/home']);
    }
}
