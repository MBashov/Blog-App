import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm, NgModel } from '@angular/forms';

import { AuthService } from '../../../core/services';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-register',
    imports: [RouterLink, FormsModule, CommonModule],
    templateUrl: './register.html',
    styleUrl: './register.css'
})
export class Register {
    @ViewChild('formRef') registerForm!: NgForm;
    
    protected password: string = '';
    protected confirmPassword: string = '';
    protected hasError: boolean = false;
    protected hasEmailError: boolean = false;

    constructor(private authService: AuthService, private router: Router) { }

    protected onPasswordBlur(control: NgModel): void {
        if (control.touched && this.hasError) {
            this.hasError = false;
            this.hasEmailError = false;
        }
    }

    protected onSubmit(): void | boolean {
        const { firstName, lastName, email, password, confirmPassword } = this.registerForm.form.value;

        if (password !== confirmPassword) {
            return this.hasError = true; 
        }

        this.authService.register(firstName, lastName, email, password).subscribe({
            next: () => {
                this.router.navigate(['/home']);
                this.registerForm.reset();
            },
            error: (err) => {
                console.log(err.error?.errors?.email);
                
                if (err.error?.errors?.email) {
                    this.hasEmailError = true;
                }
                
                this.hasError = true;
                this.password = '';
                this.confirmPassword = '';

                const passwordControl = this.registerForm.controls['password'];
                const confirmPasswordControl = this.registerForm.controls['confirmPassword'];
                if (passwordControl || confirmPasswordControl) {
                    passwordControl.markAsUntouched();
                    confirmPasswordControl.markAsUntouched();
                    passwordControl.updateValueAndValidity();
                    confirmPasswordControl.updateValueAndValidity();
                }
                console.log('Register failed', err);
            }
        });
    }
}
