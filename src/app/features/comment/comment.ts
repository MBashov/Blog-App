import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

import { Blog } from '../../models/blog';
import { CommentService } from '../../core/services';
import { Comment, CommentsResponse } from '../../models/comment';
import { User } from '../../models/user';
import { catchError } from 'rxjs';

@Component({
    selector: 'app-comment',
    imports: [DatePipe, ReactiveFormsModule, CommonModule],
    templateUrl: './comment.html',
    styleUrl: './comment.css'
})
export class CommentComponent implements OnInit {
    @Input() blog!: Blog;

    protected commentForm!: FormGroup;
    protected comments: Comment[] = [];
    protected isSubmitting = false;
    protected isCommentFailed = false;
    protected activeCommentId: string | null = null;
    protected currentUser: User | null = null;

    constructor(
        private commentService: CommentService,
        private fb: FormBuilder
    ) {
        this.commentForm = this.fb.group({
            content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
        });
    }

    ngOnInit(): void {
        this.commentService.getCommentsByBlog(this.blog._id).subscribe(
            (response: CommentsResponse) => {
                this.comments = response.comments;
            }
        )
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

    }

    protected onSubmit(): void {
        if (this.commentForm.invalid) return;

        this.isSubmitting = true;

        const content: string = this.commentForm.value.content;

        this.commentService.postComment(this.blog._id, content).subscribe({
            next: () => {
                this.commentService.getCommentsByBlog(this.blog._id).subscribe(
                    (response: CommentsResponse) => {
                        this.comments = response.comments;
                    }
                )
                this.commentForm.reset();
                this.isSubmitting = false;
                this.isCommentFailed = false;
            },
            error: (err) => {
                console.log('Comment creation failed', err);
                this.isCommentFailed = true;
            },
            complete: () => {
                this.isSubmitting = false;
            }
        });
    }

    protected toggleActionsModal(commentId: string): void {
        this.activeCommentId = this.activeCommentId === commentId ? null : commentId;
    }

    protected isActionsModalVisible(commentId: string): boolean {
        return this.activeCommentId === commentId;
    }

    protected editComment(commentIid: string) {

    }
    protected deleteComment(commentId: string) {
        this.commentService.deleteComment(commentId).subscribe({
            next: (res) => {
                this.blog.commentsCount = res.commentsCount;
                this.commentService.getCommentsByBlog(this.blog._id).subscribe(
                    (response: CommentsResponse) => {
                        this.comments = response.comments;
                    }
                )
            },
            error: (err) => {
                console.log('Error during getting the comments', err);
            }

        })
    }
}
