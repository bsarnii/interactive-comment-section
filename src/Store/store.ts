import { configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import { postsReducer } from "./Reducers/postsReducer"
import { userReducer } from "./Reducers/userReducer";

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        user: persistedReducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
    }),
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch