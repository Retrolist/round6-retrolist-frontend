import { Radio } from "antd";

export const HotPickProject = () => {
  return (
    <div className="w-full p-4 border border-[#EAECF0] rounded-lg">
      <div className="flex w-full">
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-2 items-center">
            <img
              className="h-8 w-8 rounded-full ring-2 ring-white"
              src="/img/platform/1.png"
              alt=""
            />
            <div>RetroList</div>
          </div>
          <div>
            <Radio />
          </div>
        </div>
      </div>
      <div className="mt-3 text-[10px] text-[#4C4E64AD]">
        RetroPGF Rubric-based List Creation UI opening to public crowdsourcing
      </div>
    </div>
  );
};
