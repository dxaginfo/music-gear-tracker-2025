import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

// Import reducers
import authReducer from './slices/authSlice';
import equipmentReducer from './slices/equipmentSlice';
import uiReducer from './slices/uiSlice';
import notificationReducer from './slices/notificationSlice';

// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    equipment: equipmentReducer,
    ui: uiReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values in the specified action types
        ignoredActions: ['auth/loginSuccess'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;