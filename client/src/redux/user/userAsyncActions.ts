import User from '../../interfaces/models/user';
import { sendRequest } from '../../graphql/request-sender';
import { loginQuery, logoutQuery, saveUserMutation } from '../../graphql/user';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { AnyAction } from 'redux';
import {
    login as loginAction,
    login as logoutAction,
    save as saveAction,
} from './userReducer';
import { displayMessage } from '../message/messageReducer';

export const login = (loginInput: User): ThunkAction<void, RootState, unknown, AnyAction> => {


    return async dispatch => {
        try {

            const user: User = await sendRequest(loginQuery(), { loginInput });
            dispatch(loginAction(user));
        } catch (error) {
            dispatch(displayMessage({ type: 'error', message: error.message }))
        }
    };
};

export const logout = (id: string): ThunkAction<void, RootState, unknown, AnyAction> => {

    return async dispatch => {
        try {

            const user: User = await sendRequest(logoutQuery(), { id });

            dispatch(logoutAction(user));
        } catch (error) {
            throw new Error(error.message);
        }
    };
};

export const save = (userInput: User): ThunkAction<void, RootState, unknown, AnyAction> => {

    return async dispatch => {

        const savedUser: User = await sendRequest(saveUserMutation(), { userInput });

        dispatch(saveAction(savedUser));
    };
};
