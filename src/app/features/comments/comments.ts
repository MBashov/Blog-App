import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Blog } from '../../models/blog';
import { CommentService } from '../../core/services';
import { Comment, CommentResponse } from '../../models/comment';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-comments',
    imports: [DatePipe],
    templateUrl: './comments.html',
    styleUrl: './comments.css'
})
export class Comments implements OnInit {
    @Input() blog!: Blog;

    protected comments: Comment[] = [];

    constructor (private commentService: CommentService) {}

    ngOnInit(): void {
        this.commentService.getCommentsByBlog(this.blog._id).subscribe(
            (response: CommentResponse) => {
                this.comments = response.comments;
            }
        )
    }
}
