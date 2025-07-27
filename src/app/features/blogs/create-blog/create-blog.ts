import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
    selector: 'app-create-blog',
    imports: [],
    templateUrl: './create-blog.html',
    styleUrl: './create-blog.css'
})
export class CreateBlog {
    constructor(private apiService: ApiService) { }

    addBlog(event: Event, title: string, slug: string, content: string, images: string, status: string) {
        event.preventDefault;

        this.apiService.addBlog(title, slug, content, images, status).subscribe(data => {
            console.log(data);

        });
    }
}
