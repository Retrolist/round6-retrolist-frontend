import { useCallback, useState } from "react";
import Layout from "../../components/Layout";
import LayoutSideInfo from "../../components/LayoutSideInfo";
import { ProjectCard } from "../../components/Project/Card";
import { useProjects } from "../../hooks/useProjects";
import { ProjectCategoryButton } from "../../components/Project/ProjectCategoryButton";

export default function ListsPage() {
  const [ search, setSearch ] = useState('')
  const [ categories, setCategories ] = useState<string[]>([])
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

          <div className="grid grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard project={project} />
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
