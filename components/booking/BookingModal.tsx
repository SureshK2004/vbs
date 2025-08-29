// components/booking/BookingModal.tsx
'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Venue, Hall, BookingRequest } from '@/types';
import { apiClient } from '@/lib/api';
import Button from '@/components/ui/Button';
import ErrorMessage from '@/components/ui/ErrorMessage';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  venue: Venue;
  hall: Hall | null;
  date: Date | null;
  timeSlot: string | null;
}

export default function BookingModal({ isOpen, onClose, venue, hall, date, timeSlot }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    eventType: '',
    attendees: 1,
    specialRequests: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'attendees' ? parseInt(value) || 1 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hall || !date || !timeSlot) return;
    
    setIsSubmitting(true);
    setBookingError(null);
    
    try {
      // Parse time slot
      const [startTime, endTime] = timeSlot.split(' - ');
      
      const bookingRequest: BookingRequest = {
        venueId: venue.id,
        hallId: hall.id,
        date: date.toISOString().split('T')[0],
        startTime,
        endTime,
        ...formData,
      };
      
      // In a real app:
      // const response = await apiClient.createBooking(bookingRequest);
      // console.log('Booking created:', response);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setBookingSuccess(true);
      setStep(3);
    } catch (error) {
      setBookingError('Failed to create booking. Please try again.');
      console.error('Booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset state when modal closes
    setTimeout(() => {
      setStep(1);
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        eventType: '',
        attendees: 1,
        specialRequests: '',
      });
      setBookingSuccess(false);
      setBookingError(null);
    }, 300);
  };

  const totalHours = timeSlot ? (parseInt(timeSlot.split(' - ')[1].split(':')[0]) - parseInt(timeSlot.split(' - ')[0].split(':')[0])) : 0;
  const totalAmount = hall ? hall.pricePerHour * totalHours : 0;

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <Dialog.Title className="text-2xl font-bold text-gray-900">
              {step === 3 ? 'Booking Confirmed' : `Book ${venue.name}`}
            </Dialog.Title>
          </div>
          
          <div className="p-6">
            {step === 1 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Summary</h3>
                
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Venue</p>
                      <p className="font-medium">{venue.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Hall</p>
                      <p className="font-medium">{hall?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-medium">{date?.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Time</p>
                      <p className="font-medium">{timeSlot}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-medium">{totalHours} hours</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="font-medium">${totalAmount}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    onClick={() => setStep(2)}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <form onSubmit={handleSubmit}>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Your Information</h3>
                
                {bookingError && (
                  <ErrorMessage message={bookingError} className="mb-4" />
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="customerName"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="customerEmail"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="customerPhone"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">
                      Event Type *
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select event type</option>
                      <option value="wedding">Wedding</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="birthday">Birthday Party</option>
                      <option value="conference">Conference</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="attendees" className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Attendees *
                    </label>
                    <input
                      type="number"
                      id="attendees"
                      name="attendees"
                      min="1"
                      max={hall?.capacity || 1000}
                      value={formData.attendees}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requests
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    rows={3}
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="flex justify-between">
                  <Button
                    type="button"
                    onClick={() => setStep(1)}
                    variant="outline"
                  >
                    Back
                  </Button>
                  
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Complete Booking
                  </Button>
                </div>
              </form>
            )}
            
            {step === 3 && (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h3 className="mt-4 text-lg font-medium text-gray-900">Booking Confirmed!</h3>
                
                <p className="mt-2 text-sm text-gray-600">
                  Thank you for your booking. A confirmation email has been sent to {formData.customerEmail}.
                </p>
                
                <div className="mt-6 bg-gray-50 p-4 rounded-md">
                  <p className="text-sm font-medium text-gray-900">Booking Reference: <span className="font-normal">BK-{Date.now().toString().slice(-6)}</span></p>
                  <p className="text-sm font-medium text-gray-900 mt-1">Total Amount: <span className="font-normal">${totalAmount}</span></p>
                </div>
                
                <div className="mt-6">
                  <Button
                    onClick={handleClose}
                  >
                    Done
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}