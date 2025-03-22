import type { Social } from '@/features/socials/types';
import { createClient } from '@/utils/supabase/server';

export const getSocials = async (portfolioId: string): Promise<Social[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('socials').select('*').eq('portfolio_id', portfolioId);

  if (error) {
    throw error;
  }

  return data;
};

export const createSocial = async (social: Social) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('socials').insert(social);

  if (error) {
    throw error;
  }

  return data;
};

export const updateSocial = async (social: Social) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('socials').update(social).eq('id', social.id);

  if (error) {
    throw error;
  }

  return data;
};

export const deleteSocial = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('socials').delete().eq('id', id);

  if (error) {
    throw error;
  }

  return data;
};
