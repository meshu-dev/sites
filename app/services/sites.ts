import api, { validateReponse } from './api'
import { ApiResponse, Site } from '@/app/types'

export const sitesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSites: build.query<Site[], void>({
      query() {
        return {
          url: `/sites`,
          validateStatus: validateReponse
        }
      },
      providesTags: [{ type: 'Sites', id: 'LIST' }],
      transformResponse: (response: ApiResponse) => response.data as Site[]
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
      invalidatesTags: (_response, _err, id) => [
        { type: 'Sites', id: 'LIST' },
        { type: 'Sites', id }
      ]
    })
  })
});

export const clearCategorySites = (categoryId: number) => {
  return api.util.invalidateTags([{
    type: 'CategorySites',
    id: categoryId
  }]);
};

export const {
  useGetSitesQuery,
  useAddSiteMutation,
  useEditSiteMutation,
  useDeleteSiteMutation
} = sitesApi;
