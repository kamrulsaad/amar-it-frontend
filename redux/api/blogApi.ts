import { TagTypes } from '@/redux/tag-types'
import { baseApi } from './baseApi'

const BLOG_URL = '/blogs'

export const blogApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createBlog: build.mutation({
        query: (blogData) => ({
            url: `${BLOG_URL}`,
            method: 'POST',
            data: blogData,
        }),
        invalidatesTags: [TagTypes.blog],
        }),
        getBlogs: build.query({
        query: () => ({
            url: `${BLOG_URL}`,
            method: 'GET',
        }),
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
        query: ({ id, ...blog }) => ({
            url: `${BLOG_URL}/${id}`,
            method: 'PATCH',
            data: blog,
        }),
        onQueryStarted: async ({ blog, id }, { dispatch, queryFulfilled }) => {
            dispatch(
            blogApi.util.updateQueryData('getBlog', id, (draft) => {
                Object.assign(draft, blog)
            })
            )
            try {
            await queryFulfilled
            } catch {
            dispatch(
                blogApi.util.updateQueryData('getBlog', id, (draft) => {
                Object.assign(draft, { id })
                })
            )
            }
        },
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

