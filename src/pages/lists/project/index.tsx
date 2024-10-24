import { Icon } from "@iconify/react/dist/iconify.js";
import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../../../components/Layout";
import { LoadingAnimation } from "../../../components/LoadingAnimation";
import { ProjectFundingCard } from "../../../components/Project/FundingCard";
import { ProjectHeroSection } from "../../../components/Project/HeroSection";
import { ProjectListCard } from "../../../components/Project/ListsCard";
import ProjectComments from "../../../components/Project/ProjectComments";
import ProjectMetricsGarden from "../../../components/Project/ProjectMetricsGarden";
import TabNavigation from "../../../components/Project/TabNavigate";
import ChainIcon from "../../../components/common/ChainIcon";
import { Github } from "../../../types/AttestationBody";
import {
  Project,
  ProjectMetrics,
  UrlNameDescription,
} from "../../../types/Project";
import { apiHost } from "../../../utils/api";
import { appendHttps } from "../../../utils/common";
import { categoryLabel } from "../../../utils/project";

interface ChipExternalLinkProps {
  website: string;
  index?: string;
}
const ChipExternalLink = ({ website, index }: ChipExternalLinkProps) => {
  return (
    <a
      href={appendHttps(website)}
      target="_blank"
      key={index}
      className="py-1 px-2 bg-[#EAECF0] rounded-full text-[#272930DE]"
    >
      <div className="flex gap-2 items-center">
        <div
          className={`p-1 rounded-full ${
            index === "twitter" ? "bg-black" : "bg-[#F9FAFB]"
          }`}
        >
          <Icon
            icon={index === "twitter" ? "line-md:twitter-x" : "lucide:globe"}
            className={`${index === "twitter" ? "text-white" : ""} text-sm`}
          />
        </div>
        <div className="text-xs">{website}</div>
        <Icon
          icon={"lucide:external-link"}
          width={14}
          height={14}
          className="text-[#858796]"
        />
      </div>
    </a>
  );
};

