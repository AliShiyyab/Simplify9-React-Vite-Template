import { createApi, FetchBaseQueryError, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import customFetchBase from "./fetchBase";
import {FetchArgs} from "@reduxjs/toolkit/query";

interface Credentials {
    username: string;
    password: string;
}

interface User {
    username: string;
    password: string;
    email: string;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: customFetchBase as BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    endpoints: (builder) => ({
        login: builder.mutation<any, Credentials>({
            query: (credentials: Credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation<any, User>({
            query: (user: User) => ({
                url: 'auth/register',
                method: 'POST',
                body: user,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
