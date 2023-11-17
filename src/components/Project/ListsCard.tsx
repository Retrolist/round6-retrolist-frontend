import { ListDto } from "../../types/List";
import ListStatusBadge from "./ListStatusBadge";

export const ProjectListCard = ({ list }: { list: ListDto}) => {
  const totalOp = list.listContent.reduce((acc, x) => acc + x.OPAmount, 0);

  console.log(list)

  return (
    <div className="border bg-white border-[#EAECF0] rounded-lg p-4 mb-2 hover:cursor-pointer hover:border-gray-400">
      <div className="flex justify-between items-start">
        <div className="flex -space-x-2 overflow-hidden">
          {list.projectsMetadata.slice(0, 4).map(project => (
            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
              src={project.profileImageUrl || "/img/project-placeholder.svg"}
              alt=""
            />
          ))}
        </div>

        <ListStatusBadge status={list.status}></ListStatusBadge>

        {/* <div className="rounded-full border border-[#B2DDFF] text-[#175CD3] bg-[#EFF8FF] px-3 py-1">
          {list.status}
        </div> */}
      </div>
      <div className="flex justify-between text-[#272930DE] mt-4">
        <div className="text-sm">{list.listName}</div>
        <div className="text-base font-medium">{totalOp} OP</div>
      </div>
      <p className="text-[10px] text-[#4C4E64AD]">
        {list.listDescription}
      </p>
    </div>
  );
};
