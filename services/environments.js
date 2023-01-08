import api, { validateReponse } from './api';

export const environmentsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getEnvironments: build.query({
      query() {
        return {
          url: `/environments`,
          validateStatus: validateReponse
        }
      },
      providesTags: [{ type: 'Environments', id: 'LIST' }],
      transformResponse: (response) => response.data
    }),
    getEnvironmentSites: build.query({
      query(envId) {
        return {
          url: `/environments/${envId}/sites`,
          validateStatus: validateReponse
        }
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
          params,
          validateStatus: validateReponse
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
        
        return {
          url: `/environments/${id}`,
          method: 'PUT',
          params,
          validateStatus: validateReponse
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
          method: 'DELETE',
          validateStatus: validateReponse
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
