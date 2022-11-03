import api from './api';

export const environmentsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getEnvironments: build.query({
      query() {
        return '/environments'
      },
      transformResponse: (response) => response.data
    }),
    getEnvironmentSites: build.query({
      query(envId) {
        return `/environments/${envId}/sites`
      },
      providesTags: ['EnvironmentSite'],
      transformResponse: (response) => response.data
    })
  })
});

export const {
  useGetEnvironmentsQuery,
  useGetEnvironmentSitesQuery
} = environmentsApi;
