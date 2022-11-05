import api from './api';

export const environmentsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getEnvironments: build.query({
      query() {
        return '/environments'
      },
      providesTags: [{ type: 'Environments', id: 'LIST' }],
      transformResponse: (response) => response.data
    }),
    getEnvironmentSites: build.query({
      query(envId) {
        return `/environments/${envId}/sites`
      },
      providesTags: (_environments, _err, envId) => [
        { type: 'EnvironmentSites', id: envId }
      ],
      transformResponse: (response) => response.data
    }),
    addEnvironment: build.mutation({
      query(params) {
        return {
          url: `/environments`,
          method: 'POST',
          params
        }
      },
      invalidatesTags: (env) => [
        { type: 'Environments', id: 'LIST' },
        { type: 'Environments', id: env?.id }
      ]
    }),
    editEnvironment: build.mutation({
      query(params) {
        const id = params['id'];
        delete params['id'];

        console.log('editEnvironment', id, params);
        
        return {
          url: `/environments/${id}`,
          method: 'PUT',
          params
        }
      },
      invalidatesTags: (env) => [
        { type: 'Environments', id: 'LIST' },
        { type: 'Environments', id: env?.id }
      ]
    }),
    deleteEnvironment: build.mutation({
      query(id) {
        return {
          url: `/environments/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: (env) => [
        { type: 'Environments', id: 'LIST' },
        { type: 'Environments', id: env?.id }
      ]
    })
  })
});

export const {
  useGetEnvironmentsQuery,
  useGetEnvironmentSitesQuery,
  useAddEnvironmentMutation,
  useEditEnvironmentMutation,
  useDeleteEnvironmentMutation
} = environmentsApi;
