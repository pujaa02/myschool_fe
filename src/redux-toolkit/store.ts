// ** Packages **
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// ** Redux **
import persistStore from 'redux-persist/es/persistStore';
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'PROLEVEN',
  storage,
  blacklist: ['notificationIsRead'],
  whitelist: ['language', 'token', 'sidebar', 'boardData', 'company'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatchType = typeof store.dispatch;
export const useAppDispatch: () => AppDispatchType = useDispatch;

export type RootStateType = ReturnType<typeof store.getState>;
export default store;
export const persistor = persistStore(store);
