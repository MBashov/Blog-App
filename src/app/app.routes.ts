import { Routes } from '@angular/router';
import { Home } from './layout/home/home';
import { NotFound } from './features/not-found/not-found';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'blogs', children: [
            { path: '', loadComponent: () => import('./features/blogs/blog-item/blog-item').then(c => c.BlogItem) },
            { path: ':slug', loadComponent: () => import('./features/blogs/current-blog/current-blog').then(c => c.CurrentBlog) },
        ]
    },
    { path: 'login', loadComponent: () => import('./features/auth/login/login').then(c => c.Login) },
    { path: 'register', loadComponent: () => import('./features/auth/register/register').then(c => c.Register) },
    { path: 'about', loadComponent: () => import('./features/about/about').then(c => c.About) },
    { path: 'add-blog', loadComponent: () => import('./features/blogs/create-blog/create-blog').then(c => c.CreateBlog) },
    { path: '404', component: NotFound },
    { path: '**', redirectTo: '/404' },
];
