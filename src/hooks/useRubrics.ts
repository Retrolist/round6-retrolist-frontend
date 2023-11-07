import { useCallback, useEffect, useState } from "react";
import { IRubric } from "../types/List";
import { api } from "../utils/api";

export function useRubrics() {
  const [ rubrics, setRubrics ] = useState<IRubric[]>([])

  const fetchRubrics = useCallback(async () => {
    const response = await api.get('/rubrics');
    setRubrics(response.data)
  }, [])

  useEffect(() => {
    fetchRubrics()
  }, [])

  return rubrics
}