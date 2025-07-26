import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Blog } from '../../models';
import { DatePipe } from '@angular/common';
import { Loader } from '../../shared/loader/loader';

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
        this.apiService.getAllBlogs(6).subscribe((response) => {
            this.recentBlogs = response.blogs;
            this.isLoading = false;
        });
    }
}