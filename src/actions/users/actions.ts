"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createTenant } from "../tenants/actions";

export const createUser = async (authId: string, email: string) => {
  try {
    const supabase = await createClient();

    const { data: user, error } = await supabase
      .from("users")
      .upsert({
        auth_id: authId,
        email: email,
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

    /* Create tenant if not exists */
    const { error: tenantError } = await createTenant(user[0].id);

    if (tenantError) {
      console.error("Tenant creation error:", tenantError);
      return { error: { message: "Failed to create tenant" } };
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

export async function deleteUserAccount() {
  "use server";

  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("User not found during account deletion");
      return redirect("/");
    }

    // Delete user data from the users table
    const { error: deleteUserError } = await supabase
      .from("users")
      .delete()
      .eq("auth_id", user.id);

    if (deleteUserError) {
      console.error("Error deleting user data:", deleteUserError);
      throw new Error("Failed to delete user data");
    }

    // Sign out the user
    await supabase.auth.signOut();

    await supabase.auth.admin.deleteUser(user.id);

    // Revalidate paths
    revalidatePath("/");

    // Redirect to home
    redirect("/");
  } catch (error) {
    console.error("Error deleting user account:", error);
    // Still redirect to home in case of error, after attempting logout
    redirect("/");
  }
}
