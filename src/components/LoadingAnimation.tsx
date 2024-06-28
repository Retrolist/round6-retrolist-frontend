import Lottie from "lottie-react";
import Loading from "../utils/Retrolist-lottie.json";

export const LoadingAnimation = () => {
  return (
    <div className="text-center">
      <div className="w-[150px] mx-auto">
        <Lottie animationData={Loading} loop={true} />
      </div>
      <div className="text-center text-[#272930DE] text-lg font-medium wave-text mt-4">
        <span>W</span>
        <span>a</span>
        <span>i</span>
        <span>t</span>
        <span className="px-1"></span>
        <span>a</span>
        <span className="px-1"> </span>
        <span>m</span>
        <span>o</span>
        <span>m</span>
        <span>e</span>
        <span>n</span>
        <span>t</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
      <div className="mt-1 text-[#4C4E64AD] text-sm">
        Retrolist is assembling everything!
      </div>
    </div>
  );
};
