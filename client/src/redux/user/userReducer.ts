import User from '../../interfaces/models/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface userState {
    currentUser?: User | null,
    token?: string | null,
    confirmPassword?: { id?: string, name?: string, email: string } | null,
}

const state = {
    currentUser: null,
    token: null,
    confirmPassword: null,
} as userState

export const userSlice = createSlice({
    name: 'user',
    initialState: state,

    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
            state.token = action.payload.token;
        },
        signUp: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.currentUser = null;
            state.token = null;
        },
        confirmPassword: (state, action: PayloadAction<User | null>) => {
            state.confirmPassword = action.payload;
        },
    }
});

export const { login, signUp, logout, confirmPassword } = userSlice.actions;

export default userSlice.reducer;
