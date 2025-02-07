import axios from "axios";
import Fuse from "fuse.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { ProjectMetadata, ProjectQueryOptions } from "../types/Project";
import { apiHost, apiRound } from "../utils/api";

let PROJECTS: ProjectMetadata[] = [];
let PROJECT_FUSE: Fuse<ProjectMetadata>;

export function useProjects(options: ProjectQueryOptions) {
  const [projects, setProjects] = useState<ProjectMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const cursor = useRef<string | null>(null);
  const debouncedSearch = useDebounce<string>(options.search, 500);

  const sortProjects = (projects: ProjectMetadata[]): ProjectMetadata[] => {
    if (options.orderBy) {
      return [...projects].sort((a, b) => {
        if (options.orderBy === "rank") {
          return (a.rank || 100000) - (b.rank || 100000);
        } else if (options.orderBy === "displayName") {
          return a.displayName.localeCompare(b.displayName);
        } else if (
          options.orderBy === "reviewerCount" &&
          a.metricsGarden &&
          b.metricsGarden
        ) {
          return (
            (b.metricsGarden.reviewerCount || 0) -
            (a.metricsGarden.reviewerCount || 0)
          );
        }
        return 0;
      });
    }
    return projects;
  };

  const refreshProjectsInternal = useCallback(async () => {
    try {
      setLoading(true);
      setIsError(false);

      if (PROJECTS.length === 0) {
        const response = await axios.get(`${apiHost()}/${apiRound()}/projects`);
        PROJECTS = response.data;

        PROJECT_FUSE = new Fuse<ProjectMetadata>(PROJECTS, {
          keys: [
            { name: "displayName", weight: 8 },
            { name: "bio", weight: 2 },
          ],
          minMatchCharLength: 3,
        });
      }

      let filteredProjects: ProjectMetadata[] = PROJECTS;

      // Filter based on search
      if (options.search) {
        filteredProjects =
          options.search.length < 3
            ? PROJECTS.filter((x) => x.displayName.startsWith(options.search))
            : PROJECT_FUSE.search(options.search).map((x) => x.item);
      }

      // Filter based on categories
      if (options.categories && options.categories.length > 0) {
        filteredProjects = filteredProjects.filter((project) =>
          options.categories.includes(project.primaryCategory || "")
        );
      }

      // Filter based on prelimResult and options.approved
      if (options.approved) {
        filteredProjects = filteredProjects.filter(
          (project) => project.prelimResult.toLowerCase() === "keep"
        );
      } else {
        filteredProjects = filteredProjects.filter(
          (project) => project.prelimResult.toLowerCase() !== "keep"
        );
      }

      filteredProjects = options.search ? filteredProjects : sortProjects(filteredProjects);

      // Handle pagination
      const startIndex = cursor.current
        ? parseInt(cursor.current.split("|")[1])
        : 0;
      const endIndex = options.limit
        ? startIndex + options.limit
        : startIndex + 30;
      const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

      cursor.current = "Index|" + endIndex;
      setHasNext(endIndex < filteredProjects.length);

      setProjects((prev) =>
        cursor.current === null
          ? paginatedProjects
          : [...prev, ...paginatedProjects]
      );
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }, [options, sortProjects]);

  const refreshProjects = useCallback(async () => {
    cursor.current = null;
    setProjects([]);
    refreshProjectsInternal();
  }, [refreshProjectsInternal]);

  const paginate = useCallback(async () => {
    if (cursor.current && hasNext) {
      refreshProjectsInternal();
    }
  }, [refreshProjectsInternal, hasNext]);

  useEffect(() => {
    refreshProjects();
  }, [debouncedSearch, options.categories, options.orderBy, options.approved]);

  return {
    projects,
    loading,
    isError,
    hasNext,
    refreshProjects,
    paginate,
  };
}
