import { createClient } from "@/utils/supabase/server";

export const getPlans = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("plans").select("*");

  return { data, error };
};
