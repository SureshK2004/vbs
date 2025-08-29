// components/venue/VenueInfo.tsx
import { Venue } from '@/types';

interface VenueInfoProps {
  venue: Venue;
}

export default function VenueInfo({ venue }: VenueInfoProps) {
  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Venue</h2>
      <p className="text-gray-700">{venue.description}</p>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {venue.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-700">{amenity}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Venue Details</h3>
          <div className="space-y-2">
            <p className="text-gray-700"><strong>Capacity:</strong> {venue.capacity} people</p>
            <p className="text-gray-700"><strong>Minimum Booking:</strong> {venue.minBookingHours} hours</p>
            <p className="text-gray-700"><strong>Starting at:</strong> ${venue.pricePerHour}/hour</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
          <div className="space-y-2">
            <p className="text-gray-700"><strong>Address:</strong> {venue.address}, {venue.city}, {venue.state} {venue.zipCode}</p>
            <p className="text-gray-700"><strong>Phone:</strong> {venue.phone}</p>
            <p className="text-gray-700"><strong>Email:</strong> {venue.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}