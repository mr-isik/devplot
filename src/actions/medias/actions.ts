import type { Media } from '@/features/medias/types';
import { createClient } from '@/utils/supabase/server';

export const uploadMedia = async (media: Media) => {
  const supabase = await createClient();

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('medias')
    .upload(media.file_url, media.file_url);

  if (uploadError) {
    return { error: uploadError };
  } else if (uploadData) {
    const { data: mediaData, error: mediaError } = await supabase.from('medias').insert({
      portfolio_id: media.portfolio_id,
      file_url: uploadData.fullPath,
      type: media.type,
      reference_id: media.reference_id,
      reference_type: media.reference_type,
    });

    if (mediaError) {
      return { error: mediaError };
    }

    return mediaData;
  }

  return null;
};

export const deleteMedia = async (media: Media) => {
  const supabase = await createClient();

  const { data: mediaData, error: mediaError } = await supabase.from('medias').delete().eq('id', media.id);

  if (mediaError) {
    return { error: mediaError };
  }

  return mediaData;
};

export const upsertMedia = async (media: Media) => {
  const supabase = await createClient();

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('medias')
    .upload(media.file_url, media.file_url, {
      upsert: true,
    });

  if (uploadError) {
    return { error: uploadError };
  } else if (uploadData) {
    const { data: mediaData, error: mediaError } = await supabase.from('medias').upsert({
      portfolio_id: media.portfolio_id,
      file_url: uploadData.fullPath,
      type: media.type,
      reference_id: media.reference_id,
      reference_type: media.reference_type,
    });

    if (mediaError) {
      return { error: mediaError };
    }

    return mediaData;
  }

  return null;
};
