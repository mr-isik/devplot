'use server';

import type { Portfolio } from '@/features/portfolios/types';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export const createPortfolio = async (portfolio: Partial<Portfolio>) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('portfolios').insert(portfolio).select();

  revalidatePath('/');
  return { data, error };
};

export const getPortfolio = async (userId: string): Promise<{ data: Portfolio[] | null; error: any }> => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('portfolios').select('*').eq('user_id', userId);

  return { data, error };
};

export const getPortfolioByUserId = async (userId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('portfolios').select('id').eq('user_id', userId);

  if (error) {
    return { data: null, error };
  }

  return { data, error: null };
};

export const getFullPortfolio = async (username: string) => {
  const supabase = await createClient();

  /* fetch user id from username */
  const { data: user, error: userError } = await supabase.from('users').select('id').eq('username', username);

  if (userError) {
    return { data: null, error: userError };
  }

  if (!user || user.length === 0) {
    return { data: null, error: 'User not found' };
  }

  /* Fetch portfolio from user id */
  const { data: portfolio, error: portfolioError } = await supabase.from('portfolios').select('*, contents(*), experiences(*), educations(*), projects(*), skills(*), socials(*), options(*)').eq('user_id', user[0]!.id);

  if (portfolioError) {
    return { data: null, error: portfolioError };
  }

  return { data: portfolio, error: null };
};

export const updatePortfolio = async (portfolio: Partial<Portfolio>) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('portfolios').update(portfolio).eq('id', portfolio.id);

  revalidatePath('/');
  return { data, error };
};

export const deletePortfolio = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('portfolios').delete().eq('id', id);

  revalidatePath('/');
  return { data, error };
};
