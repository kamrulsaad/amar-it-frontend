import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const createBlogCategoryZodSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
})

const updateBlogCategoryZodSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
    })
    .optional(),
})


export type CreateBlogCategoryFormType = z.infer<typeof createBlogCategoryZodSchema>
export const createBlogCategoryResolver = zodResolver(createBlogCategoryZodSchema)

export type UpdateBlogCategoryFormType = z.infer<typeof updateBlogCategoryZodSchema>
export const updateBlogCategoryResolver = zodResolver(updateBlogCategoryZodSchema)