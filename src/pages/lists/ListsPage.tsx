import React, { useCallback, useEffect, useState } from "react"
import Layout from "../../components/Layout";
import { api } from "../../utils/api";
import { ListDto } from "../../types/List";
import { useAccount } from "wagmi";
import useAccountSiwe from "../../hooks/useAccountSiwe";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ProjectListCard } from "../../components/Project/ListsCard";
import LayoutSideInfo from "../../components/LayoutSideInfo";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function ListsPage() {
  const { address, isConnected } = useAccountSiwe()
  const [ lists, setLists ] = useState<ListDto[] | null>(null)
  const [ myLists, setMyLists ] = useState<ListDto[] | null>(null)

  const fetchList = useCallback(async () => {
    const RETROLIST_SECRET = window.localStorage.getItem("RETROLIST_SECRET")

    if (!RETROLIST_SECRET) {
      const response = await api.get("/lists")
      setLists(response.data)
    } else {
      const response = await api.get("/lists", {
        params: {
          status: "attested",
        }
      })
      setLists(response.data)
    }

    if (address && isConnected) {
      const response = await api.get("/lists", {
        params: {
          status: "attested",
          wallet: address,
        }
      })
      setMyLists(response.data)
    } else {
      setMyLists(null)
    }
  }, [ setLists, setMyLists, address, isConnected ])

  useEffect(() => {
    fetchList()
  }, [ address, isConnected ])

  return (
    <Layout>
      <LayoutSideInfo>
        <div>
          <div className="mb-5">
            <div className="text-2xl font-bold mb-1">My Lists</div>
            {/* <div className="text-sm text-[#4C4E64AD] border-b border-[#4C4E641F] pb-3">
              Categorize projects and share impact evaluation
            </div> */}
          </div>

          <div className="mb-8">
            {myLists ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myLists.map(list => (
                  <Link to={"/list/" + list._id}>
                    <ProjectListCard list={list}></ProjectListCard>
                  </Link>
                ))}
              </div>
            ) : ( address && isConnected ? (
              <div>Loading...</div>
            ) : (
              <div>
                <div className="mb-2">Connect wallet to view your lists</div>
                <ConnectButton />
              </div>
            ))}
          </div>

          <div className="mb-5">
            <div className="text-2xl font-bold mb-1">Lists</div>
            {/* <div className="text-sm text-[#4C4E64AD] border-b border-[#4C4E641F] pb-3">
              Categorize projects and share impact evaluation
            </div> */}
          </div>

          <div className="mb-5">
            {lists ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lists.map(list => (
                  <Link to={"/list/" + list._id}>
                    <ProjectListCard list={list}></ProjectListCard>
                  </Link>
                ))}
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </LayoutSideInfo>
    </Layout>
  )
}

export const ListsPageRoute = {
  path: "/list",
  element: <ListsPage />,
};