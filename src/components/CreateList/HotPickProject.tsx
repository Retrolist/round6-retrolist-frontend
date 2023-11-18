import { Radio } from "antd";

interface HotPickProjectProps {
  name: string
  icon: string
  description: string
  onClick: () => any
}

export const HotPickProject = ({ name, icon, description, onClick }: HotPickProjectProps) => {
  return (
    <div className="w-full p-4 border border-[#EAECF0] rounded-lg hover:cursor-pointer hover:bg-gray-100 transition" onClick={onClick}>
      <div className="flex w-full">
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-2 items-center">
            <img
              className="h-8 w-8 rounded-full ring-2 ring-white"
              src={icon}
              alt=""
            />
            <div>{name}</div>
          </div>
          {/* <div>
            <Radio />
          </div> */}
        </div>
      </div>
      <div className="mt-3 text-[10px] text-[#4C4E64AD]">
        {description}
      </div>
    </div>
  );
};
