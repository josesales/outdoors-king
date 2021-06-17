import User from '../../interfaces/models/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface userState {
    currentUser?: User | null,
    token?: string | null,
}

const state = {
    currentUser: null,
    token: null,
} as userState

export const userSlice = createSlice({
    name: 'user',
    initialState: state,

    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
            state.token = action.payload.token;
        },
        save: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.currentUser = null;
            state.token = null;
        },
    }
});

export const { login, save, logout } = userSlice.actions;

export default userSlice.reducer;
