import { useCallback, useEffect, useState } from "react";
import { api } from "../utils/api";
import { IRubric } from "../types/Rubric";

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