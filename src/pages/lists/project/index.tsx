import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import Layout from "../../../components/Layout";
import { ProjectFundingCard } from "../../../components/Project/FundingCard";
import { ProjectHeroSection } from "../../../components/Project/HeroSection";
import { ProjectListCard } from "../../../components/Project/ListsCard";

export default function ProjectPage() {
  return (
    <div>
      <Layout>
        <div className="mt-11">
          <Link to="/" className="text-[#858796] flex gap-1 items-center">
            <Icon icon="lucide:arrow-left" />
            <div>Go back</div>
          </Link>
          <ProjectHeroSection />
          <div className="mt-6 flex gap-6">
            <div className="w-3/4">
              <div className="text-[#272930DE] text-2xl">About</div>
              <div className="text-[#4C4E64AD] text-sm mt-3 font-normal pb-5 border-b border-[#EAECF0]">
                RetroPGF Rubric-based List Creation UI opening to public
                crowdsourcing
              </div>
              <div className="border bg-white border-[#EAECF0] rounded-lg p-5 mt-5">
                <div className="flex gap-3">
                  <img
                    src="/img/impact-logo.png"
                    alt=""
                    className="w-10 h-10"
                  />
                  <div>
                    <div className="text-2xl">
                      Impact statement for RetroPGF 3
                    </div>
                    <div className="flex">
                      <div className="py-0.5 px-2 bg-[#E2E8F0] rounded mt-3">
                        Collective Governance
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-[#4C4E64AD] text-sm flex flex-col gap-6">
                  <p>
                    RetroList integrates a rubric-based scoring system, endorsed
                    by the grant council for its efficiency, into RetroPGF 3.
                  </p>
                  <p>
                    We have discussed with non-badgeholders contributors in the
                    Optimism and many of them show interest in participating in
                    RetroPGF voting by list creation through our UI.
                  </p>
                  <p>
                    We have discussed with some badgeholder to design our novel
                    approval mechanism...
                  </p>
                  <p>To be continue</p>
                </div>
                <div className="mt-5">
                  <div className="mb-2">Impact Metrics</div>
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
                      Number of people showing interest
                    </div>
                    <Icon icon="lucide:external-link" />
                  </div>
                </div>
              </div>
              <div className="my-5">
                <div className="border bg-white border-[#EAECF0] rounded-lg p-5 mt-5">
                  <div className="text-2xl font-medium">Contribution</div>
                  <div className="mt-3 text-[#4C4E64AD] text-sm flex flex-col gap-6">
                    <p>
                      RetroList provides an alternative to the RetroPGF List
                      Creation UI, using a rubric-based approach to allocate OP
                      to projects. RetroList is open to the public, allowing
                      everyone to create their own lists and contribute to
                      RetroPGF3.
                    </p>
                    <div>
                      <p>
                        RetroList differs from Supermodular's list creation UI
                        in two major ways:
                      </p>
                      <ol className="list-decimal list-inside">
                        <li>RetroList utilizes rubric-based scoring</li>
                        <li>
                          RetroList is open to the public, enabling everyone to
                          create their own lists
                        </li>
                      </ol>
                    </div>
                    <div>
                      <p>
                        RetroList implement a novel approval mechanism to filter
                        out spam efficiently as follows:
                      </p>
                      <ol className="list-decimal list-inside">
                        <li>
                          Users connect their Twitter and Discord and create a
                          list -&gt; Status: Draft (Hidden)
                        </li>
                        <li>
                          Our team does a preliminary review -&gt; Status:
                          Qualified (Show only in our UI)
                        </li>
                        <li>
                          A badgeholder approves the list -&gt; Status: Approved
                          (Usable in the ballot)
                        </li>
                      </ol>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="mb-2">
                      RetroList Website (Will be live on voting period)
                    </div>
                    <div className="flex gap-2 items-center text-[#858796]">
                      <div className="p-1.5 bg-[#F5F5F5] rounded-full">
                        <Icon
                          icon="lucide:file-text"
                          width={16}
                          height={16}
                          color="#757575"
                        />
                      </div>
                      <div className="text-sm">Figma Design</div>
                      <Icon icon="lucide:external-link" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="border bg-white border-[#EAECF0] rounded-lg p-5 mt-5">
                <div className="text-2xl">Funding sources</div>
                <ProjectFundingCard />
                <ProjectFundingCard />
              </div>
            </div>
            <div className="w-1/4">
              <div className="text-base text-[#858796]">
                Included in lists (40)
              </div>
              <div className="mt-4">
                <ProjectListCard />
                <ProjectListCard />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
