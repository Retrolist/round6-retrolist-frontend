interface AvatarListProps {
  images: {
    img: string;
    alt: string;
  }[];
}

const AvatarList = ({ images }: AvatarListProps) => {
  const displayedImages = images ? images.slice(0, 10) : []; // จำกัดแค่ 10 ภาพ
  const remainingCount = images && images.length - displayedImages.length; // นับจำนวนภาพที่เหลือ

  return (
    <div className="flex items-center space-x-[-8px] overflow-x-auto scrollbar-hide">
      {displayedImages.slice(0, 10).map(({ alt, img }, index) => (
        <div
          key={index}
          className="w-6 h-6 rounded-full overflow-hidden border-2 border-white shadow-md"
        >
          <img src={img} alt={alt} className="w-full h-full object-cover" />
        </div>
      ))}
      {/* Indicator for more users */}
      {remainingCount > 0 && (
        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#F5F5F5] text-gray-600 text-xs font-semibold shadow-md border-2 border-white">
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export default AvatarList;
