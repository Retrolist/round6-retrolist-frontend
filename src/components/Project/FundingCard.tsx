import { Icon } from "@iconify/react/dist/iconify.js";

export const ProjectFundingCard = () => {
  return (
    <div className="border bg-white border-[#EAECF0] rounded-lg p-4 my-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#FF042033] rounded-full">
            <Icon icon="lucide:hexagon" color="red" width={16} height={16} />
          </div>
          <div className="text-base text-[#101828]">Governance fund</div>
        </div>
        <div className="flex gap-2">
          <div>10,000</div>
          <img width={24} height={24} src="/img/op-icon.png" alt="" />
        </div>
      </div>
      <hr className="border-dashed my-2" />
      <div className="text-xs text-[#858796]">
        <div>Description:</div>
        <div>-</div>
      </div>
    </div>
  );
};
