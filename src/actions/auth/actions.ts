'use server';

import type { SignInFormValues, SignUpFormValues } from '@/lib/validations/auth';
import type { EmailOtpType } from '@supabase/supabase-js';
import { AUTH_ERRORS, type AuthResponse } from '@/lib/types/auth';
import { Env } from '@/libs/Env';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function signin(formData: SignInFormValues): Promise<AuthResponse> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        return { data: null, error: AUTH_ERRORS.INVALID_CREDENTIALS };
      }
      if (error.message.includes('User not found')) {
        return { data: null, error: AUTH_ERRORS.USER_NOT_FOUND };
      }
      return { data: null, error: AUTH_ERRORS.SERVER_ERROR };
    }

    revalidatePath('/', 'layout');
    return {
      data: {
        message: 'Successfully signed in',
        user: data.user,
      },
      error: null,
    };
  } catch {
    return { data: null, error: AUTH_ERRORS.NETWORK_ERROR };
  }
}

export async function signup(formData: SignUpFormValues): Promise<AuthResponse> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${Env.NEXT_PUBLIC_APP_URL}/auth/confirm`,
      },
    });

    if (error) {
      if (error.message.includes('already registered')) {
        return { data: null, error: AUTH_ERRORS.EMAIL_IN_USE };
      }
      if (error.message.includes('weak password')) {
        return { data: null, error: AUTH_ERRORS.WEAK_PASSWORD };
      }
      return { data: null, error: AUTH_ERRORS.SERVER_ERROR };
    }

    revalidatePath('/');
    return {
      data: {
        message: 'Successfully signed up! Please check your email to verify your account.',
        user: data.user,
      },
      error: null,
    };
  } catch {
    return { data: null, error: AUTH_ERRORS.NETWORK_ERROR };
  }
}

export async function signout(): Promise<AuthResponse> {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();

    return redirect('/');
  } catch {
    return { data: null, error: AUTH_ERRORS.NETWORK_ERROR };
  }
}

export const verifyEmail = async (token_hash: string, type: EmailOtpType): Promise<AuthResponse> => {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type,
    });

    if (error) {
      return { data: null, error: { message: error.message } };
    }

    return { data: null, error: null };
  } catch {
    return { data: null, error: AUTH_ERRORS.NETWORK_ERROR };
  }
};

export const resendEmail = async (email: string): Promise<AuthResponse> => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });

    if (error) {
      return { data: null, error: { message: error.message } };
    }

    return { data, error: null };
  } catch {
    return { data: null, error: AUTH_ERRORS.NETWORK_ERROR };
  }
};
