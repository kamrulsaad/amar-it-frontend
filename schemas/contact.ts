import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const createContactZodSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  email: z.string({
    required_error: 'Email is required',
  }),
  subject: z.string({
    required_error: 'Subject is required',
  }),
  message: z.string({
    required_error: 'Message is required',
  }),
  phone: z.string().optional(),
})

export type CreateContactFormType = z.infer<typeof createContactZodSchema>
export const createContactResolver = zodResolver(createContactZodSchema)
