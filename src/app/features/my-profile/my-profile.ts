import { Component } from '@angular/core';
import { Blog, BlogResponse } from '../../models/blog';
import { ApiService } from '../../services/api.service';
import { BlogArticle } from '../../shared/blog-article/blog-article';

@Component({
    selector: 'app-my-profile',
    imports: [BlogArticle],
    templateUrl: './my-profile.html',
    styleUrl: './my-profile.css'
})
export class MyProfile {
    protected myBlogs: Blog[] = [];
    protected isLoading: boolean = true;

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.apiService.getAllBlogs(6).subscribe((response: BlogResponse) => {
            this.myBlogs = response.blogs;
            this.isLoading = false;
        });
    }
}
