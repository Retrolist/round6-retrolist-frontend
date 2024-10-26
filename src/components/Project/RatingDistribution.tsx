import { useState } from "react";

interface RatingDistributionProps {
  star: number[];
}

const RatingDistribution = ({ star }: RatingDistributionProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const totalReviews = star.length;
  const average =
    Math.ceil((star.reduce((pre, cur) => pre + cur, 0) / star.length) * 10) /
    10;

  const calculatePercentage = (ratingValue: number) => {
    const count = star.filter(
      (rating) => Math.floor(rating) === ratingValue
    ).length;

    return ((count / totalReviews) * 100).toFixed(2);
  };

  const segments = [
    { color: "bg-[#1D4ED8]", ratingValue: 5 },
    { color: "bg-[#82954B]", ratingValue: 4 },
    { color: "bg-[#EE9902]", ratingValue: 3 },
    { color: "bg-[#CC4C10]", ratingValue: 2 },
    { color: "bg-[#990000]", ratingValue: 1 },
  ]
    .map((segment) => ({
      ...segment,
      percentage: calculatePercentage(segment.ratingValue),
      label: `${segment.ratingValue} star${
        segment.ratingValue > 1 ? "s" : ""
      } - ${calculatePercentage(segment.ratingValue)}%`,
    }))
    .filter((segment) => parseFloat(segment.percentage) > 0); // Filter out segments with 0% percentage

  return (
    <div className="relative z-0 p-4 border-2 border-[#EAECF0] rounded-xl bg-white overflow-visible">
      <h2 className="text-md font-semibold text-[#181D27]">
        Rating Recommendation
      </h2>
      <div className="flex items-center space-x-2 mt-2">
        <span className="text-4xl">⭐</span>
        <div className="text-4xl font-semibold text-[#181D27]">
          {isNaN(average) || average === null ? 0 : average}
        </div>
        <div className="text-[#535862] text-md font-normal self-end">
          {totalReviews} reviews
        </div>
      </div>

      {/* Progress Distribution Bar */}
      <div className="relative flex mt-4 h-3 rounded-full">
        {segments.map((segment, index) => (
          <div
            key={index}
            className={`relative ${segment.color} h-full ${
              index === 0 && "rounded-l-full"
            } ${index === segments.length - 1 && "rounded-r-full"}`}
            style={{ width: `${segment.percentage}%` }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Tooltip with Arrow */}
            {hoveredIndex === index && (
              <div className="absolute z-50 -top-9 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded-md shadow-lg whitespace-nowrap pointer-events-none">
                {segment.label}
                <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-800 rotate-180"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingDistribution;
