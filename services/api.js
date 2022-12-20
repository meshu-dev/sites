import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getBaseQueryParams = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include'
};

const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Environments', 'EnvironmentSites', 'Sites'],
  baseQuery: fetchBaseQuery(getBaseQueryParams),
  endpoints: () => ({ })
});

export default api;
