import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Blog } from '../../models/blog';
import { CommentService } from '../../core/services';
import { Comment, CommentsResponse, CreatedComment } from '../../models/comment';

@Component({
    selector: 'app-comment',
    imports: [DatePipe, ReactiveFormsModule],
    templateUrl: './comment.html',
    styleUrl: './comment.css'
})
export class CommentComponent implements OnInit {
    @Input() blog!: Blog;

    protected commentForm!: FormGroup;
    protected comments: Comment[] = [];
    protected isSubmitting = false;

    constructor(private commentService: CommentService, private fb: FormBuilder) {
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
    }

    protected onSubmit() {
        if (this.commentForm.invalid) return;

        this.isSubmitting = true;

        const content: string = this.commentForm.value.content;

        this.commentService.postComment(this.blog._id, content).subscribe({
            next: (response: CreatedComment) => {
                console.log(response);
                this.commentService.getCommentsByBlog(this.blog._id);
            },
            error: (err) => {
                console.log('Comment creation failed', err);
                //TODO Error handling
            },
            complete: () => {
                this.isSubmitting = false;
            }
        });
    }
}
