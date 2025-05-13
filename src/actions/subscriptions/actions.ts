import { createClient } from "@/utils/supabase/server";
import { getUser } from "../users/actions";
import { getPlanByName } from "../plans/actions";
export const createSubscription = async (
  userId: number,
  customerId: string,
  planId: number
) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("subscriptions").insert({
    customer_id: customerId,
    user_id: userId,
    plan_id: planId,
    status: "active",
  });

  return { data, error };
};

export const updateSubscription = async (subscriptionId: string, data: any) => {
  const supabase = await createClient();

  const { data: responseData, error } = await supabase
    .from("subscriptions")
    .update(data)
    .eq("id", subscriptionId);

  return { responseData, error };
};
