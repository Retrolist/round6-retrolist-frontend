import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { ProjectCount } from '../types/Project';
import { apiHost, apiRound } from '../utils/api';

const DEFAULT_PROJECT_COUNT = {
  total: 0,
  eligible: 0,
  categories: [],
}

export const ProjectCountContext = createContext<ProjectCount>(DEFAULT_PROJECT_COUNT);

export const ProjectCountProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState(DEFAULT_PROJECT_COUNT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiHost()}/${apiRound()}/projects/count`);
        if (!response.ok) {
          throw new Error('Failed to fetch project count');
        }
        const result = await response.json();
        setData(result);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ProjectCountContext.Provider value={data}>
      {children}
    </ProjectCountContext.Provider>
  );
};

export function useProjectCount(): ProjectCount {
  return useContext(ProjectCountContext);
}