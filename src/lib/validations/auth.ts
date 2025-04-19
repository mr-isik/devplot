import * as z from "zod";

export const getSignInSchema = () =>
  z.object({
    email: z.string().email({
      message: "Email is required",
    }),
    password: z.string().min(6, {
      message: "Password is required",
    }),
    rememberMe: z.boolean().default(false),
  });

export const getSignUpSchema = () =>
  z
    .object({
      email: z.string().email({
        message: "Email is required",
      }),
      password: z.string().min(6, {
        message: "Password is required",
      }),
      confirmPassword: z.string().min(6, {
        message: "Password is required",
      }),
      terms: z.boolean().refine((val) => val === true, {
        message: "Terms and conditions are required",
      }),
    })
    .refine((data: any) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

export const getResetPasswordSchema = () =>
  z.object({
    email: z.string().email({
      message: "Email is required",
    }),
  });

export const getUpdatePasswordSchema = () =>
  z.object({
    password: z.string().min(6, {
      message: "Password is required",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password is required",
    }),
  });

export type SignInFormValues = z.infer<ReturnType<typeof getSignInSchema>>;
export type SignUpFormValues = z.infer<ReturnType<typeof getSignUpSchema>>;
export type ResetPasswordFormValues = z.infer<
  ReturnType<typeof getResetPasswordSchema>
>;
export type UpdatePasswordFormValues = z.infer<
  ReturnType<typeof getUpdatePasswordSchema>
>;
