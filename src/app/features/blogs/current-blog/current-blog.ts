import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { Blog, BlogResponse } from '../../../models/blog';
import { ApiService, AuthService, SnackbarService } from '../../../core/services';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { CommentComponent } from "../../comment/comment";
import { Loader } from '../../../shared/components/loader/loader';

@Component({
    selector: 'app-current-blog',
    imports: [CommonModule, RouterLink, CommentComponent, Loader],
    templateUrl: './current-blog.html',
    styleUrl: './current-blog.css'
})
export class CurrentBlog implements OnInit {
    protected blog = {} as Blog;
    protected userBlogs: Blog[] = [];
    protected imageClass = '';
    protected imageSrc = '';
    protected modalClass = '';
    protected errorFetchingUsersPosts = false
    protected isSubmitting = false;
    protected isDeleting = false;
    protected isAuthor = false;
    protected hasLiked = false;
    protected isLiking = false;
    protected isAuthenticated = false;
    protected isLoadingUserPosts = false;

    @ViewChild('imageContainer') imageContainer!: ElementRef;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private apiService: ApiService,
        private authService: AuthService,
        private dialog: MatDialog,
        private snackBar: SnackbarService,

    ) { }

    ngOnInit(): void {
        this.blog = this.route.snapshot.data['blog'];

        this.isLoadingUserPosts = true;
        this.apiService.getBlogsByUser(this.blog.author._id).subscribe({
            next: (response: BlogResponse) => {
                this.userBlogs = response.blogs.filter(blog => blog._id !== this.blog._id);
                this.isLoadingUserPosts = false;
            },
            error: () => {
                this.errorFetchingUsersPosts = true;
                this.isLoadingUserPosts = false;
            }
        });

        this.isAuthor = this.authService.isAuthor(this.blog.author._id);
        this.isAuthenticated = this.authService.isAuthenticated();

        if (this.isAuthenticated) {
            this.apiService.checkHasLiked(this.blog._id).subscribe({
                next: (res) => {
                    this.hasLiked = res.hasLiked;
                },
                error: () => {
                    this.snackBar.show('Unexpected error occurred, please try again', 'error');
                }
            });
        }
    }

    protected onImageLoad(event: Event): void {
        const img = event.target as HTMLImageElement;

        const { width, height } = img;

        if (width > height) {
            this.imageClass = 'landscape';
        } else {
            this.imageClass = 'portrait';
        }
    }

    protected showModal(event: Event): void {
        const { src } = event.target as HTMLImageElement;
        this.imageSrc = src;
        this.modalClass = 'active';
    }

    protected closeModal(): void {
        this.modalClass = '';
    }

    protected scrollImages(direction: 'left' | 'right') {
        const container = this.imageContainer.nativeElement;
        const scrollAmount = 220;

        if (direction === 'left') {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }

    protected toggleLike() {
        if (this.isLiking) return;
        this.isLiking = true;

        const req = this.hasLiked
            ? this.apiService.unLikeBlog(this.blog._id)
            : this.apiService.likeBlog(this.blog._id)

        req.subscribe({
            next: () => {
                this.hasLiked = !this.hasLiked;
                this.blog.likesCount += this.hasLiked ? 1 : -1;
                this.isLiking = false;
            },
            error: () => {
                this.isLiking = false;
            },
        })
    }

    protected deleteBlog(blogId: string): void {
        const dialogRef = this.dialog.open(ConfirmDialog, {
            width: '350px',
            data: { message: `Are you sure you want to delete ${this.blog.title} ?` }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.isSubmitting = true;
                this.apiService.deleteBlog(blogId).subscribe({
                    next: () => {
                        this.router.navigate(['/blogs']);
                        this.isSubmitting = false;
                        this.snackBar.show('Blog deleted successfully', 'success');
                    },
                    error: () => {
                        this.snackBar.show('Blog deletion failed', 'error');
                        this.isSubmitting = false;
                    },
                });
            }
        });
    }
}
