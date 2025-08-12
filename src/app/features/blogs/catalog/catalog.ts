import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Blog, BlogResponse } from '../../../models/blog';
import { Loader } from "../../../shared/components/loader/loader";
import { ApiService } from '../../../core/services';
import { finalize, pipe } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
    selector: 'app-catalog',
    imports: [Loader, RouterLink, FormsModule],
    templateUrl: './catalog.html',
    styleUrl: './catalog.css'
})
export class catalog implements OnInit {
    protected blogs: Blog[] = [];
    protected isLoading = true;
    protected hasError = false;
    protected searchedText = ''

    constructor(private apiService: ApiService) { }

    private fetchBlogs() {
        this.apiService.getAllBlogs().pipe(
            finalize(() => this.isLoading = false))
            .subscribe({
                next: (response: BlogResponse) => {
                    this.blogs = response.blogs;
                },
                error: () => {
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

    protected onSearch(formRef: NgForm) {
        const { searchText } = formRef.form.value;

        if (!searchText) return;

        this.apiService.searchBlogs(searchText).pipe(
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

    protected onSearchTextChange(value: string) {
        
        if (!value) {
            this.fetchBlogs();
        } else {
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

    }
}
