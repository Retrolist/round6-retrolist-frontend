import { Icon } from "@iconify/react/dist/iconify.js";
import { ProjectFundingSource } from "../../types/Project";

function fundingSourceIcon(currency: string) {
  if (currency == 'OP') {
    return "/img/op-icon.png"
  } else {
    return "/img/usdc.png"
  }
}

export const ProjectFundingCard = ({ fundingSource: fundingSourceRaw }: { fundingSource: ProjectFundingSource }) => {
  // Hot fix for Retro 5 grant null case
  const fundingSource = {...fundingSourceRaw}

  if (fundingSource.type === null && !isNaN(fundingSource.amount as any)) {
    fundingSource.type = 'Retro Funding'
    fundingSource.currency = 'OP'
  }

  return (
    <div className="border bg-white border-[#EAECF0] rounded-lg p-4 my-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#FF042033] rounded-full">
            <Icon icon="lucide:hexagon" color="red" width={16} height={16} />
          </div>
          <div className="text-base text-[#101828]">{ fundingSource.type || 'UNSPECIFIED' }</div>
        </div>
        <div className="flex gap-2">
          <div>{ isNaN(fundingSource.amount as any) ? fundingSource.amount : parseFloat(fundingSource.amount).toLocaleString("en-US") }</div>
          <img width={24} height={24} src={fundingSourceIcon(fundingSource.currency)} alt="" className="shrink-0" />
        </div>
      </div>
      <hr className="border-dashed my-2" />
      <div className="text-xs text-[#858796]">
        <div>{ fundingSource.description }</div>
      </div>
    </div>
  );
};
