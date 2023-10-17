import { TagTypes } from '../tag-types'
import { baseApi } from './baseApi'

const AUTH_URL = '/auth'

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/login`,
        method: 'POST',
        data: loginData,
      }),
      invalidatesTags: [TagTypes.user],
    }),
    customerSignUp: build.mutation({
      query: (signUpData) => ({
        url: `${AUTH_URL}/signup`,
        method: 'POST',
        data: signUpData,
        contentType: 'multipart/form-data',
      }),
      invalidatesTags: [TagTypes.user],
    }),
  }),
})

export const { useUserLoginMutation, useCustomerSignUpMutation } = authApi
