import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

import { Blog } from '../../models/blog';
import { CommentService, SnackbarService } from '../../core/services';
import { Comment, CommentsResponse, UpdatedComment } from '../../models/comment';
import { User } from '../../models/user';

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
    protected errorFetchingComments = false;
    protected errorEditComment = false;
    protected errorDeleteComment = false;
    protected isSubmitting = false;
    protected isPostingCommentFailed = false;
    protected activeCommentId: string | null = null;
    protected editingCommentId: string | null = null;
    protected currentUser: User | null = null;

    constructor(
        private commentService: CommentService,
        private fb: FormBuilder,
        private snackBar: SnackbarService,
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

        if (this.editingCommentId) {
            this.commentService.updateComment(this.editingCommentId, content).subscribe({
                next: (response: UpdatedComment) => {
                    const commentIndex = this.comments.findIndex(c => c._id === this.editingCommentId);

                    if (commentIndex !== -1) {
                        this.comments[commentIndex].content = response.comment.content;

                        this.cancelEdit();
                        this.isSubmitting = false;
                        this.isPostingCommentFailed = false;
                    }
                },
                error: () => {
                    this.errorEditComment = true;
                    this.isSubmitting = false;
                }
            })
        } else {
            this.commentService.postComment(this.blog._id, content).subscribe({
                next: () => {
                    this.commentService.getCommentsByBlog(this.blog._id).subscribe(
                        (response: CommentsResponse) => {
                            this.comments = response.comments;
                        }
                    )
                    this.commentForm.reset();
                    this.isSubmitting = false;
                    this.isPostingCommentFailed = false;
                },
                error: () => {
                    this.isPostingCommentFailed = true;
                    this.isSubmitting = false;
                },
            });
        }

    }

    protected toggleActionsModal(commentId: string): void {
        this.activeCommentId = this.activeCommentId === commentId ? null : commentId;
    }

    protected isActionsModalVisible(commentId: string): boolean {
        return this.activeCommentId === commentId;
    }

    protected editComment(commentIid: string) {
        const commentToEdit = this.comments.find(c => c._id === commentIid);
        if (!commentIid) return;

        this.editingCommentId = commentIid;

        this.commentForm.patchValue({
            content: commentToEdit?.content
        });
    }

    protected cancelEdit(): void {
        this.editingCommentId = null;
        this.commentForm.reset();
    }

    protected deleteComment(commentId: string) {
        this.errorDeleteComment = false;

        this.commentService.deleteComment(commentId).subscribe({
            next: (res) => {
                this.blog.commentsCount = res.commentsCount;
                this.commentService.getCommentsByBlog(this.blog._id).subscribe(
                    (response: CommentsResponse) => {
                        this.comments = response.comments;
                    }
                )
                this.errorFetchingComments = false;
            },
            error: () => {
                this.errorDeleteComment = true;
            }
        })
    }
}
