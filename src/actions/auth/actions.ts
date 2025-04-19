"use server";

import type { AuthResponse } from "@/lib/types/auth";
import type {
  SignInFormValues,
  SignUpFormValues,
} from "@/lib/validations/auth";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createUser } from "../users/actions";

export const signin = async (
  formData: SignInFormValues
): Promise<AuthResponse> => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      return { data: null, error };
    }

    revalidatePath("/", "layout");
    return {
      data: {
        message: "Successfully signed in",
        user: data.user,
      },
      error: null,
    };
  } catch (error: any) {
    return { data: null, error: { message: error.message } };
  }
};

export const signInWithGithub = async (): Promise<AuthResponse> => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: { message: error.message } };
  }
};

export const signup = async (
  formData: SignUpFormValues
): Promise<AuthResponse> => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_DOMAIN}/auth/confirm`,
      },
    });

    if (error) {
      return { data: null, error };
    }

    const userResult = await createUser(data.user!.id);

    if (userResult.error) {
      return { data: null, error: userResult.error };
    }

    revalidatePath("/");

    return {
      data: {
        message:
          "Successfully signed up! Please check your email to verify your account.",
        user: data.user,
      },
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: {
        message: error.message || "An unexpected error occurred during signup",
      },
    };
  }
};

export const signout = async (): Promise<AuthResponse> => {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();

    return redirect("/");
  } catch (error: any) {
    return { data: null, error: { message: error.message } };
  }
};

export const verifyEmail = async (
  token_hash: string,
  type: EmailOtpType
): Promise<AuthResponse> => {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type,
    });

    if (error) {
      return { data: null, error };
    }

    return { data: null, error: null };
  } catch (error: any) {
    return { data: null, error: { message: error.message } };
  }
};

export const resendEmail = async (email: string): Promise<AuthResponse> => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.resend({
      type: "signup",
      email,
    });

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: { message: error.message } };
  }
};

export const resetPassword = async (email: string): Promise<AuthResponse> => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_DOMAIN}/change-password`,
    });

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: { message: error.message } };
  }
};

export const updatePassword = async (
  password: string
): Promise<AuthResponse> => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: { message: error.message } };
  }
};
