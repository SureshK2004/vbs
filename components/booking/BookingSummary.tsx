import { Venue, Hall } from '@/types';

interface BookingSummaryProps {
  venue: Venue;
  hall: Hall | null;
  date: Date | null;
  timeSlot: string | null;
}

export default function BookingSummary({ venue, hall, date, timeSlot }: BookingSummaryProps) {
  const totalHours = timeSlot ? (parseInt(timeSlot.split(' - ')[1].split(':')[0]) - parseInt(timeSlot.split(' - ')[0].split(':')[0])) : 0;
  const totalAmount = hall ? hall.pricePerHour * totalHours : 0;

  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Summary</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Venue</p>
          <p className="font-medium">{venue.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Hall</p>
          <p className="font-medium">{hall?.name || 'Not selected'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Date</p>
          <p className="font-medium">{date?.toLocaleDateString() || 'Not selected'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Time</p>
          <p className="font-medium">{timeSlot || 'Not selected'}</p>
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
  );
}