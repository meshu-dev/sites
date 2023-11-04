import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getBaseQueryParams = {
  baseUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api`,
  prepareHeaders: (headers, { getState }) => {
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    return headers
  },
  credentials: 'include'
};

export const validateReponse = (response) => {
  if (response && response.status === 401) {
    window.location.href = '/login';
    return false;
  }
  return true;
};

const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Environments', 'Icons', 'EnvironmentSites', 'Sites'],
  baseQuery: fetchBaseQuery(getBaseQueryParams),
  endpoints: () => ({ })
});

export default api;
