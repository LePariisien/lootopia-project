import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = localStorage.getItem('accessToken');

  const cloned = token
    ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        ContentType: 'application/json'
      }
    })
    : req;

  return next(cloned).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return auth.refreshToken().pipe(
          switchMap((res) => {
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            const retryReq = req.clone({
              body: { 'accessToken': res.accessToken },
              setHeaders: { Authorization: `Bearer ${res.refreshToken}` }
            });
            return next(retryReq);
          }),
          catchError(() => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            return throwError(() => error);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
