import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

export const useNewsData = () => {
  return useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('published_date', { ascending: false });

      if (error) throw new Error(error.message);
      return data;
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000
  });
};