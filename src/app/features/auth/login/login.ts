import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../core/services/auth.service';
import { SnackbarService } from '../../../core/services';

@Component({
    selector: 'app-login',
    imports: [RouterLink, FormsModule, CommonModule],
    templateUrl: './login.html',
    styleUrl: './login.css'
})
export class Login {
    protected hasError: boolean = false;
    protected password: string = '';

    constructor(
        private authService: AuthService, 
        private router: Router,
        private snackbar: SnackbarService,
    ) { }

    protected onPasswordBlur(control: NgModel): void {
        if (control.touched && this.hasError) {
            this.hasError = false;
        }
    }

    protected onLogin(formRef: NgForm): void {
        const { email, password } = formRef.form.value;

        this.authService.login(email, password).subscribe({
            next: () => {
                this.router.navigate(['/home']);
                formRef.reset();
                this.snackbar.show('Login successful', 'success')
            },
            error: (err) => {
                this.hasError = true;
                this.password = '';

                const passwordControl = formRef.controls['password'];
                if (passwordControl) {
                    passwordControl.markAsUntouched();
                    passwordControl.updateValueAndValidity();
                }
            }
        });
    }
}
