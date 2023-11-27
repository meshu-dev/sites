import api, { validateReponse } from './api'
import { ApiResponse } from '@/app/types'

export const iconsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getIcons: build.query({
      query() {
        return {
          url: `/icons`,
          validateStatus: validateReponse
        }
      },
      providesTags: [{ type: 'Icons', id: 'LIST' }],
      transformResponse: (response: ApiResponse) => response.data
    })
  })
});

export const {
  useGetIconsQuery
} = iconsApi;
