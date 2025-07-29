import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
    selector: 'app-create-blog',
    imports: [FormsModule],
    templateUrl: './create-blog.html',
    styleUrl: './create-blog.css'
})
export class CreateBlog implements AfterViewInit {

    @ViewChild('f') form!: NgForm;

    constructor(private apiService: ApiService) { }

    ngAfterViewInit(): void {
        console.log(this.form);
        console.log(this.form.form)
    }

    onSubmit() {
        const content = this.form.value;
        console.log(content);
        this.form.reset();
    }

    addBlog(event: Event, title: string, slug: string, content: string, images: string, status: string) {
        event.preventDefault;

        this.apiService.addBlog(title, slug, content, images, status).subscribe(data => {
            console.log(data);

        });
    }
}
