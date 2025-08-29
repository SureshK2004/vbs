// components/venue/VenueGallery.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

interface VenueGalleryProps {
  images: string[];
}

export default function VenueGallery({ images }: VenueGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-200 aspect-video rounded-lg flex items-center justify-center">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="aspect-w-16 aspect-h-9 relative h-96">
        <Image
          src={images[selectedImage]}
          alt={`Venue image ${selectedImage + 1}`}
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {images.length > 1 && (
        <div className="p-4 flex space-x-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-20 h-20 relative rounded-md overflow-hidden ${
                selectedImage === index ? 'ring-2 ring-blue-500' : 'opacity-70'
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}