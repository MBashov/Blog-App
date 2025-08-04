import { inject } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Blog, BlogResponse, singleBlogResponse } from "../../models/blog";
import { ApiService } from "../services";
import { catchError, map, of } from "rxjs";

export const AuthGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isLoggedIn()) {
        return true;
    } else {
        return router.navigate(['/home']);
    }
}

export const isAuthorGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const apiService = inject(ApiService);
    const router = inject(Router);

    const slug: string = route.params['slug'];

    return apiService.getSingleBLog(slug).pipe(
        map((response: singleBlogResponse) => {
            if (authService.isAuthor(response.blog.author._id)) {
                return true;
            } else {
                console.log('Insufficient permissions');
                router.navigate(['/home']);
                return false;
            }
        }),
        catchError(() => {
            console.log('Error occurs while checking the author');
            return of(false);
            
        })
    )
}