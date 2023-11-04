import api, { validateReponse } from './api';

export interface Site {
  id? :number,
  iconId :number,
  name: string
  url: string
}

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
    addSite: build.mutation<Site, Partial<Site>>({
      query(body) {
        return {
          url: `/sites`,
          method: 'POST',
          body,
          validateStatus: validateReponse
        }
      },
      invalidatesTags: (site) => [
        { type: 'Sites', id: 'LIST' },
        { type: 'Sites', id: site?.id }
      ]
    }),
    editSite: build.mutation<Site, Partial<Site>>({
      query(body) {
        return {
          url: `/sites/${body.id}`,
          method: 'PUT',
          body: {
            iconId: body.iconId,
            name: body.name,
            url: body.url
          },
          validateStatus: validateReponse
        }
      },
      invalidatesTags: (site) => [
        { type: 'Sites', id: 'LIST' },
        { type: 'Sites', id: site?.id }
      ]
    }),
    deleteSite: build.mutation<number, Partial<number>>({
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

export const clearEnvironmentSites = (envId: number) => {
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
