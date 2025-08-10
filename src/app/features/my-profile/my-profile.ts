import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Blog, BlogResponse } from '../../models/blog';
import { BlogArticle } from '../../shared//components/blog-article/blog-article';
import { AuthService, ApiService, CommentService, SnackbarService } from '../../core/services';
import { UpdateUserResponse, User } from '../../models/user';
import { CommentWithAuthor, MyCommentsResponse } from '../../models/comment';
import { Like, LikeResponse } from '../../models/likes';
import { UserService } from '../../core/services/user.service';
import { UpdateUserPayload } from '../../models/user/UpdateUserPayload.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../shared/components/confirm-dialog/confirm-dialog';

@Component({
    selector: 'app-my-profile',
    imports: [BlogArticle, ReactiveFormsModule, CommonModule],
    templateUrl: './my-profile.html',
    styleUrl: './my-profile.css'
})
export class MyProfile {
    protected myBlogs: Blog[] = [];
    protected myComments: CommentWithAuthor[] = [];
    protected myLikes: Like[] = [];
    protected likedBlogs: Blog[] = [];
    protected isLoading: boolean = true;
    protected user: User | null = null;
    protected isProfileUpdating = false;
    protected profileForm!: FormGroup;
    protected passwordForm!: FormGroup;
    protected arePostsActive = false;
    protected areLikesActive = false;
    protected areCommentsActive = false;
    protected areTabButtonsActive = true;
    protected isPasswordMissMatch = false;
    protected isSubmitting = false;
    protected isCurrentPasswordWrong = false;

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        private commentService: CommentService,
        private userService: UserService,
        private fb: FormBuilder,
        private router: Router,
        private dialog: MatDialog,
        private snackBar: SnackbarService,
    ) { }

    ngOnInit(): void {
        this.user = this.authService.currentUser();

        if (this.user) {
            this.apiService.getBlogsByUser(this.user?._id).subscribe((response: BlogResponse) => {
                this.myBlogs = response.blogs;
                // this.isLoading = false;
            });

            this.commentService.getMyComments().subscribe((response: MyCommentsResponse) => {
                this.myComments = response.comments;
                // this.isLoading = false;
            });

            this.apiService.getMyLikes().subscribe((response: LikeResponse) => {
                this.myLikes = response.likes;
                // this.isLoading = false;
            });
        }

        this.profileForm = this.fb.group({
            firstName: [this.user?.firstName || '', [Validators.minLength(2), Validators.maxLength(20)]],
            lastName: [this.user?.lastName || '', [Validators.minLength(2), Validators.maxLength(20)]],
            email: [this.user?.email || '', [Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
        });

        this.passwordForm = this.fb.group({
            currentPassword: ['', [Validators.required]],
            newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
        });

        this.passwordForm.get('currentPassword')?.valueChanges.subscribe(() => {
            if (this.isCurrentPasswordWrong) {
                this.isCurrentPasswordWrong = false;
            }
        });

        this.passwordForm.get('newPassword')?.valueChanges.subscribe(() => {
            this.isPasswordMissMatch = false;
        });

        this.passwordForm.get('confirmPassword')?.valueChanges.subscribe(() => {
            if (this.isPasswordMissMatch) {
                this.isPasswordMissMatch = false;
            }
        });
    }

    protected onManageProfile() {
        this.isProfileUpdating = !this.isProfileUpdating;
        this.areTabButtonsActive = !this.areTabButtonsActive;
    }

    protected selectTab(tab: 'posts' | 'liked' | 'comments') {
        switch (tab) {
            case 'posts':
                this.arePostsActive = true;
                this.areLikesActive = false;
                this.areCommentsActive = false;
                break;
            case 'liked':
                this.arePostsActive = false;
                this.areLikesActive = true;
                this.areCommentsActive = false;
                break;
            case 'comments':
                this.arePostsActive = false;
                this.areLikesActive = false;
                this.areCommentsActive = true;
                break;
        }
    }

    protected onUpdateProfile() {
        if (this.profileForm.invalid) return;

        this.isSubmitting = true;
        const { firstName, lastName, email } = this.profileForm.value;

        const normalizedEmail = (email || '').trim().toLowerCase();
        const originalEmail = (this.user?.email || '').trim().toLowerCase();

        const normalizedFirstName = (firstName || '').trim().toLowerCase();
        const originalFirstName = (this.user?.firstName || '').trim().toLowerCase();

        const normalizedLastName = (lastName || '').trim().toLowerCase();
        const originalLastName = (this.user?.lastName || '').trim().toLowerCase();

        const payload: UpdateUserPayload = {};

        if (normalizedFirstName && normalizedFirstName !== originalFirstName) {
            payload.firstName = firstName;
        }

        if (normalizedLastName && normalizedLastName !== originalLastName) {
            payload.lastName = lastName;
        }

        if (normalizedEmail && normalizedEmail !== originalEmail) {
            payload.email = email;
        }

        this.userService.updateUser(payload.firstName, payload.lastName, payload.email).subscribe({
            next: (res: UpdateUserResponse) => {
                console.log('User info updated', res.user);
                localStorage.setItem('currentUser', JSON.stringify(res.user));
                this.user = res.user;
                this.isProfileUpdating = false;
                this.router.navigate(['/my-profile']);
                this.snackBar.show('Profile updated successfully', 'success');
            },
            error: (err) => {
                console.log('User update failed', err);
                this.snackBar.show('Profile update failed', 'error');
            },
            complete: () => {
                this.isSubmitting = false;
            }
        })
    }

    protected onChangePassword() {
        if (this.passwordForm.invalid) return;
        this.isSubmitting = true;

        const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;

        if (newPassword !== confirmPassword) {
            this.isPasswordMissMatch = true;
            this.isSubmitting = false;
            return;
        }

        this.userService.updateUser(undefined, undefined, undefined, currentPassword, newPassword).subscribe({

            next: (res: UpdateUserResponse) => {
                console.log('User info updated', res.user);
                localStorage.setItem('currentUser', JSON.stringify(res.user));
                this.user = res.user;
                this.isProfileUpdating = false;
                this.router.navigate(['/my-profile']);
                this.isSubmitting = false;
                this.isCurrentPasswordWrong = false;
                this.passwordForm.reset();
                this.snackBar.show('Password updated successfully', 'success');
            },
            error: (err) => {
                console.log('User update failed', err.error.message);
                if (err.error.message === 'Current password is incorrect') {
                    this.isCurrentPasswordWrong = true;
                }
                this.snackBar.show('Password change failed', 'error');
                this.isSubmitting = false;
            },
            complete: () => {
                this.isSubmitting = false;
            }
        })
    }

    protected onDeleteAccount() {
        const dialogRef = this.dialog.open(ConfirmDialog, {
            width: '350px',
            data: { message: 'This action will permanently delete your profile and all your content. Are you sure you want to continue?' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.isSubmitting = true;
                this.userService.deleteCurrentUser().subscribe({
                    next: () => {
                        console.log('Profile deleted successfully');
                        this.authService.logout().subscribe();
                        this.router.navigate(['/']);
                        this.isSubmitting = false;
                        this.snackBar.show('User profile deleted successfully', 'success')
                    },
                    error: (err) => {
                        console.log('Delete failed', err);
                        this.isSubmitting = false;
                        this.snackBar.show('Failed to delete a user profile. Please try again', 'error');
                    },
                });
            }
        })
    }
}
