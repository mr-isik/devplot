"use server";

import { createClient } from "@/utils/supabase/server";

export const createUser = async (authId: string) => {
  const supabase = await createClient();

  const { data: user, error } = await supabase
    .from("users")
    .upsert({
      auth_id: authId,
      onboarded: false,
    })
    .select();

  if (error) {
    throw error;
  }

  return user;
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
