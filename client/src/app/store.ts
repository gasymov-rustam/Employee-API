import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authSliceName, authSliceReducer } from '../features/auth/authSlice';
import { api } from './services/api';
import { employeeReducer, employeeSliceName } from '../features/employeeSlice/employeeSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authSliceName]: authSliceReducer,
    [employeeSliceName]: employeeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
