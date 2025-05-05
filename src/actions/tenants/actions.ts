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

export const checkDomain = async (domain: string) => {
  const supabase = await createClient();

  const {
    data: foundTenantWithSubDomain,
    error: foundTenantWithSubdomainError,
  } = await supabase
    .from("tenants")
    .select("*")
    .eq("subdomain", domain)
    .single();

  const { data: foundTenantWithDomain, error: foundTenantWithDomainError } =
    await supabase.from("tenants").select("*").eq("domain", domain).single();

  if (foundTenantWithSubdomainError) {
    console.error("Tenant retrieval error:", foundTenantWithSubdomainError);
    return {
      data: null,
      error: { message: "Failed to retrieve tenant" },
    };
  }

  if (foundTenantWithDomainError) {
    console.error("Tenant retrieval error:", foundTenantWithDomainError);
    return {
      data: null,
      error: { message: "Failed to retrieve tenant" },
    };
  }

  if (foundTenantWithSubDomain) {
    return { data: foundTenantWithSubDomain, error: null };
  }

  if (foundTenantWithDomain) {
    return { data: foundTenantWithDomain, error: null };
  }

  return { data: null, error: null };
};
