import { Component, OnInit } from '@angular/core';
import { Blog } from '../../../models';
import { Loader } from "../../../shared/loader/loader";
import { ApiService } from '../../../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-blog-item',
    imports: [Loader, RouterLink],
    templateUrl: './blog-item.html',
    styleUrl: './blog-item.css'
})
export class BlogItem implements OnInit {
    // blogs = [
    //     {
    //         "title": "A Weekend in the Scottish Highlands: What to Pack",
    //         "content": "Packing for the unpredictable weather in the Highlands is an art. From waterproof boots to emergency chocolate, here's my go-to list for a cozy and prepared weekend escape into the wild.",
    //         "banner": {
    //             "publicId": "blog-api/fvjucd51gkybhebl8ujy",
    //             "url": "https://res.cloudinary.com/dadmbpgr6/image/upload/v1753476894/blog-api/fvjucd51gkybhebl8ujy.jpg",
    //             "width": 600,
    //             "height": 898
    //         },
    //         "author": "687cdbaa517e7eb569c6019c",
    //         "viewsCount": 0,
    //         "likesCount": 0,
    //         "commentsCount": 0,
    //         "status": "published",
    //         "_id": "6883ef1fd5e10aa4b6034a96",
    //         "slug": "a-weekend-in-the-scottish-highlands-what-to-pack-m3ue88",
    //         "publishedAt": "2025-07-25T20:54:55.328Z",
    //         "updatedAt": "2025-07-25T20:54:55.328Z",
    //         "__v": 0
    //     },
    //     {
    //         "title": "Exploring the Hidden Waterfalls of Plitvice, Croatia",
    //         "content": "Plitvice Lakes National Park is more than just crystal-clear lakes — it's home to hidden waterfalls tucked away from the tourist trails. In this post, I share how I found the most peaceful spot in the park and why autumn is the best time to visit.",
    //         "banner": {
    //             "publicId": "blog-api/tkjwd7rsercwm5kppuil",
    //             "url": "https://res.cloudinary.com/dadmbpgr6/image/upload/v1753471828/blog-api/tkjwd7rsercwm5kppuil.jpg",
    //             "width": 600,
    //             "height": 450
    //         },
    //         "author": "687cdbaa517e7eb569c6019c",
    //         "viewsCount": 0,
    //         "likesCount": 0,
    //         "commentsCount": 0,
    //         "status": "published",
    //         "_id": "6883db55d5e10aa4b6034a89",
    //         "slug": "exploring-the-hidden-waterfalls-of-plitvice-croatia-gnvaod",
    //         "publishedAt": "2025-07-25T19:30:29.212Z",
    //         "updatedAt": "2025-07-25T19:30:29.212Z",
    //         "__v": 0
    //     },
    //     {
    //         "title": "How I Survived a Sandstorm in the Sahara",
    //         "content": "Our desert trek in Morocco took an unexpected turn when a fierce sandstorm swept across the dunes. I’ll walk you through what happened, how we stayed safe, and what I learned from the experience.",
    //         "banner": {
    //             "publicId": "blog-api/rjhkoxqlpyqp71zl7vwb",
    //             "url": "https://res.cloudinary.com/dadmbpgr6/image/upload/v1753476297/blog-api/rjhkoxqlpyqp71zl7vwb.jpg",
    //             "width": 600,
    //             "height": 400
    //         },
    //         "author": "687cdbaa517e7eb569c6019c",
    //         "viewsCount": 0,
    //         "likesCount": 0,
    //         "commentsCount": 0,
    //         "status": "published",
    //         "_id": "6883eccad5e10aa4b6034a92",
    //         "slug": "how-i-survived-a-sandstorm-in-the-sahara-g03h3m",
    //         "publishedAt": "2025-07-25T20:44:58.383Z",
    //         "updatedAt": "2025-07-25T20:44:58.383Z",
    //         "__v": 0
    //     },
    //     {
    //         "title": "Digital Detox in the Philippines: My Remote Island Experience",
    //         "content": "No Wi-Fi. No notifications. Just the sound of waves, jungle, and my thoughts. Here's how I spent 5 days offline in a tiny island near Palawan — and why I plan to do it again.",
    //         "banner": {
    //             "publicId": "blog-api/sdorz6worvxlbft6nykd",
    //             "url": "https://res.cloudinary.com/dadmbpgr6/image/upload/v1753477183/blog-api/sdorz6worvxlbft6nykd.jpg",
    //             "width": 600,
    //             "height": 400
    //         },
    //         "author": "687cdbaa517e7eb569c6019c",
    //         "viewsCount": 0,
    //         "likesCount": 0,
    //         "commentsCount": 0,
    //         "status": "published",
    //         "_id": "6883f03fd5e10aa4b6034a9a",
    //         "slug": "digital-detox-in-the-philippines-my-remote-island-experience-cpu3z3",
    //         "publishedAt": "2025-07-25T20:59:43.852Z",
    //         "updatedAt": "2025-07-25T20:59:43.852Z",
    //         "__v": 0
    //     },
    //     {
    //         "title": "Exploring the Hidden Waterfalls of Plitvice, Croatia",
    //         "content": "Plitvice Lakes National Park is more than just crystal-clear lakes — it's home to hidden waterfalls tucked away from the tourist trails. In this post, I share how I found the most peaceful spot in the park and why autumn is the best time to visit.",
    //         "banner": {
    //             "publicId": "blog-api/tkjwd7rsercwm5kppuil",
    //             "url": "https://res.cloudinary.com/dadmbpgr6/image/upload/v1753471828/blog-api/tkjwd7rsercwm5kppuil.jpg",
    //             "width": 600,
    //             "height": 450
    //         },
    //         "author": "687cdbaa517e7eb569c6019c",
    //         "viewsCount": 0,
    //         "likesCount": 0,
    //         "commentsCount": 0,
    //         "status": "published",
    //         "_id": "6883db55d5e10aa4b6034a89",
    //         "slug": "exploring-the-hidden-waterfalls-of-plitvice-croatia-gnvaod",
    //         "publishedAt": "2025-07-25T19:30:29.212Z",
    //         "updatedAt": "2025-07-25T19:30:29.212Z",
    //         "__v": 0
    //     },
    //     {
    //         "title": "How I Survived a Sandstorm in the Sahara",
    //         "content": "Our desert trek in Morocco took an unexpected turn when a fierce sandstorm swept across the dunes. I’ll walk you through what happened, how we stayed safe, and what I learned from the experience.",
    //         "banner": {
    //             "publicId": "blog-api/rjhkoxqlpyqp71zl7vwb",
    //             "url": "https://res.cloudinary.com/dadmbpgr6/image/upload/v1753476297/blog-api/rjhkoxqlpyqp71zl7vwb.jpg",
    //             "width": 600,
    //             "height": 400
    //         },
    //         "author": "687cdbaa517e7eb569c6019c",
    //         "viewsCount": 0,
    //         "likesCount": 0,
    //         "commentsCount": 0,
    //         "status": "published",
    //         "_id": "6883eccad5e10aa4b6034a92",
    //         "slug": "how-i-survived-a-sandstorm-in-the-sahara-g03h3m",
    //         "publishedAt": "2025-07-25T20:44:58.383Z",
    //         "updatedAt": "2025-07-25T20:44:58.383Z",
    //         "__v": 0
    //     },
    //     {
    //         "title": "A Weekend in the Scottish Highlands: What to Pack",
    //         "content": "Packing for the unpredictable weather in the Highlands is an art. From waterproof boots to emergency chocolate, here's my go-to list for a cozy and prepared weekend escape into the wild.",
    //         "banner": {
    //             "publicId": "blog-api/fvjucd51gkybhebl8ujy",
    //             "url": "https://res.cloudinary.com/dadmbpgr6/image/upload/v1753476894/blog-api/fvjucd51gkybhebl8ujy.jpg",
    //             "width": 600,
    //             "height": 898
    //         },
    //         "author": "687cdbaa517e7eb569c6019c",
    //         "viewsCount": 0,
    //         "likesCount": 0,
    //         "commentsCount": 0,
    //         "status": "published",
    //         "_id": "6883ef1fd5e10aa4b6034a96",
    //         "slug": "a-weekend-in-the-scottish-highlands-what-to-pack-m3ue88",
    //         "publishedAt": "2025-07-25T20:54:55.328Z",
    //         "updatedAt": "2025-07-25T20:54:55.328Z",
    //         "__v": 0
    //     },
    //     {
    //         "title": "Digital Detox in the Philippines: My Remote Island Experience",
    //         "content": "No Wi-Fi. No notifications. Just the sound of waves, jungle, and my thoughts. Here's how I spent 5 days offline in a tiny island near Palawan — and why I plan to do it again.",
    //         "banner": {
    //             "publicId": "blog-api/sdorz6worvxlbft6nykd",
    //             "url": "https://res.cloudinary.com/dadmbpgr6/image/upload/v1753477183/blog-api/sdorz6worvxlbft6nykd.jpg",
    //             "width": 600,
    //             "height": 400
    //         },
    //         "author": "687cdbaa517e7eb569c6019c",
    //         "viewsCount": 0,
    //         "likesCount": 0,
    //         "commentsCount": 0,
    //         "status": "published",
    //         "_id": "6883f03fd5e10aa4b6034a9a",
    //         "slug": "digital-detox-in-the-philippines-my-remote-island-experience-cpu3z3",
    //         "publishedAt": "2025-07-25T20:59:43.852Z",
    //         "updatedAt": "2025-07-25T20:59:43.852Z",
    //         "__v": 0
    //     }
    // ];
    protected blogs: Blog[] = [];
    protected isLoading: boolean = true;
    
    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.apiService.getAllBlogs().subscribe((response) => {
            this.blogs = response.blogs;
            this.isLoading = false;
        });
    }
}
