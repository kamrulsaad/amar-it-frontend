import { baseApi } from "./baseApi";

const PAYMENT_URL = "/payment";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    makePayment: build.mutation({
      query: (paymentData) => ({
        url: `${PAYMENT_URL}`,
        method: "POST",
        data: paymentData,
      }),
    }),
  }),
});

export const { useMakePaymentMutation } = paymentApi;
