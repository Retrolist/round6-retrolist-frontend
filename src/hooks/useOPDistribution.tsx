import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { api } from "../utils/api";
import React from "react";
import axios from "axios";

const OPDistributionContext = React.createContext<[any, {[projectId: string]: number}, boolean]>([{}, {}, false])

function useFetchOPDistribution(): [any, { [projectId: string]: number }, boolean] {
  const [ loading, setLoading ] = useState(true)
  const [ categoryOP, setCategoryOP ] = useState<any>({})
  const [ distribution, setDistribution ] = useState({})

  const loadCached = useCallback(() => {
    try {
      setLoading(true)

      const lastCached = parseInt(window.localStorage.getItem('RETROLIST_BALLOTS_LAST_CACHED') || '0')

      if (Date.now() - lastCached >= 300 * 1000) {
        return false;
      }
  
      const ballots = JSON.parse(window.localStorage.getItem('RETROLIST_CATEGORY_OP_CACHED') || 'null')

      if (ballots) {
        setCategoryOP(ballots)
        window.localStorage.setItem('RETROLIST_CATEGORY_OP_CACHED', JSON.stringify(ballots))
        window.localStorage.setItem('RETROLIST_CATEGORY_OP_LAST_CACHED', Date.now().toString())
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err)
      return false;
    } finally {
      setLoading(false)
    }
  }, [ setCategoryOP ])

  const refreshBallots = useCallback(async () => {
    try {
      setLoading(true)

      const response = await axios.get('/dataset/rpgf3/categoryOP.json')

      setCategoryOP(response.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [ setCategoryOP ])

  useEffect(() => {
    const result: {[projectId: string]: number} = {}
    for (const key in categoryOP) {
      for (const projectId in categoryOP[key].projects) {
        result[projectId] = categoryOP[key].projects[projectId]
      }
    }
    setDistribution(result)
  }, [categoryOP])

  useEffect(() => {
    if (!loadCached()) {
      refreshBallots()
    }
  }, [])

  return [ categoryOP, distribution, loading ]
}

export function useOPDistribution() {
  return useContext(OPDistributionContext)
}

export function OPDistributionProvider({ children }: { children: ReactNode }) {
  const data = useFetchOPDistribution()

  return (
    <OPDistributionContext.Provider value={data}>
      {children}
    </OPDistributionContext.Provider>
  )
}