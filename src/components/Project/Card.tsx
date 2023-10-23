import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { UserImageAddress } from "../common/UserImageAddress";

export const ProjectCard = () => {
  return (
    <Link to="/project/retrolist">
      <div className="relative rounded-2xl bg-white border border-[#EAECF0] p-4 w-full transition hover:cursor-pointer hover:border-gray-400">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center mb-2">
            <img
              className="rounded-full w-[34px] h-[34px]"
              src="/img/project-test-avatar.png"
            />
            <div className="text-lg">Retrolist | RetroPGF Rubric-based</div>
          </div>
          <div className="flex items-center gap-2 text-[#4C4E64AD]">
            <div>12</div>
            <Icon icon="lucide:heart" />
          </div>
        </div>

        <div className="text-[#4C4E64AD] line-clamp-2 text-sm mb-3">
          RetroPGF Rubric-based List Creation UI opening to public crowdsourcing
        </div>
        <div className="my-3">
          <UserImageAddress
            img="/img/test-avatar.png"
            address=" 0x2FAe...e474"
          />
        </div>
        <div className="flex flex-wrap">
          <div className="rounded bg-gray-200 text-gray-600 px-2 py-1 text-xs mr-2 mb-2">
            Collective Governance
          </div>

          <div className="rounded bg-gray-200 text-gray-600 px-2 py-1 text-xs mr-2 mb-2">
            OP Stack
          </div>
        </div>
      </div>
    </Link>
  );
};
