import { configureStore } from "@reduxjs/toolkit";
import getUsersSlice from "./API/getUsersSlice";
import getTodosSlice from './API/getTodosSlice';

const store = configureStore({
    reducer: {
        users: getUsersSlice,
        todos: getTodosSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;