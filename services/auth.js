import api from './api';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.query({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials
      }),
      extraOptions: {
        backoff: () => {
          retry.fail({ fake: 'error' })
        }
      },
      transformResponse: (response) => response.data
    }),
  })
});

export const {
  useLoginMutation
} = authApi;
