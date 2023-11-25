import { baseApi } from './baseApi'

const CONTACT_URL = '/contact'

export const contactApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createContact: build.mutation({
      query: (contactData) => ({
        url: `${CONTACT_URL}`,
        method: 'POST',
        data: contactData,
      }),
    }),
  }),
})

export const { useCreateContactMutation } = contactApi
