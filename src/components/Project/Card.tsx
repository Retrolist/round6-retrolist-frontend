import { LOREM } from "../../utils/lorem";

export const ProjectCard = () => {
  return (
    <div className="rounded-2xl bg-white border border-[#EAECF0] p-4 w-full transition hover:cursor-pointer hover:border-gray-400">
      <div className="flex gap-2 items-center mb-2">
        <img
          className="rounded-full w-[34px] h-[34px]"
          src="/img/project-test-logo.png"
        />
        <div className="text-lg">chomtana.eth</div>
      </div>

      <div className="text-[#4C4E64AD] line-clamp-2 text-sm mb-3">{LOREM}</div>
      <div className="my-3 flex gap-1 items-center">
        <img className="rounded-full w-4 h-4" src="/img/test-avatar.png" />
        <div className="text-[10px] text-[#4C4E64AD]">0x2FAe...e474 </div>
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
  );
};
