interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}

export function StarRating({ rating, size = 14, showValue = true, className = '' }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: fullStars }).map((_, i) => (
          <svg key={`full-${i}`} width={size} height={size} viewBox="0 0 14 14" fill="none">
            <path d="M7 1L8.854 5.146L13.5 5.657L10.25 8.784L11.09 13.5L7 11.25L2.91 13.5L3.75 8.784L0.5 5.657L5.146 5.146L7 1Z" fill="#C66C3C"/>
          </svg>
        ))}
        {hasHalf && (
          <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
            <defs>
              <linearGradient id="half-grad">
                <stop offset="50%" stopColor="#C66C3C"/>
                <stop offset="50%" stopColor="#CDBE8B"/>
              </linearGradient>
            </defs>
            <path d="M7 1L8.854 5.146L13.5 5.657L10.25 8.784L11.09 13.5L7 11.25L2.91 13.5L3.75 8.784L0.5 5.657L5.146 5.146L7 1Z" fill="url(#half-grad)"/>
          </svg>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <svg key={`empty-${i}`} width={size} height={size} viewBox="0 0 14 14" fill="none">
            <path d="M7 1L8.854 5.146L13.5 5.657L10.25 8.784L11.09 13.5L7 11.25L2.91 13.5L3.75 8.784L0.5 5.657L5.146 5.146L7 1Z" fill="#CDBE8B"/>
          </svg>
        ))}
      </div>
      {showValue && (
        <span className="text-[#524F45] text-xs font-medium">{rating.toFixed(1)}/5</span>
      )}
    </div>
  );
}
