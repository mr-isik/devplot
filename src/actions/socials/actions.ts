'use server';

import type { Social } from '@/features/socials/types';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export const getSocials = async (portfolioId: string): Promise<{ data: Social[] | null; error: any }> => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('socials').select('*').eq('portfolio_id', portfolioId);

  return { data, error };
};

export const createSocial = async (social: Partial<Social>) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('socials').insert(social).select();

  revalidatePath('/');
  return { data, error };
};

export const updateSocial = async (social: Partial<Social>) => {
  if (!social.id) {
    return { data: null, error: new Error('Social ID is required for update') };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.from('socials').update(social).eq('id', social.id).select();

  revalidatePath('/');
  return { data, error };
};

export const deleteSocial = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('socials').delete().eq('id', id).select();

  revalidatePath('/');
  return { data, error };
};
