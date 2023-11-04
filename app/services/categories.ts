import api, { validateReponse } from './api';

export interface Category {
  id? :number
  name: string
}

export const categoriesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query() {
        return {
          url: `/categories`,
          validateStatus: validateReponse
        }
      },
      providesTags: [{ type: 'Categories', id: 'LIST' }],
      transformResponse: (response) => response.data
    }),
    getCategorySites: build.query({
      query(categoryId) {
        return {
          url: `/categories/${categoryId}/sites`,
          validateStatus: validateReponse
        }
      },
      providesTags: (_categories, _err, categoryId) => [
        { type: 'CategorySites', id: categoryId }
      ],
      transformResponse: (response) => response.data
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
      ]
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
    deleteCategory: build.mutation<number, Partial<number>>({
      query(id) {
        return {
          url: `/categories/${id}`,
          method: 'DELETE',
          validateStatus: validateReponse
        }
      },
      invalidatesTags: (category) => [
        { type: 'Categories', id: 'LIST' },
        { type: 'Categories', id: category?.id }
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
} = categoriesApi;
