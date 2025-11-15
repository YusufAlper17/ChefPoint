import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackImages?: string[];
  placeholder?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackImages = [],
  placeholder
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (fallbackImages.length > 0 && currentIndex < fallbackImages.length) {
      // Try next fallback image
      setCurrentSrc(fallbackImages[currentIndex]);
      setCurrentIndex(currentIndex + 1);
    } else {
      // All fallbacks failed, show placeholder
      setHasError(true);
    }
  };

  const defaultPlaceholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zNTAgMjUwSDQ1MFYzNTBIMzUwVjI1MFoiIGZpbGw9IiNEMUQ1REIiLz4KPHBhdGggZD0iTTM3NSAyNzVIMzUwVjI1MEgzNzVWMjc1WiIgZmlsbD0iI0QxRDVEQiIvPgo8cGF0aCBkPSJNNDI1IDI3NUg0NTBWMjUwSDQyNVYyNzVaIiBmaWxsPSIjRDFENURCIi8+CjxwYXRoIGQ9Ik0zNzUgMzI1SDM1MFYzNTBIMzc1VjMyNVoiIGZpbGw9IiNEMUQ1REIiLz4KPHBhdGggZD0iTTQyNSAzMjVINDUwVjM1MEg0MjVWMzI1WiIgZmlsbD0iI0QxRDVEQiIvPgo8dGV4dCB4PSI0MDAiIHk9IjQwMCIgZmlsbD0iIzlDQTNBRiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0Ij5SZXNpbSB5dWtsZW5lbWVkaTwvdGV4dD4KPC9zdmc+';

  if (hasError) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`}>
        <img
          src={placeholder || defaultPlaceholder}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};


