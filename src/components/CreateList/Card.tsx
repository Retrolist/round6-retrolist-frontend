import { Icon } from "@iconify/react/dist/iconify.js";

interface CreateListStepCardProps {
  icon:
    | "lucide:user-2"
    | "lucide:flag"
    | "tabler:users-plus"
    | "lucide:sparkles";
  title: string;
  description: string;
  selected?: boolean;
}
export const CreateListStepCard = ({
  title,
  description,
  icon,
  selected = false,
}: CreateListStepCardProps) => {
  return (
    <div className="flex gap-4">
      <div className="p-3 rounded-[10px] border border-[#EAECF0] bg-white shadow-sm">
        <Icon
          icon={icon}
          width={24}
          color={selected ? "black" : "rgb(156 163 175)"}
        />
      </div>
      <div>
        <div
          className={`text-[16px] ${selected ? "text-black" : "text-gray-400"}`}
        >
          {title}
        </div>
        <div
          className={`${selected ? "text-[#475467]" : "text-gray-400"} text-xs`}
        >
          {description}
        </div>
      </div>
    </div>
  );
};
