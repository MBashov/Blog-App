import { Component, Input } from '@angular/core';
import { Blog } from '../../models/blog';
import { DatePipe } from '@angular/common';
import { ShortenPipe } from '../../core/pipes/shorten-pipe';

@Component({
  selector: 'app-blog-article',
  imports: [DatePipe, ShortenPipe],
  templateUrl: './blog-article.html',
  styleUrl: './blog-article.css'
})
export class BlogArticle {
  @Input('blog') blog!: Blog;
}
