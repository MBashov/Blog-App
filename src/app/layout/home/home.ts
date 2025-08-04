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
                    console.log('Failed to load blogs', err);
                }
            }
        );
    }

    ngOnInit(): void {
        this.fetchBlogs(6);
    }

    protected RefetchAllBlogs() {
        this.isLoading = true;
        this.hasError = false;
        this.fetchBlogs(6);
    }
}