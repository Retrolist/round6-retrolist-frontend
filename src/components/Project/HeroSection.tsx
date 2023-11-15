import { Icon } from "@iconify/react/dist/iconify.js";
import { Project } from "../../types/Project";
import { addrParse } from "../../utils/common";
import { UserImageAddress } from "../common/UserImageAddress";
import ProjectEligibilityBadge from "./ProjectEligibilityBadge";

export const ProjectHeroSection = ({ project }: { project: Project }) => {
  return (
    <div className="mt-8">
      <div
        style={{
          marginTop: -16,
          marginLeft: -16,
          marginRight: -16,
          marginBottom: 16,
          background: project?.profile.bannerImageUrl ? `url(${project?.profile.bannerImageUrl})` : `linear-gradient(198deg, rgba(250,155,110,1) 6%, rgba(248,156,115,1) 10%, rgba(216,211,249,1) 70%, rgba(166,203,246,1) 94%)`,
          backgroundSize: "cover",
          paddingTop: "37.5%",
        }}
        className="rounded-2xl relative"
      >
        <div className="absolute top-3 left-3">
          <ProjectEligibilityBadge status={project.prelimResult} size={"sm"} />
        </div>
      </div>

      <div className="flex md:px-8 relative -top-12">
        <div className="flex flex-wrap md:flex-nowrap w-full items-end gap-8">
          <div>
            <img
              src={
                project?.profile.profileImageUrl ||
                "/img/project-placeholder.svg"
              }
              alt="project logo"
              className="w-[154px] rounded-full h-[154px] object-cover border-2 border-[#E2E8F0]"
            />
          </div>
          <div className="flex w-10/12 flex-col gap-2">
            <div className="flex justify-between">
              <div className="flex gap-5">
                <div className="text-[28px] flex items-end">
                  {project?.displayName}
                </div>
                {/* <div className="flex gap-2 items-center">
                  <div>1,211</div>
                  <Icon icon="mdi:heart" width={24} height={24} color="red" />
                </div> */}
              </div>
              {/* <div className="flex gap-3 hidden md:block">
                <button className="w-10 h-10 border-[#D0D5DD] border shadow rounded-lg p-2.5 hidden">
                  <Icon icon="mdi:dots-horizontal" />
                </button>
                <button
                  className="flex gap-1 h-10 items-center  border-[#D0D5DD] border shadow rounded-lg p-2.5 bg-[#FF0420]"
                  onClick={() => {
                    if (project.prelimResult.toLowerCase() == 'keep') {
                      alert('Rubric-based list creation system will be live in a few days!')
                    } else {
                      window.open(
                        "https://app.deform.cc/form/78499a28-ecff-4928-a814-cd3364741051"
                      );
                    }
                  }}
                >
                  {project.prelimResult.toLowerCase() == "keep" && (
                    <Icon icon="lucide:plus" color="white" />
                  )}
                  <div className="text-white">
                    {project.prelimResult.toLowerCase() == "keep"
                      ? "Add to List"
                      : "Appeal"}
                  </div>
                </button>
              </div> */}
            </div>
            <div className="flex gap-2 items-center">
              <div className="bg-[#E2E8F0] rounded py-0.5 px-2">
                {project?.applicantType == "PROJECT" ? "Project" : "Individual"}
              </div>
              <div className="border-l-[0.5px] border border-[#CBD5E0] h-6" />
              <UserImageAddress
                img="/img/test-avatar.png"
                address={
                  project?.applicant.address.resolvedName?.name ||
                  addrParse(project?.applicant.address.address)
                }
              />
            </div>
            {project?.websiteUrl && (
              <a href={project?.websiteUrl} target="_blank">
                <div className="flex gap-2 items-center text-[#4C4E64AD]">
                  <div className="text-xs">{project?.websiteUrl}</div>
                  <Icon icon="lucide:external-link" width={14} height={14} />
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
