import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const LoginValidation = z.object({
  username: z.string().min(3).max(255),
  password: z.string().min(3).max(255),
})

export type LoginFormType = z.infer<typeof LoginValidation>
export const loginResolver = zodResolver(LoginValidation)
