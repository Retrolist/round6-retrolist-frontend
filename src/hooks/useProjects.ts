import { useCallback, useState } from "react";

export interface ProjectQueryOptions {
  search: string
  categories: string[]
  seed?: string
}

export function useProjects(options: ProjectQueryOptions) {
  const [ projects, setProjects ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const [ isError, setIsError ] = useState(false)
  const [ cursor, setCursor ] = useState<string | null>(null)

  const refreshProjectsInternal = useCallback(async () => {
    try {
      setLoading(true)
      setIsError(false)
    } catch (err) {
      console.error(err)
      setIsError(true)
    } finally {
      setLoading(false)
    }
  }, [options.search, options.categories, options.seed, cursor, setProjects, setLoading])

  const refreshProjects = useCallback(async () => {
    setCursor(null)
    refreshProjectsInternal()
  }, [refreshProjectsInternal, setCursor])

  const paginate = useCallback(async () => {
    refreshProjectsInternal()
  }, [refreshProjectsInternal])

  return {
    projects,
    loading,
    isError,
    refreshProjects,
    paginate,
  }
}