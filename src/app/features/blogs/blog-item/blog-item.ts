import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Blog, BlogResponse } from '../../../models/blog';
import { Loader } from "../../../shared/loader/loader";
import { ApiService } from '../../../core/services';

@Component({
    selector: 'app-blog-item',
    imports: [Loader, RouterLink],
    templateUrl: './blog-item.html',
    styleUrl: './blog-item.css'
})
export class BlogItem implements OnInit {
    protected blogs: Blog[] = [];
    protected isLoading: boolean = true;
    
    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.apiService.getAllBlogs().subscribe((response: BlogResponse) => {
            this.blogs = response.blogs;
            this.isLoading = false;
        });
    }
}
