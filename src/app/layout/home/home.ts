import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';

import { Loader } from '../../shared/components/loader/loader';
import { Blog, BlogResponse } from '../../models/blog';
import { BlogArticle } from "../../shared/components/blog-article/blog-article";
import { ApiService } from '../../core/services';

@Component({
    selector: 'app-home',
    imports: [Loader, BlogArticle],
    templateUrl: './home.html',
    styleUrl: './home.css'
})
export class Home implements OnInit {
    protected hasError: boolean = false;
    protected recentBlogs: Blog[] = [];
    protected popularBlogs: Blog[] = [];
    protected isLoading: boolean = true;

    constructor(private apiService: ApiService) { }

    private fetchBlogs(limit: number = 6) {
        this.apiService.getAllBlogs(limit).pipe(
            finalize(() => this.isLoading = false))
            .subscribe({
                next: (response: BlogResponse) => {
                    this.recentBlogs = response.blogs;
                },
                error: (err) => {
                    this.hasError = true;
                    console.log('Failed to load recent blogs', err);
                }
            }
            );
    }

    private fetchPopularBlogs(limit: number = 3) {
        this.apiService.getPopularBlogs(limit).pipe(
            finalize(() => this.isLoading = false))
            .subscribe({
                next: (response: { blogs: Blog[] }) => {
                    this.popularBlogs = response.blogs;
                },
                error: (err) => {
                    this.hasError = true;
                    console.log('Failed to load popular blogs', err);
                }
            }
            );
    }

    ngOnInit(): void {
        this.fetchBlogs(6);
        this.fetchPopularBlogs(3);
    }

    protected RefetchRecentBlogs() {
        this.isLoading = true;
        this.hasError = false;
        this.fetchBlogs(6);
    }

    protected RefetchPopularBlogs() {
        this.isLoading = true;
        this.hasError = false;
        this.fetchBlogs(6);
    }
}