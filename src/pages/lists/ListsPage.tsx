import React, { useCallback, useEffect, useState } from "react"
import Layout from "../../components/Layout";
import { api } from "../../utils/api";
import { ListDto, ListHeader } from "../../types/List";
import { useAccount } from "wagmi";
import useAccountSiwe from "../../hooks/useAccountSiwe";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ProjectListCard } from "../../components/Project/ListsCard";
import LayoutSideInfo from "../../components/LayoutSideInfo";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { shuffle } from "lodash";
import axios from "axios";

export default function ListsPage() {
  const { address, isConnected } = useAccountSiwe()
  const [ lists, setLists ] = useState<ListHeader[] | null>(null)
  const [ myLists, setMyLists ] = useState<ListHeader[] | null>(null)
  const [ retrolistLists, setRetrolistLists ] = useState<ListHeader[] | null>(null)
  const [ agoraLists, setAgoraLists ] = useState<ListHeader[] | null>(null)
  const [ pairwiseLists, setPairwiseLists ] = useState<ListHeader[] | null>(null)
  const [ otherLists, setOtherLists ] = useState<ListHeader[] | null>(null)

  const fetchList = useCallback(async () => {
    const RETROLIST_SECRET = window.localStorage.getItem("RETROLIST_SECRET")

    const response = await axios.get("/dataset/rpgf3/listsHeader.json")
    const lists: ListHeader[] = shuffle(response.data)

    setLists(lists)
    setRetrolistLists(lists.filter(x => x.impactEvaluationType == 'rubric'))
    setAgoraLists(lists.filter(x => x.impactEvaluationType == 'BADGEHOLDER'))
    setPairwiseLists(lists.filter(x => x.impactEvaluationType == 'PAIRWISE'))
    setOtherLists(lists.filter(x => x.impactEvaluationType == 'OTHER'))

    // if (!RETROLIST_SECRET) {
    //   // const response = await api.get("/lists")
    //   const response = await api.get("/lists", {
    //     params: {
    //       status: "attested",
    //     }
    //   })
    //   setLists(shuffle(response.data))
    // } else {
    //   const response = await api.get("/lists", {
    //     params: {
    //       status: "attested",
    //     }
    //   })
    //   setLists(response.data.reverse())
    // }

    // if (address && isConnected) {
    //   const response = await api.get("/lists", {
    //     params: {
    //       status: "attested",
    //       wallet: address,
    //     }
    //   })
    //   setMyLists(response.data)
    // } else {
    //   setMyLists(null)
    // }

    // {
    //   const response = await api.get("/lists/agora")
    //   setAgoraLists(response.data)
    // }
  }, [ setLists, setMyLists, setRetrolistLists, setAgoraLists, setPairwiseLists, setOtherLists, address, isConnected ])

  useEffect(() => {
    fetchList()
  }, [ address, isConnected ])

  return (
    <Layout>
      <LayoutSideInfo>
        <div>
          <div className="mb-5">
            <div className="text-2xl font-bold mb-1">RetroList Lists ({retrolistLists?.length ?? '...'})</div>
            <div className="text-sm text-[#4C4E64AD] border-b border-[#4C4E641F] pb-3">
              Community lists created on RetroList
            </div>
          </div>

          <div className="mb-5">
            {retrolistLists ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {retrolistLists.map(list => (
                  <Link to={"/list/" + list.id}>
                    <ProjectListCard list={list}></ProjectListCard>
                  </Link>
                ))}
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </div>

          <div className="mb-5">
            <div className="text-2xl font-bold mb-1">Badgeholder Lists ({agoraLists?.length ?? '...'})</div>
            <div className="text-sm text-[#4C4E64AD] border-b border-[#4C4E641F] pb-3">
              Lists created by Badgeholders
            </div>
          </div>

          <div className="mb-5">
            {agoraLists ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agoraLists.map(list => (
                  <Link to={"/list/" + list.id}>
                    <ProjectListCard list={list}></ProjectListCard>
                  </Link>
                ))}
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </div>

          <div className="mb-5">
            <div className="text-2xl font-bold mb-1">Pairwise Lists ({pairwiseLists?.length ?? '...'})</div>
            <div className="text-sm text-[#4C4E64AD] border-b border-[#4C4E641F] pb-3">
              Lists created with <a href="https://pairwise.vote" className="underline" target="_blank">Pairwise</a> by non-badgeholders
            </div>
          </div>

          <div className="mb-5">
            {pairwiseLists ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pairwiseLists.map(list => (
                  <Link to={"/list/" + list.id}>
                    <ProjectListCard list={list}></ProjectListCard>
                  </Link>
                ))}
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </div>

          <div className="mb-5">
            <div className="text-2xl font-bold mb-1">Other Lists ({otherLists?.length ?? '...'})</div>
            <div className="text-sm text-[#4C4E64AD] border-b border-[#4C4E641F] pb-3">
              Lists created by non-badgeholder using other tools
            </div>
          </div>

          <div className="mb-5">
            {otherLists ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherLists.map(list => (
                  <Link to={"/list/" + list.id}>
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