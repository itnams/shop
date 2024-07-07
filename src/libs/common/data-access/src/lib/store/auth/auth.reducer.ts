import { createReducer, on } from '@ngrx/store';
import { login, logout, addToCart, clearCart } from './auth.actions';
import { Cart } from '@shop/data-access';

export interface AuthState {
    token?: string;
    userName?: string;
    role?: string;
    cart?: Cart;
}

export const initialState: AuthState = {
    token: '',
    userName: '',
    role: '',
    cart: {},
};

export const authReducer = createReducer(
    initialState,
    on(login, (state, { token, userName, role }) => ({ ...state, token, userName, role })),
    on(logout, state => ({ ...state, token: '', userName: '', role: '', cart: {} })),
    on(addToCart, (state, { cart }) => ({ ...state, cart })),
    on(clearCart, state => ({ ...state, cart: {} }))
);
