import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-register',
    imports: [RouterLink, FormsModule],
    templateUrl: './register.html',
    styleUrl: './register.css'
})
export class Register {
    @ViewChild('formRef') registerForm!: NgForm;

    protected onSubmit() {
        console.log(this.registerForm.value);
        
    }
}
