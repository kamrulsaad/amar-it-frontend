import { TagTypes } from '@/redux/tag-types'
import { baseApi } from '../baseApi'

const FAQ_URL = '/faq'

export const faqApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    creatFaq: build.mutation({
      query: (faqData) => ({
        url: `${FAQ_URL}`,
        method: 'POST',
        data: faqData,
      }),
      invalidatesTags: [TagTypes.faq],
    }),
    getFaqs: build.query({
      query: () => ({
        url: `${FAQ_URL}`,
        method: 'GET',
      }),
      providesTags: [TagTypes.faq],
    }),
    getFaq: build.query({
      query: (faqId) => ({
        url: `${FAQ_URL}/${faqId}`,
        method: 'GET',
      }),
      providesTags: [TagTypes.faq],
    }),
    updateFaq: build.mutation({
      query: ({ id, ...faqData }) => ({
        url: `${FAQ_URL}/${id}`,
        method: 'PATCH',
        data: faqData,
      }),
      onQueryStarted: async ({ faqData, id }, { dispatch, queryFulfilled }) => {
        dispatch(
          faqApi.util.updateQueryData('getFaq', id, (draft) => {
            Object.assign(draft, faqData)
          })
        )
        try {
          await queryFulfilled
        } catch {
          dispatch(
            faqApi.util.updateQueryData('getFaq', id, (draft) => {
              Object.assign(draft, { id })
            })
          )
        }
      },
      invalidatesTags: [TagTypes.faq],
    }),
    deleteFaq: build.mutation({
      query: (faqId) => ({
        url: `${FAQ_URL}/${faqId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TagTypes.faq],
    }),
  }),
})

export const {
  useCreatFaqMutation,
  useGetFaqsQuery,
  useGetFaqQuery,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApi
