// hooks/useVenue.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { Venue } from '@/types';

export function useVenue(id: string) {
  return useQuery<Venue>({
    queryKey: ['venue', id],
    queryFn: () => apiClient.getVenue(id),
    enabled: !!id,
  });
}