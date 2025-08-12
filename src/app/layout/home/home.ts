import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';

import { Loader } from '../../shared/components/loader/loader';
import { Blog, BlogResponse } from '../../models/blog';
import { BlogArticle } from "../../shared/components/blog-article/blog-article";
import { ApiService } from '../../core/services';
import { RouterLink } from '@angular/router';
import { ShortenPipe } from '../../shared/pipes';
import { About } from '../../features/about/about';

@Component({
    selector: 'app-home',
    imports: [Loader, BlogArticle, RouterLink, ShortenPipe, About],
    templateUrl: './home.html',
    styleUrl: './home.css'
})
export class Home implements OnInit {
    protected hasErrorRecent: boolean = false;
    protected hasErrorPopular: boolean = false;
    protected recentBlogs: Blog[] = [];
    protected popularBlogs: Blog[] = [];
    protected isLoadingRecent: boolean = true;
    protected isLoadingPopular: boolean = true;

    constructor(private apiService: ApiService) { }

    private fetchBlogs(limit: number = 6) {
        this.apiService.getAllBlogs(limit).pipe(
            finalize(() => this.isLoadingRecent = false))
            .subscribe({
                next: (response: BlogResponse) => {
                    this.recentBlogs = response.blogs;
                },
                error: () => {
                    this.hasErrorRecent = true;
                }
            }
            );
    }

    private fetchPopularBlogs(limit: number = 3) {
        this.apiService.getPopularBlogs(limit).pipe(
            finalize(() => this.isLoadingPopular = false))
            .subscribe({
                next: (response: { blogs: Blog[] }) => {
                    this.popularBlogs = response.blogs;
                },
                error: () => {
                    this.hasErrorPopular = true;
                }
            }
            );
    }

    ngOnInit(): void {
        this.fetchBlogs(6);
        this.fetchPopularBlogs(3);
    }

    protected RefetchRecentBlogs() {
        this.isLoadingRecent = true;
        this.hasErrorRecent = false;
        this.fetchBlogs(6);
    }

    protected RefetchPopularBlogs() {
        this.isLoadingPopular = true;
        this.hasErrorPopular = false;
        this.fetchPopularBlogs(3);
    }
}