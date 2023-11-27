import api, { validateReponse } from './api'
import { ApiResponse, Icon } from '@/app/types'

export const iconsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getIcons: build.query<Icon[], void>({
      query() {
        return {
          url: `/icons`,
          validateStatus: validateReponse
        }
      },
      providesTags: [{ type: 'Icons', id: 'LIST' }],
      transformResponse: (response: ApiResponse) => response.data as Icon[]
    })
  })
});

export const {
  useGetIconsQuery
} = iconsApi;
