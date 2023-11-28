import api from './api';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials
      }),
      /*
      extraOptions: {
        backoff: () => {
          retry.fail({ fake: 'error' })
        }
      }, */
      transformResponse: (response) => response
    }),
  })
});

export const {
  useLoginMutation
} = authApi;
