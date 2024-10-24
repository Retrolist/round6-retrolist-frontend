import { Icon } from "@iconify/react/dist/iconify.js";
import { useRef } from "react";
import Slider, { Settings } from "react-slick"; // Import react-slick
import { MetricsGarden } from "../../types/MetricsGarden";

interface CommentProps {
  comments: MetricsGarden[];
}

// Slider settings
const settings: Settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  rows: 2,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const Comment = ({ comments }: CommentProps) => {
  const sliderRef = useRef<Slider>(null); // Reference to the Slider component
  const timestampDisplay = (timestamp: number) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return formattedDate;
  };

  return (
    <div>
      <div className="mb-3 text-[#858796] text-base font-medium">
        Comment ({comments.length})
      </div>
      <Slider ref={sliderRef} {...settings}>
        {comments.map((comment) => {
          const star = comment.impactAttestations.find(
            (x) => x.name === "Likely to Recommend"
          )?.value;

          const importance = comment.impactAttestations.find(
            (x) => x.name === "Feeling if didnt exist"
          )?.value;

          let importanceText = "";
          switch (importance) {
            case 1:
              importanceText = "Neutral";
              break;
            case 2:
              importanceText = "Somewhat Upset";
              break;
            case 3:
              importanceText = "Extremely Upset";
              break;
          }

          return (
            <div className="p-4" key={comment.comment}>
              <div className="flex">
                <div className="mr-3">
                  <img
                    src={comment.profile.pfpUrl}
                    className="h-8 w-8 rounded-full"
                    alt=""
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">
                      {comment.profile.displayName}
                    </div>
                    <div className="text-[#535862] text-xs">
                      {timestampDisplay(Number(comment.time) * 1000)}
                    </div>
                  </div>
                  <div className="flex text-[#181D27] font-medium">
                    {star && <div>{star / 2} ★</div>}
                  </div>
                  <div className="font-medium text-sm">
                    <span className="text-[#FA280A]">
                      Feeling if didn’t exist:{" "}
                    </span>
                    {importanceText}
                  </div>
                </div>
              </div>
              <hr className="mt-2 border-dashed" />
              <div className="border bg-white border-[#EAECF0] rounded-lg p-4 mt-3 text-[#858796] text-sm h-full flex flex-col justify-between">
                <div>{comment.comment || "-- No comment --"}</div>
                <a
                  href={`https://optimism.easscan.org/attestation/view/${comment.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex justify-end mt-2 font-semibold text-sm text-[#535862] items-center">
                    <div>View on EAS</div>
                    <Icon icon="uim:arrow-up-right" className="w-5 h-5" />
                  </div>
                </a>
              </div>
            </div>
          );
        })}
      </Slider>
      <div className="flex justify-between mt-4 relative z-10">
        <button
          className="flex items-center text-gray-500 hover:text-black"
          onClick={() => sliderRef.current?.slickPrev()}
        >
          <Icon icon="mdi:chevron-left" className="w-5 h-5 mr-1" />
          Back
        </button>
        <button
          className="flex items-center text-gray-500 hover:text-black"
          onClick={() => sliderRef.current?.slickNext()}
        >
          Next
          <Icon icon="mdi:chevron-right" className="w-5 h-5 ml-1" />
        </button>
      </div>
    </div>
  );
};
