// lib/api.ts
import { Venue, Hall, AvailabilityRequest, AvailabilityResponse, BookingRequest, BookingResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

class ApiClient {
  async getVenue(id: string): Promise<Venue> {
    const response = await fetch(`${API_BASE_URL}/venues/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch venue: ${response.statusText}`);
    }
    return response.json();
  }

  async checkAvailability(request: AvailabilityRequest): Promise<AvailabilityResponse> {
    const response = await fetch(`${API_BASE_URL}/venues/${request.venueId}/check-availability`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to check availability: ${response.statusText}`);
    }
    return response.json();
  }

  async createBooking(request: BookingRequest): Promise<BookingResponse> {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to create booking: ${response.statusText}`);
    }
    return response.json();
  }
}

export const apiClient = new ApiClient();