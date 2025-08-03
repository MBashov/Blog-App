import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ApiService } from '../../../core/services';

@Component({
    selector: 'app-create-blog',
    imports: [ReactiveFormsModule],
    templateUrl: './create-blog.html',
    styleUrl: './create-blog.css'
})
export class CreateBlog {
    blogForm!: FormGroup;
    selectedFile: File | null = null;

    constructor(private fb: FormBuilder, private apiService: ApiService) {
        this.blogForm = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
            slug: [''],
            content: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(2000)]],
            bannerImage: [null, Validators.required],
            status: ['published', Validators.required]
        });
    }

    onFileChange(event: Event): void {
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
        const input = event.target as HTMLInputElement;

        if (!input?.files?.length) return;

        const file = input.files[0];

        if (!allowedTypes.includes(file.type)) {
            this.blogForm.get('bannerImage')?.setErrors({ invalidType: true });
            this.blogForm.patchValue({ bannerImage: null });
            return;
        }

        this.selectedFile = file;
        this.blogForm.patchValue({ bannerImage: file });
        this.blogForm.get('bannerImage')?.updateValueAndValidity();
    }



    onSubmit() {
        if (this.blogForm.invalid || !this.selectedFile) return;

        const formData = new FormData();
        formData.append('title', this.blogForm.value.title);
        formData.append('slug', this.blogForm.value.slug || '');
        formData.append('content', this.blogForm.value.content);
        formData.append('status', this.blogForm.value.status);
        formData.append('banner_image', this.selectedFile);

        this.apiService.createBlog(formData).subscribe({
            next: (res) => {
                console.log('Blog created', res);
                this.blogForm.reset();
                this.selectedFile = null;
            },
            error: (err) => {
                console.log('Blog creation failed', err);
            }
        })
    }
}
