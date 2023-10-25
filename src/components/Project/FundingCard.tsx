import { Icon } from "@iconify/react/dist/iconify.js";
import { ProjectFundingSource } from "../../types/Project";

export const ProjectFundingCard = ({ fundingSource }: { fundingSource: ProjectFundingSource }) => {
  return (
    <div className="border bg-white border-[#EAECF0] rounded-lg p-4 my-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#FF042033] rounded-full">
            <Icon icon="lucide:hexagon" color="red" width={16} height={16} />
          </div>
          <div className="text-base text-[#101828]">{ fundingSource.type }</div>
        </div>
        <div className="flex gap-2">
          <div>{ fundingSource.amount.toLocaleString("en-US") }</div>
          <img width={24} height={24} src="/img/op-icon.png" alt="" />
        </div>
      </div>
      <hr className="border-dashed my-2" />
      <div className="text-xs text-[#858796]">
        <div>{ fundingSource.description }</div>
      </div>
    </div>
  );
};
