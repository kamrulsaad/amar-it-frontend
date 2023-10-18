import { TagTypes } from '@/redux/tag-types'
import { baseApi } from '../baseApi'

const BLOG_CATEGORY = '/blog-category'

export const blogCategory = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBlogCategory: build.mutation({
      query: (blogCategoryData) => ({
        url: `${BLOG_CATEGORY}`,
        method: 'POST',
        data: blogCategoryData,
      }),
      invalidatesTags: [TagTypes.blogCategory],
    }),
    getBlogCategories: build.query({
      query: () => ({
        url: `${BLOG_CATEGORY}`,
        method: 'GET',
      }),
      providesTags: [TagTypes.blogCategory],
    }),
    getBlogCategory: build.query({
      query: (blogCategoryId) => ({
        url: `${BLOG_CATEGORY}/${blogCategoryId}`,
        method: 'GET',
      }),
      providesTags: [TagTypes.blogCategory],
    }),
    updateBlogCategory: build.mutation({
      query: ({ id, ...blogCagory }) => ({
        url: `${BLOG_CATEGORY}/${id}`,
        method: 'PATCH',
        data: blogCagory,
      }),
      onQueryStarted: async (
        { blogCagory, id },
        { dispatch, queryFulfilled }
      ) => {
        dispatch(
          blogCategory.util.updateQueryData('getBlogCategory', id, (draft) => {
            Object.assign(draft, blogCagory)
          })
        )
        try {
          await queryFulfilled
        } catch {
          dispatch(
            blogCategory.util.updateQueryData(
              'getBlogCategory',
              id,
              (draft) => {
                Object.assign(draft, { id })
              }
            )
          )
        }
      },
      invalidatesTags: [TagTypes.blogCategory],
    }),
    // updateBlogCategory: build.mutation({
    //   query: ({ id, ...blogCategoryData }) => ({
    //     url: `${BLOG_CATEGORY}/${id}`,
    //     method: 'PATCH',
    //     body: blogCategoryData,
    //   }),
    //   onQueryStarted: async (
    //     { blogCategoryData, id },
    //     { dispatch, queryFulfilled }
    //   ) => {
    //     dispatch(
    //       blogCategory.util.updateQueryData('getBlogCategory', id, (draft) => {
    //         Object.assign(draft, blogCategoryData)
    //       })
    //     )
    //     try {
    //       await queryFulfilled
    //     } catch {
    //       dispatch(
    //         blogCategory.util.updateQueryData(
    //           'getBlogCategory',
    //           id,
    //           (draft) => {
    //             Object.assign(draft, { id })
    //           }
    //         )
    //       )
    //     }
    //   },
    //   invalidatesTags: [TagTypes.blogCategory],
    // }),
    deleteBlogCategory: build.mutation({
      query: (blogCategoryId) => ({
        url: `${BLOG_CATEGORY}/${blogCategoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TagTypes.blogCategory],
    }),
  }),
})

export const {
  useCreateBlogCategoryMutation,
  useGetBlogCategoriesQuery,
  useGetBlogCategoryQuery,
  useUpdateBlogCategoryMutation,
  useDeleteBlogCategoryMutation,
} = blogCategory
