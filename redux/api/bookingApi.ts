import { TagTypes } from "@/redux/tag-types";
import { baseApi } from "./baseApi";
import { IBlog, IMeta } from "@/types";

const BOOKING_URL = "/booking";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBooking: build.mutation({
      query: (bookingData) => ({
        url: `${BOOKING_URL}`,
        method: "POST",
        data: bookingData,
      }),
      invalidatesTags: [TagTypes.booking],
    }),
    getBookings: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${BOOKING_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IBlog[], meta: IMeta) => {
        return {
          bookings: response,
          meta,
        };
      },
      providesTags: [TagTypes.booking],
    }),
    getBooking: build.query({
      query: (bookingId) => ({
        url: `${BOOKING_URL}/${bookingId}`,
        method: "GET",
      }),
      providesTags: [TagTypes.booking],
    }),
    updateBooking: build.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [TagTypes.booking],
    }),
    deleteBooking: build.mutation({
      query: (bookingId) => ({
        url: `${BOOKING_URL}/${bookingId}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.booking],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingsQuery,
  useGetBookingQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;
