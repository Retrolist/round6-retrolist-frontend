import Layout from "../../components/Layout";
import LayoutSideInfo from "../../components/LayoutSideInfo";
import { ProjectCard } from "../../components/Project/Card";

export default function ListsPage() {
  return (
    <Layout>
      <LayoutSideInfo>
        <div>
          <div className="mb-5">
            <div className="text-2xl font-bold">All Projects</div>
            <div className="text-sm text-[#4C4E64AD] border-b border-[#4C4E641F] pb-3">
              Positive impact to the community should be rewarded with profit to
              the builder.
            </div>
          </div>
          <div className="flex gap-2 items-center mb-8">
            <button className="p-2 px-4 rounded-xl bg-[#323A43] text-white">
              All Project
            </button>
            <div className="border-l-[1px] border border-[#CBD5E0] h-4"></div>
            <button className="p-2 flex gap-1 px-4 rounded-xl bg-[#F5F5F5] text-[#202327]">
              <div>OP Stack</div>
              <div className="bg-white rounded-xl px-2 py-1 text-xs">168</div>
            </button>
            <button className="p-2 flex gap-1 px-4 rounded-xl bg-[#F5F5F5] text-[#202327]">
              <div>Collective Governance</div>
              <div className="bg-white rounded-xl px-2 py-1 text-xs">168</div>
            </button>
            <button className="p-2 flex gap-1 px-4 rounded-xl bg-[#F5F5F5] text-[#202327]">
              <div>Developer Ecosystem</div>
              <div className="bg-white rounded-xl px-2 py-1 text-xs">12</div>
            </button>
            <button className="p-2 flex gap-1 px-4 rounded-xl bg-[#F5F5F5] text-[#202327]">
              <div>End user UX</div>
              <div className="bg-white rounded-xl px-2 py-1 text-xs">12</div>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <ProjectCard />
            ))}
          </div>
        </div>
      </LayoutSideInfo>
    </Layout>
  );
}

export const ListsPageRoute = {
  path: "/",
  element: <ListsPage />,
};
