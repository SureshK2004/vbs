// components/venue/HallSelector.tsx
'use client';

import { useState, useEffect } from 'react';
import { Hall } from '@/types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface HallSelectorProps {
  venueId: string;
  selectedHall: Hall | null;
  onSelectHall: (hall: Hall | null) => void;
}

// Mock data - in a real app, this would come from an API
const mockHalls: Hall[] = [
  {
    id: '1',
    venueId: '1',
    name: 'Grand Ballroom',
    description: 'Our largest event space with high ceilings and elegant chandeliers',
    capacity: 300,
    amenities: ['Stage', 'Sound System', 'Projector', 'Lighting'],
    pricePerHour: 250,
    minBookingHours: 4
  },
  {
    id: '2',
    venueId: '1',
    name: 'Conference Center',
    description: 'Perfect for business meetings and corporate events',
    capacity: 100,
    amenities: ['Projector', 'Whiteboards', 'WiFi', 'Catering Kitchen'],
    pricePerHour: 150,
    minBookingHours: 2
  },
  {
    id: '3',
    venueId: '1',
    name: 'Outdoor Garden',
    description: 'Beautiful outdoor space for weddings and celebrations',
    capacity: 200,
    amenities: ['Gazebo', 'String Lights', 'Sound System', 'Restrooms'],
    pricePerHour: 200,
    minBookingHours: 3
  }
];

export default function HallSelector({ venueId, selectedHall, onSelectHall }: HallSelectorProps) {
  const [halls, setHalls] = useState<Hall[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setHalls(mockHalls);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [venueId]);

  const handleSelectHall = (hall: Hall) => {
    onSelectHall(hall.id === selectedHall?.id ? null : hall);
  };

  if (isLoading) {
    return <LoadingSpinner size="sm" />;
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Select a Hall</h3>
      
      <div className="space-y-3">
        {halls.map((hall) => (
          <div
            key={hall.id}
            onClick={() => handleSelectHall(hall)}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedHall?.id === hall.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">{hall.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{hall.description}</p>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <span>Capacity: {hall.capacity} people</span>
                  <span className="mx-2">•</span>
                  <span>${hall.pricePerHour}/hour</span>
                </div>
              </div>
              <div
                className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedHall?.id === hall.id
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}
              >
                {selectedHall?.id === hall.id && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            
            {selectedHall?.id === hall.id && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Amenities:</h5>
                <div className="flex flex-wrap gap-2">
                  {hall.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}