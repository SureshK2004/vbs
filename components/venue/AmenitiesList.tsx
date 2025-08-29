interface AmenitiesListProps {
  amenities: string[];
}

export default function AmenitiesList({ amenities }: AmenitiesListProps) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-700">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}