import api, { validateReponse } from './api';

export const sitesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSites: build.query({
      query() {
        return {
          url: `/sites`,
          validateStatus: validateReponse
        }
      },
      providesTags: [{ type: 'Sites', id: 'LIST' }],
      transformResponse: (response) => response.data
    }),
    addSite: build.mutation({
      query(params) {
        return {
          url: `/sites`,
          method: 'POST',
          params,
          validateStatus: validateReponse
        }
      },
      invalidatesTags: (site) => [
        { type: 'Sites', id: 'LIST' },
        { type: 'Sites', id: site?.id }
      ]
    }),
    editSite: build.mutation({
      query(params) {
        const id = params['id'];
        delete params['id'];

        return {
          url: `/sites/${id}`,
          method: 'PUT',
          params,
          validateStatus: validateReponse
        }
      },
      invalidatesTags: (site) => [
        { type: 'Sites', id: 'LIST' },
        { type: 'Sites', id: site?.id }
      ]
    }),
    deleteSite: build.mutation({
      query(id) {
        return {
          url: `/sites/${id}`,
          method: 'DELETE',
          validateStatus: validateReponse
        }
      },
      invalidatesTags: (site) => [
        { type: 'Sites', id: 'LIST' },
        { type: 'Sites', id: site?.id }
      ]
    })
  })
});

export const clearEnvironmentSites = (envId) => {
  return api.util.invalidateTags([{
    type: 'EnvironmentSites',
    id: envId
  }]);
};

export const {
  useGetSitesQuery,
  useAddSiteMutation,
  useEditSiteMutation,
  useDeleteSiteMutation
} = sitesApi;
