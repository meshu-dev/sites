import api, { validateReponse } from './api'
import { ApiResponse, Category, Site } from '@/app/types'

export const categoriesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<Category[], void>({
      query() {
        return {
          url: `/categories`,
          validateStatus: validateReponse
        }
      },
      providesTags: [{ type: 'Categories', id: 'LIST' }],
      transformResponse: (response: ApiResponse) => response.data as Category[]
    }),
    getCategorySites: build.query<Site[], number>({
      query(categoryId: number) {
        return {
          url: `/categories/${categoryId}/sites`,
          validateStatus: validateReponse
        }
      },
      providesTags: (_sites, _err, categoryId) => [
        { type: 'CategorySites', id: categoryId }
      ],
      transformResponse: (response: ApiResponse) => response.data as Site[]
    }),
    addCategory: build.mutation<Category, Partial<Category>>({
      query(body) {
        return {
          url: `/categories`,
          method: 'POST',
          body,
          validateStatus: validateReponse
        }
      },
      invalidatesTags: (category) => [
        { type: 'Categories', id: 'LIST' },
        { type: 'Categories', id: category?.id }
      ],
      transformResponse: (response: ApiResponse | any) => {

        console.log('RES', response)

        return response
      }
    }),
    editCategory: build.mutation<Category, Partial<Category>>({
      query(body) {

        console.log('edit env', body);

        return {
          url: `/categories/${body.id}`,
          method: 'PUT',
          body: {
            name: body.name
          },
          validateStatus: validateReponse
        }
      },
      invalidatesTags: (category) => [
        { type: 'Categories', id: 'LIST' },
        { type: 'Categories', id: category?.id }
      ]
    }),
    deleteCategory: build.mutation<ApiResponse, Partial<number>>({
      query(id) {
        return {
          url: `/categories/${id}`,
          method: 'DELETE',
          validateStatus: validateReponse
        }
      },
      invalidatesTags: (_response, _err, id) => [
        { type: 'Categories', id: 'LIST' },
        { type: 'Categories', id }
      ]
    })
  })
});

export const {
  useGetCategoriesQuery,
  useGetCategorySitesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation
} = categoriesApi
