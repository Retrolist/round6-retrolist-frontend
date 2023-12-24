import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { api } from "../utils/api";
import React from "react";
import axios from "axios";

const IncludedInBallotsContext = React.createContext<[{[projectId: string]: number}, boolean]>([{}, false])

function useFetchIncludedInBallots(): [{ [projectId: string]: number }, boolean] {
  const [ loading, setLoading ] = useState(true)
  const [ includedInBallots, setIncludedInBallots ] = useState({})

  const loadCached = useCallback(() => {
    try {
      setLoading(true)

      const lastCached = parseInt(window.localStorage.getItem('RETROLIST_BALLOTS_LAST_CACHED') || '0')

      if (Date.now() - lastCached >= 300 * 1000) {
        return false;
      }
  
      const ballots = JSON.parse(window.localStorage.getItem('RETROLIST_BALLOTS_CACHED') || 'null')

      if (ballots) {
        setIncludedInBallots(ballots)
        window.localStorage.setItem('RETROLIST_BALLOTS_CACHED', JSON.stringify(ballots))
        window.localStorage.setItem('RETROLIST_BALLOTS_LAST_CACHED', Date.now().toString())
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
  }, [ setIncludedInBallots ])

  const refreshBallots = useCallback(async () => {
    try {
      setLoading(true)

      const response = await axios.get('/dataset/rpgf3/ballots.json')

      setIncludedInBallots(response.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [ setIncludedInBallots ])

  useEffect(() => {
    if (!loadCached()) {
      refreshBallots()
    }
  }, [])

  return [ includedInBallots, loading ]
}

export function useIncludedInBallots() {
  return useContext(IncludedInBallotsContext)
}

export function IncludedInBallotsProvider({ children }: { children: ReactNode }) {
  const data = useFetchIncludedInBallots()

  return (
    <IncludedInBallotsContext.Provider value={data}>
      {children}
    </IncludedInBallotsContext.Provider>
  )
}