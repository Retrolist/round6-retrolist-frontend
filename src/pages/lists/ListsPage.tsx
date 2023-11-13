import React, { useCallback, useEffect, useState } from "react"
import Layout from "../../components/Layout";
import { api } from "../../utils/api";
import { ListDto } from "../../types/List";
import { useAccount } from "wagmi";
import useAccountSiwe from "../../hooks/useAccountSiwe";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function ListsPage() {
  const { address, isConnected } = useAccountSiwe()
  const [ lists, setLists ] = useState<ListDto[] | null>(null)
  const [ myLists, setMyLists ] = useState<ListDto[] | null>(null)

  const fetchList = useCallback(async () => {
    {
      const response = await api.get("/lists")
      setLists(response.data)
    }

    if (address && isConnected) {
      const response = await api.get("/lists", {
        params: {
          status: "all",
          wallet: address,
        }
      })
      setMyLists(response.data)
    }
  }, [ setLists, setMyLists ])

  useEffect(() => {
    fetchList()
  }, [ address, isConnected ])
  
  if (!lists || !myLists) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    )
  }

  return (
    <Layout>

    </Layout>
  )
}

export const ListsPageRoute = {
  path: "/list",
  element: <ListsPage />,
};