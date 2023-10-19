import { TagTypes } from '@/redux/tag-types'
import { baseApi } from './baseApi'
import { IBlog, IMeta } from '@/types'

const BLOG_URL = '/blogs'

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBlog: build.mutation({
      query: (blogData) => ({
        url: `${BLOG_URL}`,
        method: 'POST',
        data: blogData,
        contentType: 'multipart/form-data',
      }),
      invalidatesTags: [TagTypes.blog],
    }),
    getBlogs: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${BLOG_URL}`,
        method: 'GET',
        params: arg,
      }),
      transformResponse: (response: IBlog[], meta: IMeta) => {
        return {
          blogs: response,
          meta,
        }
      },
      providesTags: [TagTypes.blog],
    }),
    getBlog: build.query({
      query: (blogId) => ({
        url: `${BLOG_URL}/${blogId}`,
        method: 'GET',
      }),
      providesTags: [TagTypes.blog],
    }),
   
    updateBlog: build.mutation({
      query: (data) => ({
        url: `${BLOG_URL}/${data.id}`,
        method: 'PATCH',
        data: data.body,
        contentType: 'multipart/form-data',
      }),
      invalidatesTags: [TagTypes.blog],
    }),
    deleteBlog: build.mutation({
      query: (blogId) => ({
        url: `${BLOG_URL}/${blogId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TagTypes.blog],
    }),
  }),
})

export const {
  useCreateBlogMutation,
  useGetBlogsQuery,
  useGetBlogQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi
