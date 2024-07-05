import { createReducer, on } from '@ngrx/store';
import { login, logout } from './auth.actions';

export interface AuthState {
    token?: string;
    userName?: string;
    role?: string;
}

export const initialState: AuthState = {
    token: '',
    userName: '',
    role: ''
};

export const authReducer = createReducer(
    initialState,
    on(login, (state, { token, userName, role }) => ({ ...state, token, userName, role })),
    on(logout, state => ({ ...state, token: '' }))
);
