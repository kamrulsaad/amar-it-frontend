import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
const createHomeBannerZodSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  content: z.string({
    required_error: 'Content is required',
  }),
})

const updateHomeBannerZodSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
    })
    .optional(),
  content: z
    .string({
      required_error: 'Content is required',
    })
    .optional(),
})

export type CreateHomeBannerFormType = z.infer<typeof createHomeBannerZodSchema>
export const createHomeBannerResolver = zodResolver(createHomeBannerZodSchema)

export type UpdateHomeBannerFormType = z.infer<typeof updateHomeBannerZodSchema>
export const updateHomeBannerResolver = zodResolver(updateHomeBannerZodSchema)
