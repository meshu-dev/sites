import api, { validateReponse } from './api';

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
      transformResponse: (response) => response.data
    })
  })
});

export const {
  useGetIconsQuery
} = iconsApi;
