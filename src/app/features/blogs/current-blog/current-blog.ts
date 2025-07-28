import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Blog } from '../../../models/blog';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Loader } from '../../../shared/loader/loader';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
    selector: 'app-current-blog',
    imports: [DatePipe, CommonModule, Loader],
    templateUrl: './current-blog.html',
    styleUrl: './current-blog.css'
})
export class CurrentBlog implements OnInit {
    protected blog = {} as Blog;
    protected isLoading: boolean = true;
    protected imageClass: string = '';
    protected modalClass: string = '';
    protected imageSrc: string = '';

    @ViewChild('imageContainer') imageContainer!: ElementRef;

    constructor(private route: ActivatedRoute, private apiService: ApiService) { }

    ngOnInit(): void {
        const slug: string = this.route.snapshot.params['slug'];

        this.apiService.getSingleBLog(slug).subscribe(response => {
            this.blog = response.blog;
        });

        this.isLoading = false;
    }

    protected omImageLoad(event: Event): void {
        const img = event.target as HTMLImageElement;

        const { width, height } = img;

        if (width > height) {
            this.imageClass = 'landscape';
        } else {
            this.imageClass = 'portrait';
        }
    }

    protected showModal(event: Event): void {
        const { src } = event.target as HTMLImageElement;
        this.imageSrc = src;
        this.modalClass = 'active';
    }

    protected closeModal(): void {
        this.modalClass = '';
    }

    protected scrollImages(direction: 'left' | 'right') {
        const container = this.imageContainer.nativeElement;
        const scrollAmount = 220;

        if (direction === 'left') {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }
}
