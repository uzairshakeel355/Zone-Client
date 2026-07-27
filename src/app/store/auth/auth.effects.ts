import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ request }) =>
        this.authService.login(request).pipe(
          map(response => AuthActions.loginSuccess({ response })),
          catchError(err => of(AuthActions.loginFailure({ error: err.error?.message ?? 'Login failed' })))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ request }) =>
        this.authService.register(request).pipe(
          map(response => AuthActions.registerSuccess({ response })),
          catchError(err => of(AuthActions.registerFailure({ error: err.error?.message ?? 'Registration failed' })))
        )
      )
    )
  );

  rehydrate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.rehydrate),
      switchMap(() =>
        this.authService.me().pipe(
          map(user => AuthActions.rehydrateSuccess({ user })),
          catchError(() => of(AuthActions.rehydrateFailure()))
        )
      )
    )
  );

  redirectAfterAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
      tap(() => this.router.navigate(['/']))
    ), { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => { this.authService.logout(); this.router.navigate(['/login']); })
    ), { dispatch: false }
  );

  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}
}