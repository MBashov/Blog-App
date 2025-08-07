import { Component } from '@angular/core';

import { Blog, BlogResponse } from '../../models/blog';
import { BlogArticle } from '../../shared//components/blog-article/blog-article';
import { AuthService, ApiService, CommentService } from '../../core/services';
import { User } from '../../models/user';
import { CommentWithAuthor, MyCommentsResponse } from '../../models/comment';

@Component({
    selector: 'app-my-profile',
    imports: [BlogArticle],
    templateUrl: './my-profile.html',
    styleUrl: './my-profile.css'
})
export class MyProfile {
    protected myBlogs: Blog[] = [];
    protected myComments: CommentWithAuthor[] = [];
    protected likedBlogs: Blog[] = [];
    protected isLoading: boolean = true;
    protected user: User | null = null;

    constructor(
        private apiService: ApiService, 
        private authService: AuthService,
        private commentService: CommentService,
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
            })
        }

    }
}
