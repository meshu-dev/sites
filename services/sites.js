import api from './api';

export const sitesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSites: build.query({
      query() {
        return '/sites'
      },
      transformResponse: (response) => response.data
    }),
  })
});

export const {
  useGetSitesQuery
} = sitesApi;
