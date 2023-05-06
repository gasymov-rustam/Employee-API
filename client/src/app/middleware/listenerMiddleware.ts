import { createListenerMiddleware } from '@reduxjs/toolkit';
import { authApi } from '../services/auth';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: authApi.endpoints.login.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (action.payload.data.token) {
      localStorage.setItem('token', action.payload.data.token);
    }
  },
});

export const logoutMiddleware = createListenerMiddleware();

logoutMiddleware.startListening({
  type: 'LOGOUT',
  effect: async (action, listenerApi) => {
    listenerApi.dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
    listenerApi.cancelActiveListeners();
  },
});
