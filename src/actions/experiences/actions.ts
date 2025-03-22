import type { Experience } from '@/features/experiences/types';
import { createClient } from '@/utils/supabase/server';

export const getExperiences = async (portfolioId: string): Promise<Experience[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('experiences').select('*').eq('portfolio_id', portfolioId);

  if (error) {
    throw error;
  }

  return data;
};

export const createExperience = async (experience: Experience) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('experiences').insert(experience);

  if (error) {
    throw error;
  }

  return data;
};

export const updateExperience = async (experience: Experience) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('experiences').update(experience).eq('id', experience.id);

  if (error) {
    throw error;
  }

  return data;
};

export const deleteExperience = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('experiences').delete().eq('id', id);

  if (error) {
    throw error;
  }

  return data;
};
