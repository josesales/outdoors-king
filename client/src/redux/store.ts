import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import persistedReducer from './rootReducer';
import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {

    //middlewares only for dev environment 
}

export const store = configureStore({
    //Root Reducer
    reducer: persistedReducer,

    middleware: getDefaultMiddleware => getDefaultMiddleware(
        {
            serializableCheck: { //for redux-persist
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }
    ).prepend(middlewares)
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;