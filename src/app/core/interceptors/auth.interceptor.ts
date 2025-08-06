import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services';
import { catchError, switchMap, throwError } from 'rxjs';
import { getAccessToken } from '../../shared/utils';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const authService = inject(AuthService);
    const accessToken: string | null = getAccessToken();

    const isRefreshRequest = req.url.includes('refresh-token');

    const clonedRequest = !isRefreshRequest && accessToken
        ? req.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        : req;

    return next(clonedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
            const isUnauthorized = error.status === 401;

            if (isUnauthorized && !isRefreshRequest) {
                return authService.refreshToken().pipe(
                    switchMap(newToken => {
                        const retryRequest = req.clone({
                            setHeaders: {
                                Authorization: `Bearer ${newToken}`
                            }
                        });
                        return next(retryRequest);
                    }),
                    catchError(refreshErr => {
                        authService.logout(false);
                        return throwError(() => refreshErr);
                    })
                );
            }

            return throwError(() => error);
        })
    );
};
