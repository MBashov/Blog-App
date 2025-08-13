import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Blog, BlogResponse } from '../../../models/blog';
import { Loader } from "../../../shared/components/loader/loader";
import { ApiService } from '../../../core/services';
import { finalize } from 'rxjs';
import { Pagination } from '../../../shared/components/pagination/pagination';

@Component({
    selector: 'app-catalog',
    imports: [Loader, RouterLink, FormsModule, Pagination],
    templateUrl: './catalog.html',
    styleUrl: './catalog.css'
})
export class catalog implements OnInit {
    protected blogs: Blog[] = [];
    protected isLoading = true;
    protected hasError = false;
    protected searchedText = '';

    protected currentPage = 1;
    protected limit = 12;
    protected totalBlogs = 0;

    constructor(private apiService: ApiService) { }

    private fetchBlogs() {
        const offset = (this.currentPage - 1) * this.limit;

        this.apiService.getAllBlogs(this.limit, offset).pipe(
            finalize(() => this.isLoading = false))
            .subscribe({
                next: (response: BlogResponse) => {
                    this.blogs = response.blogs;
                    this.totalBlogs = response.totalBlogs;
                },
                error: () => {
                    this.hasError = true;
                }
            }
        );

    }

    private searchBlogs(value: string): void {
        this.apiService.searchBlogs(value).pipe(
            finalize(() => this.isLoading = false))
            .subscribe({
                next: (response: { blogs: Blog[] }) => {
                    this.blogs = response.blogs;
                },
                error: () => {
                    this.hasError = true;
                }
            }
        );
    }

    ngOnInit(): void {
        this.fetchBlogs();
    }

    protected onPageChange(page: number) {
        this.currentPage = page;
        this.fetchBlogs();
    }

    protected RefetchAllBlogs() {
        this.isLoading = true;
        this.hasError = false;
        this.fetchBlogs();
    }

    protected onSearch(formRef: NgForm) {
        const { searchText } = formRef.form.value;

        if (!searchText) return;

        this.searchBlogs(searchText);
    }

    protected onSearchTextChange(value: string) {
        if (!value) {
            this.fetchBlogs();
        } else {
            this.searchBlogs(value);
        }
    }
}
