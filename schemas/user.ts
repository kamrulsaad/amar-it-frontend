import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const LoginValidation = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(3)
    .max(255),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(3)
    .max(255),
});

const CustomerSignUpValidation = z.object({
  username: z.string({
    required_error: "Username is required",
  }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    }),
  confirmPassword: z
    .string({
      required_error: "Confirm Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    }),
});

const resetPassword = z.object({
  oldPassword: z.string({
    required_error: "Old Password is required",
  }),
  newPassword: z.string({
    required_error: "New Password is required",
  }),
});

export type LoginFormType = z.infer<typeof LoginValidation>;
export const loginResolver = zodResolver(LoginValidation);

export type CustomerSignUpFormType = z.infer<typeof CustomerSignUpValidation>;
export const customerSignUpResolver = zodResolver(CustomerSignUpValidation);

export type ResetPasswordFormType = z.infer<typeof resetPassword>;
export const resetPasswordResolver = zodResolver(resetPassword);
