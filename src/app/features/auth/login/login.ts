import { Component, ViewChild } from '@angular/core';
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
    @ViewChild('formRef') form!: NgForm;

    constructor(private authService: AuthService, private router: Router) { }

    protected onSubmit() {
        console.log(this.form.value);
        
    }

    protected onLogin(event: Event, email: string, password: string) {
        event.preventDefault();

        this.authService.login();
        this.router.navigate(['/home']);
    }
}
