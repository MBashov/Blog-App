import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

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
                formRef.reset();
            }, 
            error: (err) => {
                console.log('Login Failed', err);
            } 
        });
        
    }
}
