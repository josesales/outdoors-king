import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Product from '../../interfaces/models/product';

interface productState {
    products?: Product[],
    product?: Product | null,
    image?: string
}

const state = {
    products: [],
    product: null,
    image: '',
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
        setImage: (state, action: PayloadAction<string>) => {
            state.image = action.payload;
        },
    }
});

export const { setProducts, setProduct, setImage } = userSlice.actions;

export default userSlice.reducer;
