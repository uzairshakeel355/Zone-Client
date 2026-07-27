import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, AuthActions.register, (state) => ({ ...state, loading: true, error: null })),

  on(AuthActions.loginSuccess, AuthActions.registerSuccess, (state, { response }) => ({
    ...state,
    loading: false,
    token: response.token,
    user: { email: response.email, firstName: response.firstName, lastName: response.lastName, roles: response.roles }
  })),

  on(AuthActions.loginFailure, AuthActions.registerFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(AuthActions.rehydrateSuccess, (state, { user }) => ({ ...state, user })),
  on(AuthActions.rehydrateFailure, AuthActions.logout, () => initialAuthState),
);