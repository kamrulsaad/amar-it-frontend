import { TagTypes } from '@/redux/tag-types'
import { baseApi } from '../baseApi'

const HM_BANNER = '/home-banner'

export const homeBannerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getHomeBanners: build.query({
      query: () => ({
        url: `${HM_BANNER}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: string }) => ({
                type: TagTypes.homeBanner,
                id,
              })),
              { type: TagTypes.homeBanner, id: 'LIST' },
            ]
          : [{ type: TagTypes.homeBanner, id: 'LIST' }],
    }),
    getHomeBanner: build.query({
      query: (id: string) => ({
        url: `${HM_BANNER}/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: TagTypes.homeBanner, id }],
    }),
    createHomeBanner: build.mutation({
      query: (data) => ({
        url: `${HM_BANNER}`,
        method: 'POST',
        body: data,
        contentType: 'multipart/form-data',
      }),
      invalidatesTags: [{ type: TagTypes.homeBanner, id: 'LIST' }],
    }),
    updateHomeBanner: build.mutation({
      query: ({ id, ...data }) => ({
        url: `${HM_BANNER}/${id}`,
        method: 'PATCH',
        body: data,
        contentType: 'multipart/form-data',
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: TagTypes.homeBanner, id },
        { type: TagTypes.homeBanner, id: 'LIST' },
      ],
    }),
    deleteHomeBanner: build.mutation({
      query: (id: string) => ({
        url: `${HM_BANNER}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: TagTypes.homeBanner, id },
      ],
    }),
  }),
})

export const {
  useGetHomeBannersQuery,
  useGetHomeBannerQuery,
  useCreateHomeBannerMutation,
  useUpdateHomeBannerMutation,
  useDeleteHomeBannerMutation,
} = homeBannerApi
