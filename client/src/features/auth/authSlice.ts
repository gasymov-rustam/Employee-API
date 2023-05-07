import { createSlice } from '@reduxjs/toolkit';
import { UserData, authApi } from '../../app/services/auth';
import { RootState } from '../../app/store';

interface InitialState {
  user: UserData | null;
  isAuthenticated: boolean;
}

const initialState: InitialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase('LOGOUT', (state) => {
        Object.assign(state, initialState);
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        const user = {
          id: action.payload.data.id,
          name: action.payload.data.name,
          email: action.payload.data.email,
          token: action.payload.data.token,
        };
        state.user = user;
        state.isAuthenticated = true;
      })
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
        const user = {
          id: action.payload.data.id,
          name: action.payload.data.name,
          email: action.payload.data.email,
          token: action.payload.data.token,
        };
        state.user = user;
        state.isAuthenticated = true;
      })
      .addMatcher(authApi.endpoints.current.matchFulfilled, (state, action) => {
        if (action.payload.data) {
          state.isAuthenticated = true;
          const token = localStorage.getItem('token');

          if (token) {
            const user: UserData = { ...action.payload.data, token };
            state.user = user;
          }

          return;
        }

        state.isAuthenticated = false;
      });
  },
});

export const { actions: authSliceActions, name: authSliceName, reducer: authSliceReducer } = authSlice;

export const getIsCurrentUserAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export const getCurrentUser = (state: RootState) => state.auth.user;
