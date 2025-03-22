import type { Project } from '@/features/projects/types';
import { createClient } from '@/utils/supabase/server';

export const createProject = async (project: Project, portfolioId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('projects').insert({
    ...project,
    portfolio_id: portfolioId,
  });

  if (error) {
    throw error;
  }

  return data;
};

export const getProjects = async (portfolioId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('projects').select('*').eq('portfolio_id', portfolioId);

  if (error) {
    throw error;
  }

  return data;
};

export const updateProject = async (project: Project) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('projects').update(project).eq('id', project.id);

  if (error) {
    throw error;
  }

  return data;
};

export const deleteProject = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('projects').delete().eq('id', id);

  if (error) {
    throw error;
  }

  return data;
};
