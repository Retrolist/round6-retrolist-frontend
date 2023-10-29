import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { UserImageAddress } from "../common/UserImageAddress";
import { categoryLabel } from "../../utils/project";
import { ProjectMetadata } from "../../types/Project";
import { addrParse } from "../../utils/common";

export const ProjectCard = ({ project }: { project: ProjectMetadata }) => {
  return (
    <Link to={"/project/" + project.id}>
      <div className="relative rounded-2xl bg-white border border-[#EAECF0] p-4 w-full transition hover:cursor-pointer hover:border-gray-400 h-full">
        <div
          style={{
            marginTop: -16,
            marginLeft: -16,
            marginRight: -16,
            marginBottom: 16,
            backgroundColor: "rgb(220, 220, 220)",
            backgroundSize: "cover",
            backgroundImage: `url(${project.bannerImageUrl})`,
            paddingTop: "37.5%"
          }}
          className="rounded-t-2xl"
        >
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center mb-2">
            <img
              className="rounded-full w-[34px] h-[34px]"
              src={project.profileImageUrl || "/img/project-placeholder.svg"}
            />
            <div className="text-lg">{project.displayName}</div>
          </div>
          {/* <div className="flex items-center gap-2 text-[#4C4E64AD]">
            <div>12</div>
            <Icon icon="lucide:heart" />
          </div> */}
        </div>

        <div className="text-[#4C4E64AD] line-clamp-2 text-sm mb-3">
          {project.bio}
        </div>
        <div className="my-3">
          <UserImageAddress
            img="/img/test-avatar.png"
            address={addrParse(project.address)}
          />
        </div>
        <div className="flex flex-wrap">
          {project.impactCategory.map((category) => (
            <div className="rounded bg-gray-200 text-gray-600 px-2 py-1 text-xs mr-2 mb-2">
              {categoryLabel(category)}
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};
