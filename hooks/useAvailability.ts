import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { AvailabilityRequest, AvailabilityResponse } from '@/types';

export function useCheckAvailability() {
  return useMutation<AvailabilityResponse, Error, AvailabilityRequest>({
    mutationFn: (availabilityData) => apiClient.checkAvailability(availabilityData),
  });
}