import { Component } from '@angular/core';

import { Blog, BlogResponse } from '../../models/blog';
import { BlogArticle } from '../../shared//components/blog-article/blog-article';
import { AuthService, ApiService, CommentService } from '../../core/services';
import { User } from '../../models/user';
import { CommentWithAuthor, MyCommentsResponse } from '../../models/comment';
import { Like, LikeResponse } from '../../models/likes';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        private commentService: CommentService,
        private fb: FormBuilder
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
            firstName: [this.user?.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
            lastName: [this.user?.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
            email: [this.user?.email, [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
        });

        this.passwordForm = this.fb.group({
            currentPassword: ['', [Validators.required]],
            newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
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

    }

    protected onChangePassword() {

    }

    protected openDeleteDialog() {

    }
}
