import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Cart } from '../../interfaces/models/cart';
import Product from '../../interfaces/models/product';

interface cartState {
    currentCart: Cart,
    totalQuantity: number,
    totalPrice: number,
}

const state = {
    currentCart: {
        id: '',
        cartProducts: [],
        user: undefined
    },
    totalQuantity: 0,
    totalPrice: 0,
} as cartState

export const cartSlice = createSlice({
    name: 'cart',
    initialState: state,

    reducers: {
        setCart: (state, action: PayloadAction<Cart>) => {
            state.currentCart = action.payload;
        },

        addProduct: (state, action: PayloadAction<Product>) => {

            let isProductFound = false;

            state.currentCart.cartProducts!.forEach(cartProduct => {

                if (cartProduct.product!.id === action.payload.id) {
                    //if the same product is already there then just increase the quantity 
                    cartProduct.quantity!++;
                    isProductFound = true;
                    return;
                }
            });

            if (!isProductFound) {
                //if product was not found then insert the cartProduct in the array
                state.currentCart.cartProducts!.push({
                    product: action.payload,
                    quantity: 1,
                });
            }

            //adding to total price and total quantity
            state.totalPrice += action.payload.price!;
            state.totalQuantity++;
        },

        removeProduct: (state, action: PayloadAction<Product>) => {

            let removedProductId = '';

            state.currentCart.cartProducts!.forEach(cartProduct => {

                if (cartProduct.product!.id === action.payload.id) {

                    cartProduct.quantity!--;

                    if (cartProduct.quantity! === 0) {
                        //if quantity is 0 then store the product id
                        removedProductId = action.payload.id!;
                    }
                    return;
                }
            });

            if (removedProductId) {
                //if the product id is stored then the quantity is 0 so cartProduct should be removed from the array
                state.currentCart.cartProducts = state.currentCart.cartProducts!.filter(cartProduct =>
                    cartProduct.product!.id !== removedProductId);
            }

            //removing from total price and total quantity
            state.totalPrice -= action.payload.price!;
            state.totalQuantity--;
        },

        cleanProduct: (state, action: PayloadAction<Product>) => {

            state.currentCart.cartProducts!.forEach(cartProduct => {

                if (cartProduct.product!.id === action.payload.id) {

                    //removing from total price and total quantity according to the quantity of the product
                    state.totalPrice -= action.payload.price! * cartProduct.quantity!;
                    state.totalQuantity -= cartProduct.quantity!;
                    return;
                }
            });

            state.currentCart.cartProducts = state.currentCart.cartProducts!.filter(cartProduct =>
                cartProduct.product!.id !== action.payload.id);

        },

        cleanCart: (state) => {
            state.currentCart = {
                id: '',
                cartProducts: [],
                user: undefined
            }
            state.totalPrice = 0;
            state.totalQuantity = 0;
        },
    }
});

export const { setCart, addProduct, removeProduct, cleanProduct, cleanCart } = cartSlice.actions;

export default cartSlice.reducer;
