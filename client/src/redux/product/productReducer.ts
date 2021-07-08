import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Product from '../../interfaces/models/product';

interface productState {
    products?: Product[],
    product?: Product | null,
    image?: string,
    searchActive?: boolean,
    isSearching?: boolean,
}

const state = {
    products: [],
    product: null,
    image: '',
    searchActive: false,
    isSearching: false,
} as productState

export const userSlice = createSlice({
    name: 'user',
    initialState: state,

    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
        setProduct: (state, action: PayloadAction<Product>) => {
            state.product = action.payload;
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products?.filter(product => product.id !== action.payload)
        },
        setImage: (state, action: PayloadAction<string>) => {
            state.image = action.payload;
        },
        setSearchActive: (state, action: PayloadAction<boolean>) => {
            state.searchActive = action.payload;
        },
        setIsSearching: (state, action: PayloadAction<boolean>) => {
            state.isSearching = action.payload;
        },
    }
});

export const { setProducts, setProduct, setImage, setSearchActive, setIsSearching, removeProduct } = userSlice.actions;

export default userSlice.reducer;
