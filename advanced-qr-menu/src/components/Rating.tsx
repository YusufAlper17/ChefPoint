import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value?: number;
  rating?: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  onChange?: (rating: number) => void;
  readonly?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  rating: ratingProp,
  maxRating = 5,
  size = 'md',
  showValue = false,
  onChange,
  readonly = false,
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);
  
  // Support both 'value' and 'rating' props for backwards compatibility
  const rating = value !== undefined ? value : ratingProp || 0;

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleClick = (clickValue: number) => {
    if (!readonly && onChange) {
      onChange(clickValue);
    }
  };

  const handleMouseEnter = (enterValue: number) => {
    if (!readonly && onChange) {
      setHoverRating(enterValue);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly && onChange) {
      setHoverRating(0);
    }
  };

  const getStarFill = (starIndex: number) => {
    const currentRating = hoverRating || rating;
    const starPosition = starIndex;
    
    // Full star
    if (starPosition <= Math.floor(currentRating)) {
      return 'fill-yellow-400 text-yellow-400';
    }
    // Partial star
    if (starPosition === Math.ceil(currentRating) && currentRating % 1 !== 0) {
      return 'fill-yellow-400 text-yellow-400 opacity-60';
    }
    // Empty star
    return 'fill-gray-200 text-gray-200';
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1;
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
              disabled={readonly}
              className={`
                ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}
                transition-transform
                ${!readonly && 'focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 rounded'}
              `}
              aria-label={`Rate ${starValue} out of ${maxRating}`}
            >
              <Star className={`${sizeClasses[size]} ${getStarFill(starValue)} transition-colors`} />
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-gray-700 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

