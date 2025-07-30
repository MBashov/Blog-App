import { Component, Input } from '@angular/core';
import { Blog } from '../../models/blog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-article',
  imports: [DatePipe],
  templateUrl: './blog-article.html',
  styleUrl: './blog-article.css'
})
export class BlogArticle {
  @Input('blog') blog!: Blog;
}