export function ProjectView({ project }: { project: Project }) {
  return (
    <div>
      <div className="text-[#272930DE] text-2xl" id="about">
        About
      </div>
      <div className="flex gap-3 flex-wrap mt-3">
        {project?.websiteUrl && (
          <ChipExternalLink
            website={project?.websiteUrl}
            index="projectwebsiteUrl"
          />
        )}
        {project?.agoraBody?.socialLinks?.website?.length > 1 &&
          project?.agoraBody?.socialLinks?.website?.map(
            (website: string, i: number) => (
              <ChipExternalLink website={website} index={"website" + i} />
            )
          )}
        {project?.agoraBody?.socialLinks?.farcaster?.length > 1 &&
          project?.agoraBody?.socialLinks?.farcaster?.map(
            (website: string, i: number) => (
              <ChipExternalLink website={website} index={"website" + i} />
            )
          )}
        {project?.agoraBody?.socialLinks?.twitter && (
          <ChipExternalLink
            website={project?.agoraBody?.socialLinks?.twitter}
            index={"twitter"}
          />
        )}
        {project?.agoraBody?.socialLinks?.mirror && (
          <ChipExternalLink
            website={project?.agoraBody?.socialLinks?.mirror}
            index={"twitter"}
          />
        )}
      </div>
      <div className="text-[#4C4E64AD] text-sm mt-3 font-normal pb-5 whitespace-pre-line">
        {project.bio}
      </div>
      <hr />
      <ProjectMetricsGarden projectId={project.id} />

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

      {project?.application && (
        <div className="my-5" id="impact-statement">
          <div className="border bg-white border-[#EAECF0] rounded-lg p-5 mt-5">
            <div className="flex gap-3">
              <img src="/img/impact-logo.png" alt="" className="w-10 h-10" />
              <div className="text-2xl">Impact Statement</div>
            </div>

            <div className="mt-3">
              <div className="text-[#272930DE] font-bold">
                Category: {categoryLabel(project?.application.category)}
              </div>
            </div>

            <div className="mt-3">
              <div className="text-[#272930DE] font-bold">Subcategory</div>
              <div className="text-[#4C4E64AD] text-sm whitespace-pre-line mt-1">
                {project?.application.subcategory?.join("\n\n")}
              </div>
            </div>

            <div>
              {project?.application.impactStatement.map(
                (
                  { answer, question }: { answer: string; question: string },
                  i: number
                ) => (
                  <div className="mt-5" key={i}>
                    <div className="text-[#272930DE] font-bold">{question}</div>
                    <div className="text-[#4C4E64AD] text-sm whitespace-pre-line mt-1">
                      {answer}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      <div className="my-5">
        {project.osoSlug && (
          <div className="border bg-white border-[#EAECF0] rounded-lg p-5 mt-5">
            <div className="text-2xl">OSO Slug</div>

            <div className="mt-5">
              <a
                href={`https://github.com/opensource-observer/oss-directory/blob/main/data/projects/${project.osoSlug[0].toLowerCase()}/${project.osoSlug.toLowerCase()}.yaml`}
                target="_blank"
              >
                <div className="flex gap-2 items-center text-[#858796]">
                  <div className="p-1 bg-[#F5F5F5] rounded-full">
                    <Icon icon="lucide:file-text" color="#757575" />
                  </div>
                  <div className="text-sm truncate">{project.osoSlug}</div>
                  <Icon icon="lucide:external-link" />
                </div>
              </a>
            </div>
          </div>
        )}

        {project?.attestationBody?.github &&
          Boolean(project?.attestationBody?.github?.length) && (
            <div className="border bg-white border-[#EAECF0] rounded-lg p-5 mt-5">
              <div className="text-2xl">GitHub</div>

              <div className="mt-5">
                {project?.attestationBody?.github.map(
                  (github_: string | Github, i: number) => {
                    const github =
                      typeof github_ === "string"
                        ? {
                            url: github_,
                            name: null,
                            description: null,
                          }
                        : github_;

                    return (
                      <div
                        className={`${
                          github.name || github.description ? "mb-4" : ""
                        }`}
                      >
                        <a href={github.url} target="_blank" key={i}>
                          <div
                            className={`flex gap-2 items-center text-[#858796] ${
                              github.name || github.description ? "mb-1" : ""
                            }`}
                          >
                            <div className="p-1 bg-[#F5F5F5] rounded-full">
                              {github.url.startsWith("https://github.com/") ? (
                                <img
                                  className="w-5 h-5"
                                  src={"/img/social/github.png"}
                                ></img>
                              ) : (
                                <Icon icon="lucide:file-text" color="#757575" />
                              )}
                            </div>
                            <div className="text-sm truncate">
                              {github.url.replace("https://github.com/", "")}
                            </div>
                            <Icon icon="lucide:external-link" />
                          </div>
                        </a>

                        <div className="font-bold text-sm text-[#858796] mb-0.5">
                          {github.name}
                        </div>
                        <div className="text-sm text-[#858796]">
                          {github.description}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}

        {project?.attestationBody?.links &&
          Boolean(project?.attestationBody?.links?.length) && (
            <div
              className="border bg-white border-[#EAECF0] rounded-lg p-5 mt-5"
              id="links"
            >
              <div className="text-2xl">Links</div>

              <div className="mt-5">
                {project?.attestationBody?.links.map(
                  (link_: string | Github, i: number) => {
                    const link =
                      typeof link_ === "string"
                        ? {
                            url: link_,
                            name: null,
                            description: null,
                          }
                        : link_;

                    return (
                      <div
                        className={`${
                          link.name || link.description ? "mb-4" : ""
                        }`}
                      >
                        <a href={link.url} target="_blank" key={i}>
                          <div
                            className={`flex gap-2 items-center text-[#858796] ${
                              link.name || link.description ? "mb-1" : ""
                            }`}
                          >
                            <div className="p-1 bg-[#F5F5F5] rounded-full">
                              {link.url.startsWith("https://github.com/") ? (
                                <img
                                  className="w-5 h-5"
                                  src={"/img/social/github.png"}
                                ></img>
                              ) : (
                                <Icon icon="lucide:file-text" color="#757575" />
                              )}
                            </div>
                            <div
                              className={`text-sm truncate ${
                                link.name ? "font-bold" : ""
                              }`}
                            >
                              {link.name || link.url}
                            </div>
                            <Icon icon="lucide:external-link" />
                          </div>
                        </a>

                        <div className="text-sm text-[#858796]">
                          {link.description}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}

        {project?.packages.length > 0 && (
          <div className="border bg-white border-[#EAECF0] rounded-lg p-5 mt-5">
            <div className="text-2xl">Packages</div>

            <div className="mt-5">
              {project?.packages.map((p, i) => (
                <a href={p} target="_blank" key={i}>
                  <div className="flex gap-2 items-center text-[#858796]">
                    <div className="p-1 bg-[#F5F5F5] rounded-full">
                      {p.startsWith("https://www.npmjs.com/package/") ? (
                        <img
                          className="w-5 h-5"
                          src={"/img/social/npm.png"}
                        ></img>
                      ) : p.startsWith("https://github.com") ? (
                        <img
                          className="w-5 h-5"
                          src={"/img/social/github.png"}
                        ></img>
                      ) : (
                        <Icon icon="lucide:file-text" color="#757575" />
                      )}
                    </div>
                    <div className="text-sm truncate">
                      {p.replace("https://www.npmjs.com/package/", "")}
                    </div>
                    <Icon icon="lucide:external-link" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {project?.contributionLinks.length > 0 && (
        <div className="my-5" id="contract-address">
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
                        className="w-5 h-5"
                      ></ChainIcon>
                    </div>
                    <div className="text-sm truncate">
                      {contribution.description}
                    </div>
                    <Icon icon="lucide:external-link" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {project?.agoraBody?.links?.length > 0 && (
        <div className="my-5">
          <div className="border bg-white border-[#EAECF0] rounded-lg p-5 mt-5">
            <div className="text-2xl">Links</div>
            {/* <div className="mt-3 text-[#4C4E64AD] text-sm flex flex-col gap-6 whitespace-pre-line">
              {project?.contributionDescription}
            </div> */}
            <div className="mt-5">
              {/* <div className="mb-2">Contribution Links</div> */}

              {project?.agoraBody?.links?.map(
                (contribution: UrlNameDescription, i: number) => (
                  <a href={contribution.url} target="_blank" key={i}>
                    <div className="flex gap-2 items-center text-[#858796]">
                      <div className="p-1 bg-[#F5F5F5] rounded-full">
                        <Icon icon="lucide:globe" />
                      </div>
                      <div className="text-sm truncate">{contribution.url}</div>
                      <Icon icon="lucide:external-link" />
                    </div>
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      )}

      <div
        className="border bg-white border-[#EAECF0] rounded-lg p-5 mt-5"
        id="funding-sources"
      >
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

      <ProjectComments projectId={project.id}></ProjectComments>
    </div>
  );
}

interface MetricItemProps {
  title: string;
  value: string;
  op: number;
}

function metricOp(project: Project, key: keyof ProjectMetrics) {
  if (!project.totalOP) return 0;
  if (!project.metricsPercent) return 0;
  if (!project.metricsPercentOss) return 0;
  return (
    (((project.metricsPercent[key] as number) || 0) -
      ((project.metricsPercentOss[key] as number) || 0)) *
    project.totalOP
  );
}

function MetricItem({ title, value, op }: MetricItemProps) {
  return (
    <div className="rounded-lg bg-[#F2F4F7] p-4 mb-4">
      <div className="text-lg text-[#344054] flex justify-between">
        <div>{value}</div>

        {Boolean(op) && (
          <div className="flex items-center">
            <div className="font-bold mx-2">
              {op.toLocaleString("en-US", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })}
            </div>
            <div>
              <img className="w-6 h-6" src="/img/platform/op.png"></img>
            </div>
          </div>
        )}
      </div>
      <div className="text-sm text-[#667085]">{title}</div>
    </div>
  );
}

export default function ProjectPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | undefined>();

  const fetchProject = useCallback(async () => {
    // const response = await axios.get("/dataset/rpgf3/projects/" + projectId + ".json");
    try {
      const response = await axios.get(`${apiHost()}/projects/${projectId}`);
      setProject(response.data);

      console.log(response.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status == 404) {
          window.location.href = `https://round3.retrolist.app/project/${projectId}`;
        }
      } else {
        console.error(err);
        window.alert("Fetching project failed! Please try again");
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
          <LoadingAnimation />
        </Layout>
      </div>
    );
  }

  // const metricKeys = [
  //   "is_oss",
  //   "gas_fees",
  //   "transaction_count",
  //   "trusted_transaction_count",
  //   "trusted_transaction_share",
  //   "trusted_users_onboarded",
  //   "daily_active_addresses",
  //   "trusted_daily_active_users",
  //   "monthly_active_addresses",
  //   "trusted_monthly_active_users",
  //   "recurring_addresses",
  //   "trusted_recurring_users",
  //   "power_user_addresses",
  //   "openrank_trusted_users_count",
  //   "log_gas_fees",
  //   "log_transaction_count",
  //   "log_trusted_transaction_count",
  // ]

  const oss_reward =
    project.metricsPercentOss && project.totalOP
      ? (project.metricsPercentOss.gas_fees +
          project.metricsPercentOss.daily_active_addresses +
          project.metricsPercentOss.log_gas_fees +
          project.metricsPercentOss.log_transaction_count +
          project.metricsPercentOss.log_trusted_transaction_count +
          project.metricsPercentOss.monthly_active_addresses +
          project.metricsPercentOss.openrank_trusted_users_count +
          project.metricsPercentOss.power_user_addresses +
          project.metricsPercentOss.recurring_addresses +
          project.metricsPercentOss.transaction_count +
          project.metricsPercentOss.trusted_daily_active_users +
          project.metricsPercentOss.trusted_monthly_active_users +
          project.metricsPercentOss.trusted_recurring_users +
          project.metricsPercentOss.trusted_transaction_count +
          project.metricsPercentOss.trusted_transaction_share +
          project.metricsPercentOss.trusted_users_onboarded) *
        project.totalOP
      : 0;

  let metrics: MetricItemProps[] = project.metrics
    ? [
        {
          title: "Gas Fees",
          value:
            project.metrics.gas_fees.toLocaleString("en-US", {
              maximumFractionDigits: 2,
            }) + " ETH",
          op: metricOp(project, "gas_fees") + metricOp(project, "log_gas_fees"),
        },
        {
          title: "Transactions",
          value: project.metrics.transaction_count.toLocaleString("en-US", {
            maximumFractionDigits: 0,
          }),
          op:
            metricOp(project, "transaction_count") +
            metricOp(project, "log_transaction_count"),
        },
        {
          title: "Transactions from Trusted Users",
          value: project.metrics.trusted_transaction_count.toLocaleString(
            "en-US",
            { maximumFractionDigits: 0 }
          ),
          op:
            metricOp(project, "trusted_transaction_count") +
            metricOp(project, "log_trusted_transaction_count"),
        },
        {
          title: "Trusted Users Share of Transactions",
          value:
            (project.metrics.trusted_transaction_share * 100).toLocaleString(
              "en-US",
              { maximumFractionDigits: 2 }
            ) + "%",
          op: metricOp(project, "trusted_transaction_share"),
        },
        {
          title: "Trusted Users",
          value: project.metrics.openrank_trusted_users_count.toLocaleString(
            "en-US",
            { maximumFractionDigits: 0 }
          ),
          op: metricOp(project, "openrank_trusted_users_count"),
        },
        {
          title: "Trusted Users Onboarded",
          value: project.metrics.trusted_users_onboarded.toLocaleString(
            "en-US",
            { maximumFractionDigits: 0 }
          ),
          op: metricOp(project, "trusted_users_onboarded"),
        },
        {
          title: "Average Daily Active Addresses",
          value: project.metrics.daily_active_addresses.toLocaleString(
            "en-US",
            { maximumFractionDigits: 2 }
          ),
          op: metricOp(project, "daily_active_addresses"),
        },
        {
          title: "Average Trusted Daily Active Users",
          value: project.metrics.trusted_daily_active_users.toLocaleString(
            "en-US",
            { maximumFractionDigits: 2 }
          ),
          op: metricOp(project, "trusted_daily_active_users"),
        },
        {
          title: "Average Monthly Active Addresses",
          value: project.metrics.monthly_active_addresses.toLocaleString(
            "en-US",
            { maximumFractionDigits: 2 }
          ),
          op: metricOp(project, "monthly_active_addresses"),
        },
        {
          title: "Average Trusted Monthly Active Users",
          value: project.metrics.trusted_monthly_active_users.toLocaleString(
            "en-US",
            { maximumFractionDigits: 2 }
          ),
          op: metricOp(project, "trusted_monthly_active_users"),
        },
        {
          title: "Recurring Addresses",
          value: project.metrics.recurring_addresses.toLocaleString("en-US", {
            maximumFractionDigits: 0,
          }),
          op: metricOp(project, "recurring_addresses"),
        },
        {
          title: "Trusted Recurring Users",
          value: project.metrics.trusted_recurring_users.toLocaleString(
            "en-US",
            { maximumFractionDigits: 0 }
          ),
          op: metricOp(project, "trusted_recurring_users"),
        },
        {
          title: "Power User Addresses",
          value: project.metrics.power_user_addresses.toLocaleString("en-US", {
            maximumFractionDigits: 0,
          }),
          op: metricOp(project, "power_user_addresses"),
        },
        {
          title: "Open Source",
          value:
            oss_reward && project.totalOP
              ? (project.totalOP / (project.totalOP - oss_reward)).toFixed(2) +
                "X"
              : "No",
          op: oss_reward,
        },
      ]
    : [];

  if (project.totalOP) {
    metrics = metrics.sort((a, b) => b.op - a.op);
  }

  return (
    <div>
      <Layout>
        <div className="mt-11">
          <div className="flex gap-6 items-center">
            <Link
              to="/"
              className="text-[#FA280A] flex gap-1 items-center border border-[#FA280A] py-2.5 px-3.5 text-sm rounded-full font-semibold"
            >
              <Icon icon="lucide:chevron-left" />
              <div>Go back</div>
            </Link>
            <div className="border-l border-[#4C4E641F] h-6" />
            <div className="text-[#475467] flex gap-3 items-center font-semibold text-sm">
              <Link to="https://retrolist.app/">Home</Link>
              <img src="/svg/slash.svg" alt="" />
              <Link to="/">Round 5</Link>
              <img src="/svg/slash.svg" alt="" />
              <div className="text-[#FA280A]">{project.displayName}</div>
            </div>
          </div>

          <ProjectHeroSection project={project} />
          <div className="flex gap-6">
            <div className="mt-5 flex flex-col gap-6 w-3/4">
              <TabNavigation project={project} />
              <div className="flex-grow mb-6">
                <ProjectView project={project} />
              </div>

              {project.metrics && (
                <div className="w-full md:w-auto" style={{ minWidth: 320 }}>
                  {/* <div className="text-base text-[#858796]">Metrics</div> */}

                  {project.lists.length > 0 ? (
                    <div className="mt-4">
                      {project.lists.map((list) => (
                        <ProjectListCard list={list} key={list._id} />
                      ))}
                    </div>
                  ) : (
                    <div className="border bg-white border-[#EAECF0] rounded-lg p-5 mt-5">
                      <div className="text-2xl mt-2">Total OP Received</div>
                      <div className="text-[#667085] mb-4">
                        Retro Funding 6: Onchain Builders
                      </div>

                      <div className="flex items-center mb-6">
                        <div className="text-4xl text-[#272930DE] font-bold mr-2">
                          {project.totalOP
                            ? Math.round(project.totalOP!).toLocaleString(
                                "en-US"
                              )
                            : "Ineligible"}
                        </div>
                        <img
                          className="w-8 h-8"
                          src="/img/platform/op.png"
                        ></img>
                      </div>

                      <hr className="border my-2" />

                      <div className="text-2xl my-4">Impact Metrics</div>

                      {metrics.map((m) => (
                        <MetricItem {...m}></MetricItem>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="w-1/4 mt-5">
              {project.charmverseLink && (
                <div>
                  <div className="flex gap-2">
                    <div>
                      <div className="p-2.5 rounded-full bg-[#FEE4E2]">
                        <img src="/svg/message-smile.svg" className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-[#101828]">
                        Badgeholder Review
                      </div>
                      <div className="mt-1 text-sm text-[#667085] font-semibold">
                        Feedback you project from badgeholder.
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Link
                      to={project.charmverseLink}
                      className="flex justify-end mt-2 font-semibold text-sm text-[#FF0420] items-center"
                    >
                      <div>View on Charmverse</div>
                      <Icon icon="uim:arrow-up-right" className="w-5 h-5" />
                    </Link>
                  </div>
                  <hr className="border-dashed my-4" />
                </div>
              )}
              <div className="text-[#858796] font-semibold">Impact Metrics</div>
              <div className="mt-3 border border-[#EAECF0] rounded-xl p-4 bg-white">
                <div className="text-lg font-semibold text-[#101828]">
                  Total OP Received
                </div>
                <div className="mt-1 text-[#667085] text-sm">
                  Retro Funding 6: Onchain Builders
                </div>
                <div className="mt-4 border border-[#EAECF0] rounded-lg p-4 bg-[#F9FAFB]">
                  <div className="flex justify-center">
                    <div className="p-3.5 rounded-full bg-[#F5F5F5]">
                      <Icon
                        icon="lucide:clock"
                        className="w-7 h-7 text-[#717680]"
                      />
                    </div>
                  </div>
                  <div className="mt-2 text-center text-[#475467] font-semibold">
                    Voting completion pending. OP and impact metrics update
                    post-voting.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
