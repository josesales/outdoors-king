import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import categoryReducer from './category/categoryReducer'
import messageReducer from './message/messageReducer'
import userReducer from './user/userReducer'


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    user: userReducer,
    message: messageReducer,
    category: categoryReducer,
})

export default persistReducer(persistConfig, rootReducer)