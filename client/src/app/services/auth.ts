import { apiRequests, methods } from '../constants';
import { api } from './api';

export interface UserData {
  name: string;
  email: string;
  token: string;
}

type CurrentUser = Omit<UserData, 'token'>;

type ResponseLoginData = { message: string; data: UserData };

type ResponseCurrentData = { message: string; data: CurrentUser };

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ResponseLoginData, UserData>({
      query: (userData) => ({
        url: apiRequests.LOGIN,
        method: methods.POST,
        body: userData,
      }),
    }),
    register: builder.mutation<ResponseLoginData, UserData>({
      query: (userData) => ({
        url: apiRequests.REGISTER,
        method: methods.POST,
        body: userData,
      }),
    }),
    current: builder.query<ResponseCurrentData, void>({
      query: (data) => ({
        url: apiRequests.CURRENT,
        method: methods.GET,
        body: data,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useCurrentQuery, endpoints: authApiEndpoints } = authApi;
