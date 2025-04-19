"use server";

import { createClient } from "@/utils/supabase/server";

export const createUser = async (authId: string) => {
  try {
    const supabase = await createClient();

    const { data: user, error } = await supabase
      .from("users")
      .upsert({
        auth_id: authId,
        onboarded: false,
      })
      .select();

    if (error) {
      if (
        error.message.includes("duplicate key value violates unique constraint")
      ) {
        console.error("User creation error (duplicate):", error);
        return {
          error: {
            message: "This email is already associated with an account",
          },
        };
      }

      console.error("User creation error:", error);
      return { error: { message: "Failed to create user profile" } };
    }

    return { data: user, error: null };
  } catch (err) {
    console.error("Unexpected error during user creation:", err);
    return { error: { message: "An unexpected error occurred" } };
  }
};

export const getUser = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userData, error } = await supabase
    .from("users")
    .select("*")
    .eq("auth_id", user?.id);

  return { userData, error };
};
