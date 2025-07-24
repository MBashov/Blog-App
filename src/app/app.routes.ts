import { Routes } from '@angular/router';
import { Home } from './layout/home/home';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'blogs', loadComponent: () => import('./featured/blog-tem/blog-tem').then(c => c.BlogTem) },
    { path: 'about', loadComponent: () => import('./featured/about/about').then(c => c.About) },
];
