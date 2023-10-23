import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { api } from "../utils/api";
import { useDebounce } from "usehooks-ts";

export interface ProjectQueryOptions {
  search: string
  categories: string[]
  orderBy?: string
  seed?: string
  limit?: number
}

export function useProjects(options: ProjectQueryOptions) {
  const [ projects, setProjects ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const [ isError, setIsError ] = useState(false)
  const [ hasNext, setHasNext ] = useState(false)
  const [ cursor, setCursor ] = useState<string | null>(null)
  const debouncedSearch = useDebounce<string>(options.search, 500)

  const refreshProjectsInternal = useCallback(async () => {
    try {
      setLoading(true)
      setIsError(false)

      const response = await api.get('/projects', {
        params: {
          search: options.search,
          categories: options.categories.join(','),
          limit: options.limit || 30,
          seed: options.seed,
          orderBy: options.orderBy,
          cursor,
        }
      });

      setProjects(response.data.projects)
      setCursor(response.data.pageInfo.endCursor)
      setHasNext(response.data.pageInfo.hasNextPage)
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

  useEffect(() => {
    refreshProjectsInternal()
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