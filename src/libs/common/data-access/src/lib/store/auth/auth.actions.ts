import { createAction, props } from '@ngrx/store';
import { Cart } from '../../model';

export const login = createAction(
  '[Auth] Login',
  props<{ token: string, userName: string, role: string }>()
);

export const logout = createAction('[Auth] Logout');

export const addToCart = createAction(
  '[Auth] Add To Cart',
  props<{ cart: Cart }>()
);

export const clearCart = createAction('[Auth] Clear Cart');
