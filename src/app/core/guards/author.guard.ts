import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { ApiService, AuthService } from "../services";
import { singleBlogResponse } from "../../models/blog";
import { catchError, map, of } from "rxjs";

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
                router.navigate(['/404']);
                return false;
            }
        }),
        catchError(() => {
            return of(false);
        })
    )
}