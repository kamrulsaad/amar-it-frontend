import { IAdmin, IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { TagTypes } from "../tag-types";

const HOME_BANNER = "/home-banner";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createHomeBanner: build.mutation({
      query: (data) => ({
        url: HOME_BANNER,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [TagTypes.bannerContent],
    }),

    admins: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: HOME_BANNER,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IAdmin[], meta: IMeta) => {
        return {
          admins: response,
          meta,
        };
      },
      providesTags: [TagTypes.admin],
    }),
    admin: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${HOME_BANNER}/${id}`,
        method: "GET",
      }),
      providesTags: [TagTypes.admin],
    }),
    updateAdmin: build.mutation({
      query: (data) => ({
        url: `${HOME_BANNER}/${data.id}`,
        method: "PATCH",
        data: data.body,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [TagTypes.admin],
      /**
       * query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [TagTypes.admin],
       */
    }),
    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `${HOME_BANNER}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.admin],
    }),
  }),
});

export const {
  useAdminsQuery,
  useAdminQuery,
  useCreateHomeBannerMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = adminApi;
