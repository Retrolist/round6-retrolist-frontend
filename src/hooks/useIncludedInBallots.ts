import { useCallback, useEffect, useState } from "react";
import { api } from "../utils/api";

export function useIncludedInBallots(): [{ [projectId: string]: number }, boolean] {
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

      const response = await api.get('/projects/ballots')

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