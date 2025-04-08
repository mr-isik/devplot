'use server';

import type { Content } from '@/features/portfolios/types';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export const createContent = async (content: Partial<Content>, portfolioId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('contents').insert({
    ...content,
    portfolio_id: portfolioId,
  }).select();

  revalidatePath('/');
  return { data, error };
};

export const getContent = async (portfolioId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('contents').select('*').eq('portfolio_id', portfolioId);

  return { data, error };
};

export const updateContent = async (content: Partial<Content>, portfolioId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('contents').update(content).eq('portfolio_id', portfolioId).select();

  revalidatePath('/');
  return { data, error };
};
