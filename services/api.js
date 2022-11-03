import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authToken } from '../components/auth.js';

const getBaseQueryParams = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders(headers) {
    const token = authToken();
    headers.set('Authorization', `Bearer ${token}`);

    return headers;
  }
};

const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Environment', 'EnvironmentSite', 'Site'],
  baseQuery: fetchBaseQuery(getBaseQueryParams),
  endpoints: () => ({ })
});

export default api;
