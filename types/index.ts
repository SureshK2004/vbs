// types/index.ts
export interface Venue {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  capacity: number;
  pricePerHour: number;
  minBookingHours: number;
  images: string[];
  amenities: string[];
}

export interface Hall {
  id: string;
  venueId: string;
  name: string;
  description: string;
  capacity: number;
  amenities: string[];
  pricePerHour: number;
  minBookingHours: number;
}

export interface AvailabilityRequest {
  venueId: string;
  hallId?: string;
  date: string;
  hours: number;
}

export interface AvailabilityResponse {
  available: boolean;
  availableSlots: TimeSlot[];
  suggestedTimes?: TimeSlot[];
}

export interface TimeSlot {
  start: string;
  end: string;
}

export interface BookingRequest {
  venueId: string;
  hallId: string;
  date: string;
  startTime: string;
  endTime: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventType: string;
  attendees: number;
  specialRequests?: string;
}

export interface BookingResponse {
  id: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookingCode: string;
  totalAmount: number;
}