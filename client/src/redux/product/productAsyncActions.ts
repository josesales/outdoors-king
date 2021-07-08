import { sendRequest } from '../../graphql/request-sender';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { AnyAction } from 'redux';
import {
    setProducts as setProductsAction,
    setProduct as setProductAction,
    removeProduct as removeProductAction,
} from './productReducer';
import { displayMessage } from '../message/messageReducer';
import { deleteProductMutation, imageUploadMutation, productQuery, productsQuery, saveProductMutation } from '../../graphql/productGraphql';
import Product from '../../interfaces/models/product';
import { removeProductCategory } from '../category/categoryReducer';
import { getCategories } from '../category/categoryAsyncActions';

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

            if (productInput.category) {
                //to send the product to the server without the category.products[]
                const { products, ...category } = productInput.category;

                if (productInput.category.products) {
                    productInput.category = category;
                }
            }

            //to send the product to the server without the image
            const { image, ...productInputWithoutImage } = productInput;

            const savedProduct: Product = await sendRequest(saveProductMutation(),
                { productInput: productInputWithoutImage }, token);

            if (savedProduct?.id) {

                if (base64Image) {
                    await sendRequest(imageUploadMutation, { id: savedProduct.id, base64Image }, token);
                }

                dispatch(getCategories());
                dispatch(displayMessage({ type: 'success', message: `Product ${productInput.id ? 'updated' : 'created'} successfully` }));
            }
        } catch (error) {
            dispatch(displayMessage({ type: 'error', message: error.message }));
        }
    };
};

export const removeProduct = (id: string, token: string): ThunkAction<void, RootState, unknown, AnyAction> => {

    return async dispatch => {
        try {

            await sendRequest(deleteProductMutation, { id }, token!);

            dispatch(removeProductAction(id));
            dispatch(removeProductCategory(id));
            dispatch(displayMessage({ type: 'success', message: `Product deleted successfully` }));
        } catch (error) {
            dispatch(displayMessage({ type: 'error', message: error.message }));
        }
    };
};