import { useCallback, useState } from "react";
import Layout from "../../components/Layout";
import LayoutSideInfo from "../../components/LayoutSideInfo";
import { ProjectCard } from "../../components/Project/Card";
import { useProjects } from "../../hooks/useProjects";
import { ProjectCategoryButton } from "../../components/Project/ProjectCategoryButton";
import InfiniteScroll from "react-infinite-scroller";
import { Alert, Input } from 'antd';
import {
  SearchOutlined,
} from '@ant-design/icons';

const { Search } = Input;

export default function ProjectsPage() {
  const [ search, setSearch ] = useState('')
  const [ categories, setCategories ] = useState<string[]>([])
  const [ eligibleFilter, setEligibleFilter ] = useState('')
  const [ seed, setSeed ] = useState(Math.floor(Math.random() * 1000000000).toString())

  const setCategory = useCallback((category?: string) => {
    if (category) {
      setCategories([category])
    } else {
      setCategories([])
    }
  }, [setCategories])

  const {
    projects,
    loading,
    isError,
    hasNext,
    refreshProjects,
    paginate,
  } = useProjects({
    search,
    categories,
    seed,
    orderBy: search ? 'alphabeticalAZ' : 'shuffle',
  })

  // console.log(projects)

  // console.log(search)

  return (
    <Layout>
      <LayoutSideInfo>
        <div>
          {/* <div className="mb-5">
            <Alert
              message="My project is Removed! What to do?"
              description={
                <div>
                  <div className="mb-1">You can submit an appeal on Nov, 2-3 via <a href="https://app.deform.cc/form/78499a28-ecff-4928-a814-cd3364741051/" target="_blank" className="underline">this form</a></div>
                  <div><a href="https://plaid-cement-e44.notion.site/RetroPGF-3-Application-Review-Process-5209e6791cce4c6f97296536c81d7f96" target="_blank" className="underline">Read more about RetroPGF 3 Review Process</a></div>
                </div>
              }
              type="error"
            />
          </div> */}

          <div className="mb-5">
            <div className="text-2xl font-bold mb-1">All Projects</div>
            <div className="text-sm text-[#4C4E64AD] border-b border-[#4C4E641F] pb-3">
              Positive impact to the community should be rewarded with profit to
              the builder.
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 items-center mb-8">
            <ProjectCategoryButton
              text="All Projects"
              categories={categories}
              category=""
              setCategory={setCategory}
            />
            
            <div className="border-l-[1px] border border-[#CBD5E0] h-4"></div>

            <ProjectCategoryButton
              text="Collective Governance"
              amount={609}
              categories={categories}
              category="COLLECTIVE_GOVERNANCE"
              setCategory={setCategory}
            />

            <ProjectCategoryButton
              text="OP Stack"
              amount={603}
              categories={categories}
              category="OP_STACK"
              setCategory={setCategory}
            />

            <ProjectCategoryButton
              text="Developer Ecosystem"
              amount={665}
              categories={categories}
              category="DEVELOPER_ECOSYSTEM"
              setCategory={setCategory}
            />

            <ProjectCategoryButton
              text="End user UX"
              amount={1240}
              categories={categories}
              category="END_USER_EXPERIENCE_AND_ADOPTION"
              setCategory={setCategory}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-2 items-center mb-8">
            <ProjectCategoryButton
              text="All Status"
              categories={eligibleFilter ? [eligibleFilter] : []}
              category=""
              setCategory={setEligibleFilter}
            />
            
            <div className="border-l-[1px] border border-[#CBD5E0] h-4"></div>

            {/* <ProjectCategoryButton
              text="Reviewing"
              categories={[eligibleFilter]}
              category="review"
              setCategory={setEligibleFilter}
            />

            <ProjectCategoryButton
              text="Pending Approval"
              categories={[eligibleFilter]}
              category="#n/a"
              setCategory={setEligibleFilter}
            /> */}

            <ProjectCategoryButton
              text="Eligible"
              categories={[eligibleFilter]}
              category="keep"
              setCategory={setEligibleFilter}
            />

            <ProjectCategoryButton
              text="Removed"
              categories={[eligibleFilter]}
              category="remove"
              setCategory={setEligibleFilter}
            />
          </div>

          <div className="mb-8">
            <Input
              addonBefore={<SearchOutlined />}
              placeholder="Search projects"
              size="large"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <InfiniteScroll
            pageStart={0}
            loadMore={paginate}
            hasMore={hasNext}
            loader={<div>Loading...</div>}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.filter(project => project.prelimResult.toLowerCase().indexOf(eligibleFilter) != -1).map((project) => (
                <ProjectCard project={project} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </LayoutSideInfo>
    </Layout>
  );
}

export const ProjectsPageRoute = {
  path: "/",
  element: <ProjectsPage />,
};
