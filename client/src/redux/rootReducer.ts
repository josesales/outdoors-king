import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import categoryReducer from './category/categoryReducer'
import messageReducer from './message/messageReducer'
import userReducer from './user/userReducer'
import productReducer from './product/productReducer'
import cartReducer from './cart/cartReducer'


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    user: userReducer,
    message: messageReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
})

export default persistReducer(persistConfig, rootReducer)