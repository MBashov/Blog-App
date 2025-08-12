import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ApiService, SnackbarService } from '../../../core/services';
import { Router } from '@angular/router';
import { CreateBlogResponse } from '../../../models/blog';

@Component({
    selector: 'app-create-blog',
    imports: [ReactiveFormsModule],
    templateUrl: './create-blog.html',
    styleUrl: './create-blog.css'
})
export class CreateBlog {
    protected blogForm!: FormGroup;
    protected isSubmitting: boolean = false;
    protected selectedFile: File | null = null;
    protected imagePreviewUrl: string | null = null;
    protected fileError: string | null = null;

    constructor(
        private fb: FormBuilder, 
        private apiService: ApiService, 
        private router: Router,
        private snackBar: SnackbarService,
    ) {

        this.blogForm = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
            content: ['', [Validators.required, Validators.minLength(100), Validators.maxLength(2000)]],
            bannerImage: [null, Validators.required],
            status: ['published', Validators.required]
        });
    }

    protected onFileChange(event: Event): void {
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
        const maxSizeMB: number = 2;
        const bannerImageRef = this.blogForm.get('bannerImage') as AbstractControl;
        const input = event.target as HTMLInputElement;

        this.fileError = null;

        if (!input?.files?.length) return;

        const file = input.files[0];

        if (!allowedTypes.includes(file.type)) {
            bannerImageRef.setErrors({ invalidType: true });
            this.fileError = 'Unsupported file type. Please upload a PNG, JPEG, JPG, or WEBP image.';
            return;
        }

        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > maxSizeMB) {
            bannerImageRef.setErrors({ maxSizeExceed: true });
            this.fileError = 'File size exceeds 2MB.';
            return;
        }

        this.selectedFile = file;
        this.blogForm.patchValue({ bannerImage: file });
        bannerImageRef.updateValueAndValidity();

    }

    protected onSubmit(): void {
        if (this.blogForm.invalid || !this.selectedFile) return;
        this.isSubmitting = true;

        const formData = new FormData();
        formData.append('title', this.blogForm.value.title);
        formData.append('content', this.blogForm.value.content);
        formData.append('status', this.blogForm.value.status);
        formData.append('banner_image', this.selectedFile);

        this.apiService.createBlog(formData).subscribe({
            next: (res: CreateBlogResponse) => {
                console.log('Blog created', res.code);
                this.blogForm.reset();
                this.selectedFile = null;
                this.router.navigate(['/blogs']);
                this.snackBar.show('Blog created successfully', 'success');
                this.isSubmitting = false;
            },
            error: () => {
                this.snackBar.show('Blog creation failed', 'error');
                this.isSubmitting = false;
            },
        })
    }
}
