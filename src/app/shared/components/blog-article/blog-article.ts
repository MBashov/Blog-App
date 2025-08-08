import { Component, Input } from '@angular/core';
import { Blog } from '../../../models/blog';
import { ShortenPipe, TimeAgoPipe } from '../../pipes';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-blog-article',
  imports: [ShortenPipe, TimeAgoPipe, RouterLink],
  templateUrl: './blog-article.html',
  styleUrl: './blog-article.css'
})
export class BlogArticle {
  @Input('blog') blog!: Blog;
}
