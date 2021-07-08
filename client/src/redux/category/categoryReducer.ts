import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Category from '../../interfaces/models/category';

interface categoryState {
    categories?: Category[],
}

const state = {
    categories: [],
} as categoryState

export const categorySlice = createSlice({
    name: 'category',
    initialState: state,

    reducers: {
        getCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
        },
        removeProductCategory: (state, action: PayloadAction<string>) => {
            let productFound = false;
            for (let i = 0; i < state.categories!.length; i++) {
                const category = state.categories![i];
                const products = category.products?.filter(product => product.id !== action.payload);

                if (category.products!.length > products!.length) {
                    productFound = true;
                }

                state.categories![i].products = products;

                if (productFound) {
                    break;
                }
            }
        },
    }
});

export const { getCategories, removeProductCategory } = categorySlice.actions;

export default categorySlice.reducer;
