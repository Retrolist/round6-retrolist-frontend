import { Icon } from "@iconify/react/dist/iconify.js";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../../../components/Layout";
import { ProjectFundingCard } from "../../../components/Project/FundingCard";
import { ProjectHeroSection } from "../../../components/Project/HeroSection";
import { ProjectListCard } from "../../../components/Project/ListsCard";
import { Project } from "../../../types/Project";
import { api } from "../../../utils/api";
import { categoryLabel } from "../../../utils/project";
import { Alert } from "antd";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import axios, { AxiosError } from "axios";
import ChainIcon from "../../../components/common/ChainIcon";

export function ProjectView({ project }: { project: Project }) {
  return (
    <div>
      <div className="text-[#272930DE] text-2xl">About</div>
      <div className="text-[#4C4E64AD] text-sm mt-3 font-normal pb-5 whitespace-pre-line">
        {project.bio}
      </div>
      <div className="border bg-white border-[#EAECF0] rounded-lg p-5 mt-5 hidden">
        <div className="flex gap-3">
          <img src="/img/impact-logo.png" alt="" className="w-10 h-10" />
          <div>
            <div className="text-2xl">Impact statement for RetroPGF 3</div>
            <div className="flex flex-wrap">
              {project.impactCategory.map((category) => (
                <div className="py-0.5 px-2 bg-[#E2E8F0] rounded mt-3 mr-3 text-sm">
                  {categoryLabel(category)}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-3 text-[#4C4E64AD] text-sm flex flex-col gap-6 whitespace-pre-line">
          {project.impactDescription}
        </div>
        <div className="mt-5">
          <div className="mb-2">Impact Metrics</div>

          {project?.impactMetrics.map((metric) => (
            <a href={metric.url} target="_blank">
              <div className="flex gap-2 items-center text-[#858796]">
                <div className="p-1.5 bg-[#F5F5F5] rounded-full">
                  <Icon
                    icon="lucide:file-text"
                    width={16}
                    height={16}
                    color="#757575"
                  />
                </div>
                <div className="text-sm">
                  {metric.description}: <b>{metric.number}</b>
                </div>
                <Icon icon="lucide:external-link" />
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="my-5">
        {project.osoSlug &&
          <div className="border bg-white border-[#EAECF0] rounded-lg p-5 mt-5">
            <div className="text-2xl">OSO Slug</div>

            <div className="mt-5">
              <a href={`https://github.com/opensource-observer/oss-directory/blob/main/data/projects/${project.osoSlug[0]}/${project.osoSlug}.yaml`} target="_blank">
                <div className="flex gap-2 items-center text-[#858796]">
                  <div className="p-1 bg-[#F5F5F5] rounded-full">
                    <Icon
                      icon="lucide:file-text"
                      color="#757575"
                    />
                  </div>
                  <div className="text-sm truncate">{project.osoSlug}</div>
                  <Icon icon="lucide:external-link" />
                </div>
              </a>
            </div>
          </div>
        }

        <div className="border bg-white border-[#EAECF0] rounded-lg p-5 mt-5">
          <div className="text-2xl">GitHub</div>

          <div className="mt-5">
            {project?.github.map((github, i) => (
              <a href={github} target="_blank" key={i}>
                <div className="flex gap-2 items-center text-[#858796]">
                  <div className="p-1 bg-[#F5F5F5] rounded-full">
                    {github.startsWith("https://github.com/") ? (
                      <img className='w-5 h-5' src={"/img/social/github.png"}></img>
                    ) : (
                      <Icon
                        icon="lucide:file-text"
                        color="#757575"
                      />
                    )}
                  </div>
                  <div className="text-sm truncate">{github.replace("https://github.com/", "")}</div>
                  <Icon icon="lucide:external-link" />
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="border bg-white border-[#EAECF0] rounded-lg p-5 mt-5">
          <div className="text-2xl">Packages</div>

          <div className="mt-5">
            {project?.packages.map((p, i) => (
              <a href={p} target="_blank" key={i}>
                <div className="flex gap-2 items-center text-[#858796]">
                  <div className="p-1 bg-[#F5F5F5] rounded-full">
                    {p.startsWith("https://www.npmjs.com/package/") ? (
                      <img className='w-5 h-5' src={"/img/social/npm.png"}></img>
                    ) : (
                      <Icon
                        icon="lucide:file-text"
                        color="#757575"
                      />
                    )}
                  </div>
                  <div className="text-sm truncate">{p.replace("https://www.npmjs.com/package/", "")}</div>
                  <Icon icon="lucide:external-link" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="my-5">
        <div className="border bg-white border-[#EAECF0] rounded-lg p-5 mt-5">
          <div className="text-2xl">Contract Addresses</div>
          {/* <div className="mt-3 text-[#4C4E64AD] text-sm flex flex-col gap-6 whitespace-pre-line">
            {project?.contributionDescription}
          </div> */}
          <div className="mt-5">
            {/* <div className="mb-2">Contribution Links</div> */}

            {project?.contributionLinks.map((contribution, i) => (
              <a href={contribution.url} target="_blank" key={i}>
                <div className="flex gap-2 items-center text-[#858796]">
                  <div className="p-1 bg-[#F5F5F5] rounded-full">
                    <ChainIcon
                      chainId={contribution.type}
                      className='w-5 h-5'
                    ></ChainIcon>
                  </div>
                  <div className="text-sm truncate">{contribution.description}</div>
                  <Icon icon="lucide:external-link" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border bg-white border-[#EAECF0] rounded-lg p-5 mt-5">
        <div className="text-2xl">Funding sources</div>

        {project?.fundingSources.length > 0 ? (
          project.fundingSources.map((fundingSource) => (
            <ProjectFundingCard
              fundingSource={fundingSource}
            ></ProjectFundingCard>
          ))
        ) : (
          <div className="text-center mt-4 text-[#858796]">
            -- No funding source provided --
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProjectPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | undefined>();

  const fetchProject = useCallback(async () => {
    // const response = await axios.get("/dataset/rpgf3/projects/" + projectId + ".json");
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_HOST}/projects/${projectId}`);
      setProject(response.data);
  
      console.log(response.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status == 404) {
          window.location.href = `https://round3.retrolist.app/project/${projectId}`
        }
      } else {
        console.error(err)
        window.alert('Fetching project failed! Please try again')
      }
    }
  }, [projectId]);

  useEffect(() => {
    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  if (!project) {
    return (
      <div>
        <Layout>
          <div className="mt-11">Loading...</div>
        </Layout>
      </div>
    );
  }

  return (
    <div>
      <Layout>
        <div className="mt-11">
          <Link to="/" className="text-[#858796] flex gap-1 items-center">
            <Icon icon="lucide:arrow-left" />
            <div>Go back</div>
          </Link>

          <ProjectHeroSection project={project} />

          <div className="mt-6 flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-3/4 mb-6">
              <ProjectView project={project} />
            </div>

            <div className="w-full md:w-1/4">
              <div className="text-base text-[#858796]">
                Metrics
              </div>

              {project.lists.length > 0 ? (
                <div className="mt-4">
                  {project.lists.map(list => <ProjectListCard list={list} key={list._id} />)}
                </div>
              ) : (
                <div className="mt-4">
                  <Alert
                    message="Coming Soon!"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
