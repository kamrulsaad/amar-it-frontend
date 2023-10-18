import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const createFaqZodSchema = z.object({
  question: z.string({
    required_error: 'Question is required',
  }),
  answer: z.string({
    required_error: 'Answer is required',
  }),
})

const updateFaqZodSchema = z.object({
  question: z
    .string({
      required_error: 'Question is required',
    })
    .optional(),
  answer: z
    .string({
      required_error: 'Answer is required',
    })
    .optional(),
})

export type CreateFaqFormType = z.infer<typeof createFaqZodSchema>
export const createFaqResolver = zodResolver(createFaqZodSchema)

export type UpdateFaqFormType = z.infer<typeof updateFaqZodSchema>
export const updateFaqResolver = zodResolver(updateFaqZodSchema)