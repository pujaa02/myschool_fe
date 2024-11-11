// ** Packages **
import { configureStore, Middleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// ** Redux **
import persistStore from 'redux-persist/es/persistStore';
import rootReducer from './rootReducer';
import baseQueryApi from './api/baseQueryApi';
import { userApi } from './api/userApi';

const middleWares: Middleware[] = [baseQueryApi.middleware, userApi.middleware,];

const persistConfig = {
  key: 'MYSCHOOL',
  storage,
  whitelist: ['common', 'audit'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(middleWares),
});

export type AppDispatchType = typeof store.dispatch;
export const useAppDispatch: () => AppDispatchType = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export default store;
export const persistor = persistStore(store);
