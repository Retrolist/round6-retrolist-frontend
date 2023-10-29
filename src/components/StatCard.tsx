import { Icon } from "@iconify/react/dist/iconify.js";

interface StatCardProps {
  icon: string;
  title: string;
  description: string;
}
export const StatCard = ({ description, icon, title }: StatCardProps) => {
  return (
    <div className="p-4 border border-gray-200 bg-white rounded-xl">
      <div className="flex gap-3">
        <div className="border border-gray-200 bg-white shadow-sm p-3 rounded-xl">
          <Icon icon={icon} color="red" width={24} height={24} />
        </div>
        <div>
          <div style={{ color: "#4C4E64AD" }} className="text-sm font-medium">
            {title}
          </div>
          <div className="text-2xl">{description}</div>
        </div>
      </div>
    </div>
  );
};
