'use server';

import type { Portfolio } from '@/features/portfolios/types';
import { createClient } from '@/utils/supabase/server';

export const createPortfolio = async (portfolio: Portfolio) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('portfolios').insert(portfolio);

  if (error) {
    throw error;
  }

  return data;
};

export const getPortfolio = async (userId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('portfolios').select('*').eq('user_id', userId);

  if (error) {
    throw error;
  }

  return data;
};

export const updatePortfolio = async (portfolio: Portfolio) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('portfolios').update(portfolio).eq('id', portfolio.id);

  if (error) {
    throw error;
  }

  return data;
};

export const deletePortfolio = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('portfolios').delete().eq('id', id);

  if (error) {
    throw error;
  }

  return data;
};
