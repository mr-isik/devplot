"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

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
  tenantId: number,
  body: {
    custom_domain: string | null;
    subdomain: string | null;
  }
) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tenants")
    .update({
      domain: body.custom_domain,
      subdomain: body.subdomain,
    })
    .eq("id", tenantId)
    .select();

  revalidatePath("/");

  return { data, error };
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

export async function checkDomain(host: string) {
  const supabase = await createClient();

  const { data: foundTenantWithDomain } = await supabase
    .from("tenants")
    .select("id")
    .eq("domain", host)
    .single();

  const { data: foundTenantWithSubDomain } = await supabase
    .from("tenants")
    .select("id")
    .eq("subdomain", host)
    .single();

  if (foundTenantWithDomain) {
    return { error: null, data: foundTenantWithDomain };
  }

  if (foundTenantWithSubDomain) {
    return { error: null, data: foundTenantWithSubDomain };
  }

  return { error: "Domain not found", data: null };
}
