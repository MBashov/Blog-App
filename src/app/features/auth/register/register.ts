import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-register',
    imports: [RouterLink, FormsModule],
    templateUrl: './register.html',
    styleUrl: './register.css'
})
export class Register {
    @ViewChild('formRef') registerForm!: NgForm;
    protected password: string = '';
    protected confirmPassword : string = '';

    constructor (private authService: AuthService, private router: Router) {}

    protected onSubmit() {
        const { firstName, lastName, email, password, confirmPassword } = this.registerForm.form.value;
        
        if (password !== confirmPassword) {
            return; //TODO Show user message
        }

        this.authService.register(firstName, lastName, email, password).subscribe({
            next: () => {
                this.router.navigate(['/home']);
                this.registerForm.reset();
            },
            error: (err) => {
                console.log('Register failed', err);
            }
        });
    }
}
