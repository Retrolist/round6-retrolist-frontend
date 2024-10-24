import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { api, apiHost, apiRound } from "../utils/api";
import { useDebounce } from "usehooks-ts";
import { ProjectQueryOptions, ProjectMetadata } from "../types/Project";
import Fuse from 'fuse.js'

let PROJECTS: ProjectMetadata[] = []
let PROJECT_FUSE: Fuse<ProjectMetadata>;

export function useProjects(options: ProjectQueryOptions) {
  const [ projects, setProjects ] = useState<ProjectMetadata[]>([])
  const [ loading, setLoading ] = useState(true)
  const [ isError, setIsError ] = useState(false)
  const [ hasNext, setHasNext ] = useState(false)
  const cursor = useRef<string | null>(null)
  const debouncedSearch = useDebounce<string>(options.search, 500)

  const refreshProjectsInternal = useCallback(async () => {
    try {
      setLoading(true)
      setIsError(false)

      if (PROJECTS.length == 0) {
        // const response = await axios.get("/dataset/rpgf3/projects.json")
        const response = await axios.get(`${apiHost()}/${apiRound()}/projects`)
        PROJECTS = response.data

        // Force order by rank
        console.log(options.orderBy)
        if (options.orderBy == 'rank') {
          PROJECTS = PROJECTS.sort((a, b) => (a.rank || 100000) - (b.rank || 100000))
          console.log(PROJECTS)
        }

        PROJECT_FUSE = new Fuse(PROJECTS, {
          keys: [
            {
              name: 'displayName',
              weight: 8,
            },
            {
              name: 'bio',
              weight: 2,
            },
            // 'impactDescription',
            // 'contributionDescription',
          ],
          // distance: 400,
          minMatchCharLength: 3,
        })
      }

      let filteredProjects: ProjectMetadata[] = PROJECTS

      if (!options.search) {}
      else if (options.search.length < 3) {
        filteredProjects = PROJECTS.filter(x => x.displayName.startsWith(options.search))
      } else {
        filteredProjects = PROJECT_FUSE.search(options.search).map(x => x.item)
      }

      if (options.categories && options.categories.length > 0) {
        filteredProjects = filteredProjects.filter(project => (
          options.categories.indexOf(project.recategorization || '') != -1 ||
          options.categories.indexOf(project.primaryCategory || '') != -1 ||
          project.impactCategory.some(projectCategory => options.categories.includes(projectCategory))
        ))
      }

      let filteredLength = filteredProjects.length
      let startIndex = 0;
      let endIndex = filteredLength

      if (cursor.current && cursor.current.startsWith("Index|")) {
        startIndex = parseInt(cursor.current.split('|')[1])
      }

      if (options.limit) {
        endIndex = startIndex + options.limit
      } else {
        endIndex = startIndex + 30
      }

      filteredProjects = filteredProjects.slice(startIndex, endIndex)

      // console.log(cursor.current)

      // const response = await api.get('/projects', {
      //   params: {
      //     search: options.search,
      //     categories: options.categories.join(','),
      //     limit: options.limit || 30,
      //     seed: options.seed,
      //     orderBy: options.orderBy,
      //     cursor: cursor.current,
      //     approved: options.approved ? 1 : 0,
      //   }
      // });

      if (!cursor.current) {
        setProjects(filteredProjects)
      } else {
        setProjects([...projects, ...filteredProjects])
      }
      
      // cursor.current = response.data.pageInfo.endCursor
      // setHasNext(response.data.pageInfo.hasNextPage)

      cursor.current = 'Index|' + endIndex
      setHasNext(endIndex < filteredLength)
    } catch (err) {
      console.error(err)
      setIsError(true)
    } finally {
      setLoading(false)
    }
  }, [options.search, options.categories, options.seed, cursor, projects, setProjects, setLoading])

  const refreshProjects = useCallback(async () => {
    cursor.current = null
    setProjects([])
    refreshProjectsInternal()
  }, [refreshProjectsInternal, cursor])

  const paginate = useCallback(async () => {
    // console.log(paginate, cursor.current, hasNext)
    if (cursor.current && hasNext) {
      refreshProjectsInternal()
    }
  }, [refreshProjectsInternal, cursor.current, hasNext])

  useEffect(() => {
    refreshProjects()
  }, [debouncedSearch, options.categories, options.seed])

  return {
    projects,
    loading,
    isError,
    hasNext,
    refreshProjects,
    paginate,
  }
}