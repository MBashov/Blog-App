import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./layout/header/header";
import { Footer } from './layout/footer/footer';
import { ErrorNotification } from './shared/error-notification/error-notification';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ErrorNotification],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'blog-app';
}
