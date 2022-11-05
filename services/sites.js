import api from './api';

export const sitesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSites: build.query({
      query() {
        return '/sites'
      },
      providesTags: [{ type: 'Sites', id: 'LIST' }],
      transformResponse: (response) => response.data
    }),
    addSite: build.mutation({
      query(params) {
        return {
          url: `/sites`,
          method: 'POST',
          params
        }
      },
      invalidatesTags: (site) => [
        { type: 'Sites', id: 'LIST' },
        { type: 'Sites', id: site?.id }
      ]
    }),
    editSite: build.mutation({
      query(id, params) {
        return {
          url: `/sites/${id}`,
          method: 'PUT',
          params
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
          method: 'DELETE'
        }
      },
      invalidatesTags: (site) => [
        { type: 'Sites', id: 'LIST' },
        { type: 'Sites', id: site?.id }
      ]
    })
  })
});

export const {
  useGetSitesQuery,
  useAddSiteMutation,
  useEditSiteMutation,
  useDeleteSiteMutation
} = sitesApi;
