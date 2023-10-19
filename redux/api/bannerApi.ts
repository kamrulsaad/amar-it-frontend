
import { baseApi } from './baseApi'
import { TagTypes } from '../tag-types'

const HOME_BANNER = '/home-banner'

export const homeBannerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createHomeBanner: build.mutation({
      query: (data) => ({
        url: HOME_BANNER,
        method: 'POST',
        data,
        contentType: 'multipart/form-data',
      }),
      invalidatesTags: [TagTypes.bannerContent],
    }),
    getHomeBanners: build.query({
      query: () => ({
        url: HOME_BANNER,
        method: 'GET',
      }),
      providesTags: [TagTypes.bannerContent],
    }),
    getHomeBanner: build.query({
      query: (id) => ({
        url: `${HOME_BANNER}/${id}`,
        method: 'GET',
      }),
      providesTags: [TagTypes.bannerContent],
    }),
    updateHomeBanner: build.mutation({
      query: (data) => ({
        url: `${HOME_BANNER}/${data.id}`,
        method: 'PATCH',
        data: data.body,
        contentType: 'multipart/form-data',
      }),
      invalidatesTags: [TagTypes.bannerContent],
    }),
    deleteHomeBanner: build.mutation({
      query: (id) => ({
        url: `${HOME_BANNER}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TagTypes.bannerContent],
    }),
  }),
})

export const {
  useCreateHomeBannerMutation,
  useGetHomeBannersQuery,
  useGetHomeBannerQuery,
  useUpdateHomeBannerMutation,
  useDeleteHomeBannerMutation,
} = homeBannerApi
