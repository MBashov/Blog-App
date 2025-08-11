import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Blog, singleBlogResponse } from '../../../models/blog';
import { ApiService, SnackbarService } from '../../../core/services';

@Component({
    selector: 'app-edit-blog',
    imports: [ReactiveFormsModule],
    templateUrl: './edit-blog.html',
    styleUrl: './edit-blog.css'
})
export class EditBlog implements OnInit {
    protected blog = {} as Blog
    protected blogForm!: FormGroup;
    protected isSubmitting: boolean = false;
    protected selectedFile: File | null = null;
    protected imagePreviewUrl: string | null = null;
    protected fileError: string | null = null;

    constructor(
        private fb: FormBuilder,
        private apiService: ApiService,
        private route: ActivatedRoute,
        private router: Router,
        private snackBar: SnackbarService,
    ) { }

    ngOnInit(): void {
        this.blog = this.route.snapshot.data['blog'];
        this.blogForm = this.fb.group({
            title: [this.blog.title, [Validators.minLength(5), Validators.maxLength(100)]],
            content: [this.blog.content, [Validators.minLength(100), Validators.maxLength(2000)]],
            status: [this.blog.status],
            bannerImage: [null],

        });
    }

    protected onFileChange(event: Event): void {
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
        const maxSizeMB = 2;
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
        this.imagePreviewUrl = URL.createObjectURL(file); // ✅ Create preview URL
        this.blogForm.patchValue({ bannerImage: file });
        bannerImageRef.updateValueAndValidity();
    }

    protected onSubmit() {

        if (this.blogForm.invalid) return;
        this.isSubmitting = true;

        const formData = new FormData();

        if (this.blogForm.value.title) formData.append('title', this.blogForm.value.title);
        if (this.blogForm.value.content) formData.append('content', this.blogForm.value.content);
        if (this.blogForm.value.status) formData.append('status', this.blogForm.value.status);
        if (this.selectedFile) formData.append('banner_image', this.selectedFile);


        this.apiService.updateBlog(formData, this.blog._id).subscribe({
            next: (res: singleBlogResponse) => {
                console.log('Blog updated', res.blog);
                this.blogForm.reset();
                this.selectedFile = null;
                this.isSubmitting = false;
                this.router.navigate(['/blogs', 'details', this.blog.slug]);
                this.snackBar.show('Blog updated successfully', 'success');
            },
            error: (err) => {
                console.log('Blog update failed', err);
                this.snackBar.show('Blog update failed', 'error');
            }
        })
    }
}
