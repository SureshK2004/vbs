// app/venues/[id]/page.tsx
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import VenueGallery from '@/components/venue/VenueGallery';
import VenueInfo from '@/components/venue/VenueInfo';
import HallSelector from '@/components/venue/HallSelector';
import AvailabilityCalendar from '@/components/booking/AvailabilityCalendar';
import BookingModal from '@/components/booking/BookingModal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { apiClient } from '@/lib/api';
import { Venue, Hall, AvailabilityRequest } from '@/types';

export default function VenueDetailPage() {
  const params = useParams();
  const venueId = params.id as string;
  
  const [selectedHall, setSelectedHall] = useState<Hall | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const { data: venue, isLoading, error } = useQuery<Venue>({
    queryKey: ['venue', venueId],
    queryFn: () => apiClient.getVenue(venueId),
  });

  const handleCheckAvailability = async (request: AvailabilityRequest) => {
    // This would be implemented in the AvailabilityCalendar component
    console.log('Availability check requested:', request);
  };

  const handleProceedToBooking = () => {
    if (selectedHall && selectedDate && selectedTimeSlot) {
      setIsBookingModalOpen(true);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message="Failed to load venue details. Please try again later." />;
  }

  if (!venue) {
    return <ErrorMessage message="Venue not found." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">{venue.name}</h1>
          <p className="text-gray-600 mt-2">{venue.address}, {venue.city}, {venue.state} {venue.zipCode}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Venue Info & Gallery */}
          <div className="lg:col-span-2">
            <VenueGallery images={venue.images} />
            <VenueInfo venue={venue} />
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow sticky top-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Book This Venue</h2>
                <p className="text-gray-600 mt-1">Starting at ${venue.pricePerHour}/hour</p>
              </div>
              
              <div className="p-6">
                <HallSelector 
                  venueId={venueId} 
                  selectedHall={selectedHall}
                  onSelectHall={setSelectedHall}
                />
                
                <AvailabilityCalendar 
                  venueId={venueId}
                  hallId={selectedHall?.id}
                  selectedDate={selectedDate}
                  selectedTimeSlot={selectedTimeSlot}
                  onSelectDate={setSelectedDate}
                  onSelectTimeSlot={setSelectedTimeSlot}
                  onCheckAvailability={handleCheckAvailability}
                />
                
                <button
                  onClick={handleProceedToBooking}
                  disabled={!selectedHall || !selectedDate || !selectedTimeSlot}
                  className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        venue={venue}
        hall={selectedHall}
        date={selectedDate}
        timeSlot={selectedTimeSlot}
      />
    </div>
  );
}