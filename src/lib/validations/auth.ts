import * as z from 'zod';

export const getSignInSchema = (t: any) => z.object({
  email: z.string().email({
    message: t('validation.email_required'),
  }),
  password: z.string().min(6, {
    message: t('validation.password_min'),
  }),
  rememberMe: z.boolean().default(false),
});

export const getSignUpSchema = (t: any) => z.object({
  email: z.string().email({
    message: t('validation.email_required'),
  }),
  password: z.string().min(6, {
    message: t('validation.password_min'),
  }),
  confirmPassword: z.string().min(6, {
    message: t('validation.password_min'),
  }),
  terms: z.boolean().refine(val => val === true, {
    message: t('validation.terms_required'),
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: t('validation.password_match'),
  path: ['confirmPassword'],
});

export type SignInFormValues = z.infer<ReturnType<typeof getSignInSchema>>;
export type SignUpFormValues = z.infer<ReturnType<typeof getSignUpSchema>>;
