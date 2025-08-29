// hooks/useBooking.ts
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { BookingRequest, BookingResponse } from '@/types';

export function useCreateBooking() {
  return useMutation<BookingResponse, Error, BookingRequest>({
    mutationFn: (bookingData) => apiClient.createBooking(bookingData),
  });
}