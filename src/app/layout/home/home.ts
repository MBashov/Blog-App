import { Component, OnInit } from '@angular/core';

import { Loader } from '../../shared/loader/loader';
import { ApiService } from '../../services/api.service';
import { Blog, BlogResponse } from '../../models/blog';
import { BlogArticle } from "../../shared/blog-article/blog-article";

@Component({
    selector: 'app-home',
    imports: [ Loader, BlogArticle],
    templateUrl: './home.html',
    styleUrl: './home.css'
})
export class Home implements OnInit{
    protected recentBlogs: Blog[] = [];
    protected isLoading: boolean = true;

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.apiService.getAllBlogs(6).subscribe((response: BlogResponse) => {
            this.recentBlogs = response.blogs;
            this.isLoading = false;
        });
    }
}