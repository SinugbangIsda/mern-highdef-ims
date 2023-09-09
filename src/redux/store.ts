import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authServices";
import authSlice from "./slices/authSlice";
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import themeSlice from "./slices/themeSlice";
import { transactionsApi } from "./services/transactionsServices";
import { usersApi } from "./services/usersServices";

export const store = configureStore({
    reducer: {
        [ authApi.reducerPath ]: authApi.reducer,
        [ transactionsApi.reducerPath ]: transactionsApi.reducer,
        [ usersApi.reducerPath ]: usersApi.reducer,
        auth: authSlice,
        theme: themeSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(
            authApi.middleware,
            transactionsApi.middleware,
            usersApi.middleware
        )  
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;