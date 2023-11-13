import React, { useCallback, useEffect, useState } from "react"
import Layout from "../../components/Layout";
import { Link, useParams } from "react-router-dom";
import { api } from "../../utils/api";
import { ListDto, ListImpactEvaluationType } from "../../types/List";
import { Icon } from "@iconify/react/dist/iconify.js";
import project from "./project";
import { SubmitListView } from "./create/Form/SubmitListForm";

export default function ListPage() {
  const { listId } = useParams()
  const [ list, setList ] = useState<ListDto | null>(null)

  const fetchList = useCallback(async () => {
    const response = await api.get("/lists/" + listId)
    setList(response.data)
  }, [ listId, setList ])

  useEffect(() => {
    fetchList()
  }, [])
  
  if (!list) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="mt-11">
        <Link to="/list" className="text-[#858796] flex gap-1 items-center">
          <Icon icon="lucide:arrow-left" />
          <div>Go back</div>
        </Link>
      </div>

      <div
        style={{
          marginTop: -16,
          marginLeft: -16,
          marginRight: -16,
          marginBottom: 16,
          background: `linear-gradient(198deg, rgba(250,155,110,1) 6%, rgba(248,156,115,1) 10%, rgba(216,211,249,1) 70%, rgba(166,203,246,1) 94%)`,
          backgroundSize: "cover",
          paddingTop: "17.5%",
        }}
        className="rounded-2xl relative"
      ></div>

      <SubmitListView
        state={{
          id: list._id,

          listName: list.listName,
          listDescription: list.listDescription,
        
          impactEvaluationInput: list.impactEvaluationInput,
          impactEvaluationDescription: list.impactEvaluationDescription,
          impactEvaluationLink: list.impactEvaluationLink,
          impactEvaluationType: ListImpactEvaluationType.RUBRIC,
        
          listContent: list.listContent,
          projectsMetadata: list.projectsMetadata,
        
          // walletAddress: "",
          // isBadgeholder: true,
          // attestationUid: "",
          // forkedFrom: "",
        
          rubricId: list.rubricId,
          rubric: list.rubric,
          categories: list.categories,
          totalOp: list.listContent.reduce((acc, x) => acc + x.OPAmount, 0),
        
          histories: [],
        
          createdAt: new Date(list.createdAt),
          updatedAt: new Date(list.updatedAt),
        }}
      >

      </SubmitListView>
    </Layout>
  )
}

export const ListPageRoute = {
  path: "/list/:listId",
  element: <ListPage />,
};