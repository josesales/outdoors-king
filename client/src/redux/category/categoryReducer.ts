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
    }
});

export const { getCategories } = categorySlice.actions;

export default categorySlice.reducer;
