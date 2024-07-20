import { Link } from "react-router-dom";
import { Crown } from "../../assets/Crown";
import { OpCoin } from "../../assets/OpCoin";
import { VoteSvg } from "../../assets/VoteSvg";
import { ProjectMetadata } from "../../types/Project";
import { OpenSourceBadge } from "./OpenSourceBadge";

export const ProjectList = ({ project }: { project: ProjectMetadata }) => {
  return (
    <Link to={"/project/" + project.id}>
      <div className="relative rounded-2xl bg-white border border-[#EAECF0] p-4 w-full transition hover:cursor-pointer hover:border-gray-400 h-full">
        {/* <div
          style={{
            marginTop: -16,
            marginLeft: -16,
            marginRight: -16,
            marginBottom: 16,
            background: project.bannerImageUrl ? `url(${project.bannerImageUrl})` : `linear-gradient(198deg, rgba(250,155,110,1) 6%, rgba(248,156,115,1) 10%, rgba(216,211,249,1) 70%, rgba(166,203,246,1) 94%)`,
            backgroundSize: "cover",
            paddingTop: "37.5%",
          }}
          className="rounded-t-2xl relative"
        >
          <div className="absolute top-2 left-2">
            <ProjectEligibilityBadge status={project.prelimResult} ballots={project.includedInBallots} />
          </div>
        </div> */}

        <div
          className="flex justify-between items-end gap-4"
          style={{ gridTemplateColumns: "300px 1fr" }}
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center mb-2">
                <div className="w-10 h-10 p-0.5 border border-[#E2E8F0] rounded-full">
                  <img
                    className="rounded-full"
                    src={
                      project.profileImageUrl || "/img/project-placeholder.svg"
                    }
                  />
                </div>
                <div className="">{project.displayName}</div>
              </div>
            </div>

            <div className="flex">
              <div className="rounded bg-gray-200 text-gray-600 px-2 py-1 text-xs mr-2">
                {project.recategorization}
              </div>

              <OpenSourceBadge isOss={project.isOss}></OpenSourceBadge>
            </div>
          </div>
          <div className="hidden gap-10 md:flex">
            {project.rank && project.rank < 10 && (
              <div className="flex items-center rounded-xl bg-white shadow p-3 gap-[10px]">
                <Crown />
                <div className="text-2xl font-medium linear-wipe">Top {project.rank}</div>
              </div>
            )}

            {project.rank && project.rank >= 10 && project.rank <= 99 && (
              <div className="flex items-center rounded-xl bg-white shadow p-3 gap-[10px]">
                <Crown />
                <div className="text-2xl font-medium linear-wipe">#{project.rank}</div>
              </div>
            )}

            {project.rank && project.rank >= 100 && (
              <div className="flex items-center rounded-xl bg-white shadow p-3 gap-[10px]">
                <div className="text-2xl font-medium linear-wipe">#{project.rank}</div>
              </div>
            )}

            {/* <div className="flex items-center rounded-xl bg-white shadow p-3 gap-[10px]">
              <VoteSvg />
              <div className="text-2xl font-medium">{project.includedInBallots}</div>
            </div> */}
            <div className="flex items-center rounded-xl bg-white shadow p-3 gap-[10px]">
              <OpCoin />
              <div className="text-2xl font-medium">{project.totalOP ? Math.round(project.totalOP!).toLocaleString("en-US") : 'Ineligible'}</div>
            </div>
          </div>
          {/* <div className="truncate mt-1">
            <div className="flex gap-4">
              <ProjectEligibilityBadge
                status={project.prelimResult}
                ballots={project.includedInBallots}
                size="xs"
              />
            </div>
          </div> */}
        </div>
        <div className="text-[#4C4E64AD] text-xs mt-2 font-normal line-clamp-3">
          {project.prelimResult.toLowerCase() == "keep" ? (
            project.bio
          ) : (
            <span className="text-red-600">{project.reportReason}</span>
          )}
        </div>
        <div className="flex gap-4 md:hidden mt-3">
          {project.rank && project.rank < 10 && (
            <div className="flex items-center rounded-xl bg-white shadow p-3 gap-[10px]">
              <Crown />
              <div className="text-2xl font-medium linear-wipe">Top {project.rank}</div>
            </div>
          )}

          {project.rank && project.rank >= 10 && project.rank <= 99 && (
            <div className="flex items-center rounded-xl bg-white shadow p-3 gap-[10px]">
              <Crown />
              <div className="text-2xl font-medium linear-wipe">#{project.rank}</div>
            </div>
          )}

          {project.rank && project.rank >= 100 && (
            <div className="flex items-center rounded-xl bg-white shadow p-3 gap-[10px]">
              <div className="text-xl font-medium linear-wipe">#{project.rank}</div>
            </div>
          )}

          {/* <div className="flex items-center rounded-xl bg-white shadow p-3 py-2 gap-[10px]">
            <VoteSvg />
            <div className="text-xl font-medium">{project.includedInBallots}</div>
          </div> */}
          <div className="flex items-center rounded-xl bg-white shadow p-3 py-2 gap-[10px]">
            <OpCoin />
            <div className="text-xl font-medium">{project.totalOP ? Math.round(project.totalOP!).toLocaleString("en-US") : 'Ineligible'}</div>
          </div>
        </div>

        {/* <div className="text-[#4C4E64AD] line-clamp-2 text-sm mb-3">
          {project.prelimResult.toLowerCase() == "keep" ? (
            project.bio
          ) : (
            <span className="text-red-600">{project.reportReason}</span>
          )}
        </div>
        <div className="my-3">
          <UserImageAddress
            img="/img/test-avatar.png"
            address={addrParse(project.address)}
          />
        </div> */}
        {/* <div className="flex flex-wrap">
          {project.impactCategory.map((category) => (
            <div className="rounded bg-gray-200 text-gray-600 px-2 py-1 text-xs mr-2 mb-2">
              {categoryLabel(category)}
            </div>
          ))}
        </div> */}
      </div>
    </Link>
  );
};
