
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../../core/models/user.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{ request: LoginRequest }>(),
    'Login Success': props<{ response: AuthResponse }>(),
    'Login Failure': props<{ error: string }>(),

    'Register': props<{ request: RegisterRequest }>(),
    'Register Success': props<{ response: AuthResponse }>(),
    'Register Failure': props<{ error: string }>(),

    'Rehydrate': emptyProps(),
    'Rehydrate Success': props<{ user: User }>(),
    'Rehydrate Failure': emptyProps(),

    'Logout': emptyProps(),
  }
});