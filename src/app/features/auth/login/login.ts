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
        const { email, password } = formRef.form.value;
        
        this.authService.login(email, password).subscribe({
            next: () => {
                this.router.navigate(['/home'])
            }, 
            error: (err) => {
                console.log('Login Failed', err);
            } 
        });
        
    }
}
