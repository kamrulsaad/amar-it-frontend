import { TagTypes } from "@/redux/tag-types";
import { baseApi } from "./baseApi";

const SERVICES_URL = "/services";

export const faqApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createService: build.mutation({
      query: (faqData) => ({
        url: `${SERVICES_URL}`,
        method: "POST",
        data: faqData,
      }),
      invalidatesTags: [TagTypes.services],
    }),

    getServices: build.query({
      query: () => ({
        url: `${SERVICES_URL}`,
        method: "GET",
      }),
      providesTags: [TagTypes.services],
    }),

    getService: build.query({
      query: (faqId) => ({
        url: `${SERVICES_URL}/${faqId}`,
        method: "GET",
      }),
      providesTags: [TagTypes.services],
    }),

    updateService: build.mutation({
      query: ({ id, ...faqData }) => ({
        url: `${SERVICES_URL}/${id}`,
        method: "PATCH",
        data: faqData,
      }),
      onQueryStarted: async ({ faqData, id }, { dispatch, queryFulfilled }) => {
        dispatch(
          faqApi.util.updateQueryData("getService", id, (draft) => {
            Object.assign(draft, faqData);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          dispatch(
            faqApi.util.updateQueryData("getService", id, (draft) => {
              Object.assign(draft, { id });
            })
          );
        }
      },
      invalidatesTags: [TagTypes.services],
    }),

    deleteService: build.mutation({
      query: (faqId) => ({
        url: `${SERVICES_URL}/${faqId}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.services],
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useGetServiceQuery,
  useGetServicesQuery,
  useUpdateServiceMutation,
} = faqApi;
