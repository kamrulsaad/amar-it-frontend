import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const LoginValidation = z.object({
  username: z.string().min(3).max(255),
  password: z.string().min(3).max(255),
})


const CustomerSignUpValidation = z.object(
  {
    user: z.object(
      {
        username: z.string({
          required_error: 'Username is required',
        }),
        password: z.string({
          required_error: 'Password is required',
        }),
      },
      {
        required_error: 'User info is required',
      }
    ),
    customer: z.object(
      {
        firstName: z.string({
          required_error: 'First name is required',
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
        email: z
          .string({
            required_error: 'Email is required',
          })
          .email(),
        contactNo: z.string({
          required_error: 'Contact number is required',
        }),
        address: z.string({
          required_error: 'Address is required',
        }),
      },
      {
        required_error: 'Customer info is required',
      }
    ),
  },
  {
    required_error: 'Informations are required',
  }
)


const resetPassword = z.object({
    oldPassword: z.string({
      required_error: 'Old Password is required',
    }),
    newPassword: z.string({
      required_error: 'New Password is required',
    }),
})


export type LoginFormType = z.infer<typeof LoginValidation>
export const loginResolver = zodResolver(LoginValidation)


export type CustomerSignUpFormType = z.infer<typeof CustomerSignUpValidation>
export const customerSignUpResolver = zodResolver(CustomerSignUpValidation)

export type ResetPasswordFormType = z.infer<typeof resetPassword>
export const resetPasswordResolver = zodResolver(resetPassword)

