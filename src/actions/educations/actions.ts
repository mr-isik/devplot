import type { Education } from '@/features/edications/types';
import { createClient } from '@/utils/supabase/server';

export const createEducation = async (education: Education, portfolioId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('educations').insert({
    ...education,
    portfolio_id: portfolioId,
  });

  if (error) {
    throw error;
  }

  return data;
};

export const getEducations = async (portfolioId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('educations').select('*').eq('portfolio_id', portfolioId);

  if (error) {
    throw error;
  }

  return data;
};

export const updateEducation = async (education: Education) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('educations').update(education).eq('id', education.id);

  if (error) {
    throw error;
  }

  return data;
};

export const deleteEducation = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('educations').delete().eq('id', id);

  if (error) {
    throw error;
  }

  return data;
};
