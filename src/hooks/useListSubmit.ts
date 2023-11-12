import { useCallback, useState } from "react";
import { ListSubmitDto } from "../types/List";
import { api } from "../utils/api";

export function uselistSubmit() {
  const [ listId, setListId ] = useState('')

  const listSubmit = useCallback(async (list: ListSubmitDto) => {
    const response = await api.post('/lists', list)
    const id = response.data._id
    setListId(id)
    return id
  }, [setListId])

  return {
    listId,
    listSubmit,
  }
}