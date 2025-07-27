import { Component, OnInit } from '@angular/core';
import { Blog } from '../../../models';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Loader } from '../../../shared/loader/loader';

@Component({
    selector: 'app-current-blog',
    imports: [Loader],
    templateUrl: './current-blog.html',
    styleUrl: './current-blog.css'
})
export class CurrentBlog implements OnInit {
    protected blog = {} as Blog;
    protected isLoading: boolean = true;

    constructor(private route: ActivatedRoute, private apiService: ApiService) { }

    ngOnInit(): void {
        const slug: string = this.route.snapshot.params['slug'];

        this.apiService.getSingleBLog(slug).subscribe(response => {
            this.blog = response.blog;
        });

        this.isLoading = false;
    }
}
