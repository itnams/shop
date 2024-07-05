import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ token: string, userName: string, role: string }>()
);

export const logout = createAction('[Auth] Logout');
