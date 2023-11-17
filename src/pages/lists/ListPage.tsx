import React, { useCallback, useEffect, useState } from "react"
import Layout from "../../components/Layout";
import { Link, useParams } from "react-router-dom";
import { api } from "../../utils/api";
import { ListDto, ListImpactEvaluationType } from "../../types/List";
import { Icon } from "@iconify/react/dist/iconify.js";
import project from "./project";
import { SubmitListView } from "./create/Form/SubmitListForm";
import { getBadgeholderAttestationUid, listAttestSignature } from "../../utils/list";
import useAccountSiwe from "../../hooks/useAccountSiwe";
import { Alert, message } from "antd";
import { useContractWrite } from "wagmi";
import RetrolistAttesterABI from "../../abis/RetrolistAttester.json";
import { useEthersSigner } from "../../utils/wagmi-ethers";
import { buildSignatureHex } from "../../utils/common";
import { useTransactionReceiptFn } from "../../hooks/useTransactionReceiptFn";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function ListPage() {
  const { address, isConnected } = useAccountSiwe()
  const { listId } = useParams()
  const [ list, setList ] = useState<ListDto | null>(null)
  const [ attesting, setAttesting ] = useState(false)

  const signer = useEthersSigner()
  const getTransactionReceipt = useTransactionReceiptFn()

  const badgeholderAttestationUid = address ? getBadgeholderAttestationUid(address) : undefined

  const fetchList = useCallback(async () => {
    const response = await api.get("/lists/" + listId)
    setList(response.data)
  }, [ listId, setList ])

  useEffect(() => {
    fetchList()
  }, [])

  const { writeAsync: badgeholderApprove } = useContractWrite({
    address: import.meta.env.VITE_ATTESTER_CONTRACT!,
    abi: RetrolistAttesterABI,
    functionName: 'badgeholderApprove',
  })

  const badgeholderApproveFn = useCallback(async () => {
    try {
      setAttesting(true)

      if (!list) {
        message.error("Loading...")
        return
      }
  
      if (!address || !signer) {
        message.error("Please connect your wallet")
        return
      }
  
      const badgeholderAttestationUid = getBadgeholderAttestationUid(address)
  
      if (!badgeholderAttestationUid) {
        message.error("Not a badgeholder")
        return
      }
  
      const rawSignature = await listAttestSignature(list._id, list.listName, signer, list.attestationUid)
  
      const tx = await badgeholderApprove({
        args: [
          list.attestationUid,
          badgeholderAttestationUid,
          buildSignatureHex(rawSignature.signature),
        ],
      })

      await getTransactionReceipt(tx.hash)

      message.success("List Approved! Thank you.")

      fetchList()
    } catch(err: any) {
      console.error(err)
      message.error(err.shortMessage || err.message || 'List signing failed!')
    } finally {
      setAttesting(false)
    }
  }, [ list, address, signer, setAttesting, getTransactionReceipt, badgeholderApprove ])
  
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
          marginLeft: -16,
          marginRight: -16,
          marginTop: 16,
          background: `linear-gradient(198deg, rgba(250,155,110,1) 6%, rgba(248,156,115,1) 10%, rgba(216,211,249,1) 70%, rgba(166,203,246,1) 94%)`,
          backgroundSize: "cover",
          paddingTop: "17.5%",
          minHeight: 100
        }}
        className="rounded-2xl relative"
      ></div>

      <div className="flex -space-x-2 mb-4 -mt-8 overflow-hidden relative z-10">
        {list.projectsMetadata.slice(0, 4).map(project => (
          <img
            className="inline-block h-16 w-16 rounded-full ring-2 ring-white"
            src={project.profileImageUrl || "/img/project-placeholder.svg"}
            alt=""
          />
        ))}
      </div>

      <div>
        <div className="mb-4">
          <div className="text-2xl font-bold">{list.listName}</div>
          <div className="text-[#858796] text-sm">By {list.domainName}</div>
        </div>

        {!address || !isConnected || badgeholderAttestationUid && (
          <div className="mb-4">
            <Alert
              message="For Badgeholders"
              description={
                (
                  address && isConnected ? (
                    <div>
                      <div className="mb-2">Please approve this list if you want to include it in your ballot</div>
                      <div>
                        <PrimaryButton
                          onClick={() => badgeholderApproveFn()}
                          disabled={attesting}
                        >
                          {attesting ? 'Processing...' : 'Approve'}
                        </PrimaryButton>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-2">Please connect your wallet to approve this list</div>
                      <div>
                        <ConnectButton></ConnectButton>
                      </div>
                    </div>
                  )
                )
              }
              type="info"
            />
          </div>
        )}

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
        ></SubmitListView>
      </div>
    </Layout>
  )
}

export const ListPageRoute = {
  path: "/list/:listId",
  element: <ListPage />,
};