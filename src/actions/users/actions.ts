'use server';

import { createClient } from '@/utils/supabase/server';

export const createUser = async (authId: string) => {
  const supabase = await createClient();

  const { data: user, error } = await supabase
    .from('users')
    .upsert({
      auth_id: authId,
      onboarded: false,
    })
    .select();

  if (error) {
    throw error;
  }

  return user;
};

export const getUser = async (userId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('users').select('*').eq('id', userId);

  if (error) {
    throw error;
  }

  return data;
};
