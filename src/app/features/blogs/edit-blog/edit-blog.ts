import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { Blog } from '../../../models/blog';

@Component({
    selector: 'app-edit-blog',
    imports: [FormsModule],
    templateUrl: './edit-blog.html',
    styleUrl: './edit-blog.css'
})
export class EditBlog implements OnInit{
    protected blog = {} as Blog

    @ViewChild('formRef') form!: NgForm;

    constructor(private route: ActivatedRoute) { }
    
    ngOnInit(): void {
        this.blog = this.route.snapshot.data['blog'];
        
    }

    protected onSubmit() {

        const content = this.form.value;
        console.log(content);
        this.form.reset();
    }

}
