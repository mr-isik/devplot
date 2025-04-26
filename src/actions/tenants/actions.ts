import { createClient } from "@/utils/supabase/server";

export const createTenant = async (user_id: number) => {
  const supabase = await createClient();

  const { data: tenant, error: tenantError } = await supabase
    .from("tenants")
    .upsert({
      user_id,
    });

  if (tenantError) {
    console.error("Tenant creation error:", tenantError);
    return { error: { message: "Failed to create tenant" } };
  }

  return { data: tenant, error: null };
};

export const getTenant = async (user_id: number) => {
  const supabase = await createClient();

  const { data: tenant, error: tenantError } = await supabase
    .from("tenants")
    .select("*")
    .eq("user_id", user_id);

  if (tenantError) {
    console.error("Tenant retrieval error:", tenantError);
    return { error: { message: "Failed to retrieve tenant" } };
  }

  return { data: tenant, error: null };
};

export const updateTenant = async (
  tenant_id: number,
  data: { custom_domain: string | null; subdomain: string | null }
) => {
  const supabase = await createClient();

  const { data: tenant, error: tenantError } = await supabase
    .from("tenants")
    .update({
      custom_domain: data.custom_domain,
      subdomain: data.subdomain,
    })
    .eq("id", tenant_id)
    .select();

  if (tenantError) {
    console.error("Tenant update error:", tenantError);
    return { error: { message: "Failed to update tenant" } };
  }

  return { data: tenant, error: null };
};

export const deleteTenant = async (tenant_id: number) => {
  const supabase = await createClient();

  const { error: tenantError } = await supabase
    .from("tenants")
    .delete()
    .eq("id", tenant_id);

  if (tenantError) {
    console.error("Tenant deletion error:", tenantError);
    return { error: { message: "Failed to delete tenant" } };
  }

  return { data: null, error: null };
};
