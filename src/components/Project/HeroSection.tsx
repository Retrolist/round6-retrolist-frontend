import { Icon } from "@iconify/react/dist/iconify.js";
import { UserImageAddress } from "../common/UserImageAddress";

export const ProjectHeroSection = () => {
  return (
    <div className="mt-8">
      <img
        src="/img/project-hero-bg.png"
        alt=""
        className="w-full h-[240px] rounded-3xl object-cover"
      />
      <div className="flex px-8 relative -top-8">
        <div className="flex w-full items-end gap-8">
          <div>
            <img
              src="/img/project-test-avatar.png"
              alt="project logo"
              className="w-[154px] rounded-full h-[154px] object-cover border-2 border-[#E2E8F0]"
            />
          </div>
          <div className="flex w-10/12 flex-col gap-2">
            <div className="flex justify-between">
              <div className="flex gap-5">
                <div className="text-[28px]">
                  Retrolist | RetroPGF Rubric-based
                </div>
                <div className="flex gap-2 items-center">
                  <div>1,211</div>
                  <Icon icon="mdi:heart" width={24} height={24} color="red" />
                </div>
              </div>
              <div className="flex gap-3">
                <button className="w-10 h-10 border-[#D0D5DD] border shadow rounded-lg p-2.5">
                  <Icon icon="mdi:dots-horizontal" />
                </button>
                <button className="flex gap-1 h-10 items-center  border-[#D0D5DD] border shadow rounded-lg p-2.5 bg-[#FF0420]">
                  <Icon icon="lucide:plus" color="white" />
                  <div className="text-white">Add to List</div>
                </button>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="bg-[#E2E8F0] rounded py-0.5 px-2">Project</div>
              <div className="border-l-[0.5px] border border-[#CBD5E0] h-6" />
              <UserImageAddress
                img="/img/test-avatar.png"
                address=" 0x2FAe...e474"
              />
            </div>
            <div className="flex gap-2 items-center text-[#4C4E64AD]">
              <div className="text-xs">Website</div>
              <Icon icon="lucide:external-link" width={14} height={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
