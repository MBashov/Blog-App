import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { Blog } from '../../../models/blog';
import { ApiService, AuthService } from '../../../core/services';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
    selector: 'app-current-blog',
    imports: [CommonModule, RouterLink],
    templateUrl: './current-blog.html',
    styleUrl: './current-blog.css'
})
export class CurrentBlog implements OnInit {
    protected blog = {} as Blog;
    protected isSubmitting: boolean = false;
    protected imageClass: string = '';
    protected modalClass: string = '';
    protected imageSrc: string = '';
    protected isAuthor: boolean = false;

    @ViewChild('imageContainer') imageContainer!: ElementRef;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private apiService: ApiService,
        private authService: AuthService,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.blog = this.route.snapshot.data['blog'];
        this.isAuthor = this.authService.isAuthor(this.blog.author._id);
    }

    protected omImageLoad(event: Event): void {
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

    protected openDeleteModal() {
        this.dialog
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

    protected deleteBlog(blogId: string): void {
        this.isSubmitting = true;
        const dialogRef = this.dialog.open(ConfirmDialog, {
            width: '350px',
            data: { message: 'Are you sure you want to delete this blog?' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.apiService.deleteBlog(blogId).subscribe({
                    next: () => {
                        console.log('Blog deleted successfully');
                        this.router.navigate(['/blogs']);
                        this.isSubmitting = false;
                    },
                    error: (err) => {
                        console.log('Delete failed', err);
                        //Todo error handling
                    }
                });
            }
        })
    }
}
