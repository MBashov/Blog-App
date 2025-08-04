import { Component, Input } from '@angular/core';
import { Blog } from '../../../models/blog';
import { ShortenPipe, TimeAgoPipe } from '../../pipes';


@Component({
  selector: 'app-blog-article',
  imports: [ShortenPipe, TimeAgoPipe],
  templateUrl: './blog-article.html',
  styleUrl: './blog-article.css'
})
export class BlogArticle {
  @Input('blog') blog!: Blog;
}
