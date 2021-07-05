import { sendRequest } from '../../graphql/request-sender';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { AnyAction } from 'redux';
import {
    setProducts as setProductsAction,
    setProduct as setProductAction,
    setImage as setImageAction
} from './productReducer';
import { displayMessage } from '../message/messageReducer';
import { imageUploadMutation, productQuery, productsQuery, saveProductMutation } from '../../graphql/productGraphql';
import Product from '../../interfaces/models/product';

export const setProducts = (productInput?: Product): ThunkAction<void, RootState, unknown, AnyAction> => {


    return async dispatch => {
        try {

            let products: Product[] = [];

            if (productInput) {
                products = await sendRequest(productsQuery(), { productInput });
            } else {
                products = await sendRequest(productsQuery());
            }

            dispatch(setProductsAction(products));
        } catch (error) {
            dispatch(displayMessage({ type: 'error', message: error.message }));
        }
    };
};

export const setProduct = (id: string): ThunkAction<void, RootState, unknown, AnyAction> => {


    return async dispatch => {
        try {

            const product: Product = await sendRequest(productQuery(), { id });
            dispatch(setProductAction(product));
        } catch (error) {
            dispatch(displayMessage({ type: 'error', message: error.message }));
        }
    };
};

export const save = (productInput: Product, base64Image?: string, token?: string): ThunkAction<void, RootState, unknown, AnyAction> => {

    return async dispatch => {
        try {

            const savedProduct: Product = await sendRequest(saveProductMutation(), { productInput }, token);

            if (savedProduct?.id) {

                if (base64Image) {
                    const isImageSaved = await sendRequest(imageUploadMutation, { id: savedProduct.id, base64Image }, token);

                    if (isImageSaved) {
                        dispatch(setImageAction(base64Image));
                    }
                }

                dispatch(displayMessage({ type: 'success', message: `Product ${productInput.id ? 'updated' : 'created'} successfully` }));
            }
        } catch (error) {
            dispatch(displayMessage({ type: 'error', message: error.message }));
        }

    };
};