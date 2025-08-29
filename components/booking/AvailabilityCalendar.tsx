// components/booking/AvailabilityCalendar.tsx
'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { TimeSlot, AvailabilityRequest } from '@/types';
import Button from '@/components/ui/Button';

interface AvailabilityCalendarProps {
  venueId: string;
  hallId?: string;
  selectedDate: Date | null;
  selectedTimeSlot: string | null;
  onSelectDate: (date: Date | null) => void;
  onSelectTimeSlot: (timeSlot: string | null) => void;
  onCheckAvailability: (request: AvailabilityRequest) => void;
}

// Mock time slots - in a real app, this would come from an API
const mockTimeSlots: TimeSlot[] = [
  { start: '09:00', end: '10:00' },
  { start: '10:00', end: '11:00' },
  { start: '11:00', end: '12:00' },
  { start: '12:00', end: '13:00' },
  { start: '13:00', end: '14:00' },
  { start: '14:00', end: '15:00' },
  { start: '15:00', end: '16:00' },
  { start: '16:00', end: '17:00' },
  { start: '17:00', end: '18:00' },
  { start: '18:00', end: '19:00' },
  { start: '19:00', end: '20:00' },
  { start: '20:00', end: '21:00' },
];

export default function AvailabilityCalendar({
  venueId,
  hallId,
  selectedDate,
  selectedTimeSlot,
  onSelectDate,
  onSelectTimeSlot,
  onCheckAvailability,
}: AvailabilityCalendarProps) {
  const [hours, setHours] = useState(2);
  const [isChecking, setIsChecking] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);

  const handleDateChange = (date: Date | null) => {
    onSelectDate(date);
    onSelectTimeSlot(null);
    setAvailableSlots([]);
  };

  const handleCheckAvailability = async () => {
    if (!selectedDate || !hallId) return;
    
    setIsChecking(true);
    
    // Simulate API call
    setTimeout(() => {
      setAvailableSlots(mockTimeSlots.filter((_, i) => i % 2 === 0)); // Mock available slots
      setIsChecking(false);
    }, 1000);
    
    // In a real app:
    // try {
    //   const response = await onCheckAvailability({
    //     venueId,
    //     hallId,
    //     date: selectedDate.toISOString().split('T')[0],
    //     hours,
    //   });
    //   setAvailableSlots(response.availableSlots);
    // } catch (error) {
    //   console.error('Failed to check availability:', error);
    // } finally {
    //   setIsChecking(false);
    // }
  };

  const formatTimeSlot = (slot: TimeSlot) => {
    return `${slot.start} - ${slot.end}`;
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-3">Check Availability</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholderText="Select a date"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours)</label>
        <select
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((hour) => (
            <option key={hour} value={hour}>
              {hour} {hour === 1 ? 'hour' : 'hours'}
            </option>
          ))}
        </select>
      </div>
      
      <Button
        onClick={handleCheckAvailability}
        disabled={!selectedDate || !hallId}
        isLoading={isChecking}
        className="w-full"
      >
        Check Availability
      </Button>
      
      {availableSlots.length > 0 && (
        <div className="mt-6">
          <h4 className="text-md font-medium text-gray-900 mb-3">Available Time Slots</h4>
          <div className="grid grid-cols-2 gap-2">
            {availableSlots.map((slot, index) => (
              <button
                key={index}
                onClick={() => onSelectTimeSlot(formatTimeSlot(slot))}
                className={`p-2 text-sm border rounded-md text-center ${
                  selectedTimeSlot === formatTimeSlot(slot)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {formatTimeSlot(slot)}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {selectedTimeSlot && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-700 text-sm">
            Selected: <strong>{selectedTimeSlot}</strong>
          </p>
        </div>
      )}
    </div>
  );
}