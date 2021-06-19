import User from '../../interfaces/models/user';
import { sendRequest } from '../../graphql/request-sender';
import { confirmPasswordResetCodeQuery, loginQuery, logoutQuery, resetPasswordMutation, saveUserMutation, sendPasswordEmailQuery } from '../../graphql/userGraphql';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { AnyAction } from 'redux';
import {
    confirmPassword,
    login as loginAction,
    login as logoutAction,
    signUp as signUpAction,
} from './userReducer';
import { displayMessage } from '../message/messageReducer';

export const login = (loginInput: User): ThunkAction<void, RootState, unknown, AnyAction> => {


    return async dispatch => {
        try {

            const user: User = await sendRequest(loginQuery(), { loginInput });
            dispatch(loginAction(user));
        } catch (error) {
            dispatch(displayMessage({ type: 'error', message: error.message }));
        }
    };
};

export const logout = (id: string): ThunkAction<void, RootState, unknown, AnyAction> => {

    return async dispatch => {
        try {

            const user: User = await sendRequest(logoutQuery, { id });

            dispatch(logoutAction(user));
        } catch (error) {
            throw new Error(error.message);
        }
    };
};

export const signUp = (userInput: User): ThunkAction<void, RootState, unknown, AnyAction> => {

    return async dispatch => {
        try {

            const savedUser: User = await sendRequest(saveUserMutation(), { userInput });
            dispatch(signUpAction(savedUser));
        } catch (error) {
            dispatch(displayMessage({ type: 'error', message: error.message }));
        }

    };
};

export const save = (userInput: User, token?: string): ThunkAction<void, RootState, unknown, AnyAction> => {

    return async dispatch => {
        try {

            const savedUser: User = await sendRequest(saveUserMutation(), { userInput }, token);

            if (savedUser?.id) {
                dispatch(displayMessage({ type: 'success', message: `User ${userInput.id ? 'updated' : 'created'} successfully` }));
            }
        } catch (error) {
            dispatch(displayMessage({ type: 'error', message: error.message }));
        }

    };
};

export const sendPasswordEmail = (email: string): ThunkAction<void, RootState, unknown, AnyAction> => {

    return async dispatch => {
        try {

            await sendRequest(sendPasswordEmailQuery, { email });
        } catch (error) {
            dispatch(displayMessage({ type: 'error', message: error.message }));
        }
    };
};

export const confirmPasswordResetCode = (email: string, code: number): ThunkAction<void, RootState, unknown, AnyAction> => {

    return async dispatch => {
        try {
            const { id, name } = await sendRequest(confirmPasswordResetCodeQuery, { email, code });

            const user: User = {
                id,
                email,
                name,
            }
            dispatch(confirmPassword(user));


        } catch (error) {
            dispatch(confirmPassword(null));
            dispatch(displayMessage({ type: 'error', message: error.message }));
        }
    };
};

export const resetPassword = (newPassword: string, userInput: User): ThunkAction<void, RootState, unknown, AnyAction> => {

    return async dispatch => {
        try {
            const isPasswordReset = await sendRequest(resetPasswordMutation, { newPassword, userInput });


            if (isPasswordReset) {
                dispatch(displayMessage({ type: 'success', message: 'Password reset successfully. You may login now' }));
            }

        } catch (error) {
            dispatch(displayMessage({ type: 'error', message: error.message }));
        }
    };
};