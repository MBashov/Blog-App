import { Routes } from '@angular/router';
import { Home } from './layout/home/home';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'blogs', loadComponent: () => import('./features/blog-tem/blog-tem').then(c => c.BlogTem) },
    { path: 'login', loadComponent: () => import('./features/auth/login/login').then(c => c.Login) },
    { path: 'register', loadComponent: () => import('./features/auth/register/register').then(c => c.Register) },
    { path: 'about', loadComponent: () => import('./features/about/about').then(c => c.About) },
];
