'use server';

import type { Skill } from '@/features/skills/types';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export const createSkill = async (skill: Partial<Skill>) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('skills').insert(skill).select();

  revalidatePath('/');
  return { data, error };
};

export const getSkills = async (portfolioId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('skills').select('*').eq('portfolio_id', portfolioId);

  return { data, error };
};

export const deleteSkill = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('skills').delete().eq('id', id).select();

  revalidatePath('/');
  return { data, error };
};
