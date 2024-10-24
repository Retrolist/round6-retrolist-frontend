import { MetricsGarden } from "../../types/MetricsGarden";
import AvatarList from "./AvatarList";

interface ReviewerProps {
  comments: MetricsGarden[];
}
const Reviewer = ({ comments }: ReviewerProps) => {
  const totalReview = comments.length;
  const images = comments.map((comment) => {
    return { img: comment.profile.pfpUrl, alt: comment.profile.displayName };
  });
  return (
    <div className="relative z-0 p-4 border-2 border-[#EAECF0] rounded-xl bg-white overflow-visible">
      <h2 className="text-md font-semibold text-[#181D27]">Reviewers</h2>
      <div className="flex items-center space-x-2 mt-2">
        <div className="text-4xl font-semibold text-[#181D27]">
          {totalReview}
        </div>
        <div>
          <AvatarList images={images} />
        </div>
      </div>
    </div>
  );
};

export default Reviewer;
