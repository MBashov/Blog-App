import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Loader } from '../../shared/loader/loader';
import { ApiService } from '../../services/api.service';
import { Blog, BlogResponse } from '../../models';

@Component({
    selector: 'app-home',
    imports: [DatePipe, Loader],
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