import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";

import { Blog, singleBlogResponse } from "../../../models/blog";
import { map, Observable } from "rxjs";
import { ApiService } from "../../../core/services";

export const blogResolver: ResolveFn<Blog> = (route) => {
    const apiService = inject(ApiService);
    const blogSlug: string = route.params['slug'];
    
    return apiService.getSingleBLog(blogSlug).pipe(
        map((response: singleBlogResponse) => response.blog)
    );
};