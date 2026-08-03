import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/auth/auth.actions';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  return next(req).pipe(
    catchError(err => {
      if (err.status === 401) {
        store.dispatch(AuthActions.logout());
      }
      return throwError(() => err);
    })
  );
};