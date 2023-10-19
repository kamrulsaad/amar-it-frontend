import { ICustomer, IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { TagTypes } from "../tag-types";

const CUSTOMER_URL = "/customers";

export const customerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addCustomerWithFormData: build.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [TagTypes.customer],
    }),

    customers: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: CUSTOMER_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ICustomer[], meta: IMeta) => {
        return {
          customers: response,
          meta,
        };
      },
      providesTags: [TagTypes.customer],
    }),
    customer: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${CUSTOMER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [TagTypes.customer],
    }),
    updateCustomer: build.mutation({
      query: (data) => ({
        url: `${CUSTOMER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [TagTypes.customer],
    }),
    deleteCustomer: build.mutation({
      query: (id) => ({
        url: `${CUSTOMER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.customer],
    }),
  }),
});

export const {
  useCustomersQuery,
  useCustomerQuery,
  useAddCustomerWithFormDataMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi;
