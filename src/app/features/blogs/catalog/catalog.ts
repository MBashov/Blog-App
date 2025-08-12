import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Blog, BlogResponse } from '../../../models/blog';
import { Loader } from "../../../shared/components/loader/loader";
import { ApiService } from '../../../core/services';
import { finalize, pipe } from 'rxjs';

@Component({
    selector: 'app-catalog',
    imports: [Loader, RouterLink],
    templateUrl: './catalog.html',
    styleUrl: './catalog.css'
})
export class catalog implements OnInit {
    protected blogs: Blog[] = [];
    protected isLoading: boolean = true;
    protected hasError: boolean = false;

    constructor(private apiService: ApiService) { }

    private fetchBlogs() {
        this.apiService.getAllBlogs().pipe(
            finalize(() => this.isLoading = false))
            .subscribe({
                next: (response: BlogResponse) => {
                    this.blogs = response.blogs;
                },
                error: (err) => {
                    this.hasError = true;
                }
            });

    }
    ngOnInit(): void {
        this.fetchBlogs();
    }


    protected RefetchAllBlogs() {
        this.isLoading = true;
        this.hasError = false;
        this.fetchBlogs();
    }
}
