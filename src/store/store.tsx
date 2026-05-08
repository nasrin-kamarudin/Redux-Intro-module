import { configureStore } from '@reduxjs/toolkit';
import drsSlice from './slices/drsSlice';
import inboxSlice from './slices/inboxSlice';

export const store = configureStore({
  reducer: {
    drs: drsSlice,
    inbox: inboxSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;