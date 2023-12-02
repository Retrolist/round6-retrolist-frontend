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
import { Alert, Tooltip, message } from "antd";
import { useContractWrite } from "wagmi";
import RetrolistAttesterABI from "../../abis/RetrolistAttester.json";
import { useEthersSigner } from "../../utils/wagmi-ethers";
import { buildSignatureHex } from "../../utils/common";
import { useTransactionReceiptFn } from "../../hooks/useTransactionReceiptFn";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CheckCircleOutlined } from "@ant-design/icons"
import ListStatusBadge from "../../components/Project/ListStatusBadge";
import SecondaryButton from "../../components/buttons/SecondaryButton";

export default function ListPage() {
  const { address, isConnected } = useAccountSiwe()
  const { listId } = useParams()
  const [ list, setList ] = useState<ListDto | null>(null)
  const [ attesting, setAttesting ] = useState(false)

  const isAgora = listId?.startsWith('0x')
  const signer = useEthersSigner()
  const getTransactionReceipt = useTransactionReceiptFn()

  const badgeholderAttestationUid = address ? getBadgeholderAttestationUid(address) : undefined

  const RETROLIST_SECRET = window.localStorage.getItem("RETROLIST_SECRET")

  const fetchList = useCallback(async () => {
    const response = await api.get("/lists/" + listId)
    setList(response.data)
  }, [ listId, setList ])

  useEffect(() => {
    fetchList()
  }, [])

  const qualifyAction = useCallback(async (action: string) => {
    if (list) {
      await api.post('/approval/' + action, {
        domainName: list.domainName,
      }, {
        headers: {
          "retrolist-secret": RETROLIST_SECRET,
        }
      })

      fetchList()

      message.success(action + " success!")
    }
  }, [fetchList, list])

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
      >
        <div className="absolute top-3 left-3">
          <ListStatusBadge status={list.status} size={"sm"} />
        </div>
      </div>

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
            {!isAgora && <>
              <div className="text-[#858796] text-sm mb-3">By {list.domainName}</div>

              <div className="flex gap-2 items-center">
                <Tooltip title={list.twitter}>
                  <a href={"https://twitter.com/" + list.twitter} target="_blank" className="transition hover:cursor-pointer hover:scale-110">
                    <img className="rounded-full w-8 h-8" src={"/img/social/twitter.png"}></img>
                  </a>
                </Tooltip>

                <Tooltip title={list.discord}>
                  <a href={"https://discord.com"} target="_blank" className="transition hover:cursor-pointer hover:scale-110">
                    <img className="rounded-full w-8 h-8" src={"/img/social/discord.png"}></img>
                  </a>
                </Tooltip>

                <div className="text-sm text-green-700 ml-2">
                  <CheckCircleOutlined /> Social verified by Opti.domains
                </div>
              </div>
            </>}
          </div>
        

        {!isAgora && list.status != "approved" && (
          <>
            {(!address || !isConnected || badgeholderAttestationUid) && (
              <div className="mb-4">
                <Alert
                  message={address && isConnected ? "For Badgeholders" : "Are you a badgeholder?"}
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
                          <div className="mb-2">If you are a badgeholder, connect your wallet to approve this list</div>
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

            {(address && isConnected && !badgeholderAttestationUid) && (
              <div className="mb-4">
                <Alert
                  message="You are not a badgeholder"
                  description="If you know a badgeholder, please help by forwarding this list to them for approval."
                  type="warning"
                ></Alert>
              </div>
            )}
          </>
        )}

        {!isAgora && RETROLIST_SECRET && (
          <div className="flex gap-3 mb-4">
            <PrimaryButton onClick={() => qualifyAction('qualify')}>Qualify</PrimaryButton>
            <SecondaryButton onClick={() => qualifyAction('unqualify')}>Reset</SecondaryButton>
            <PrimaryButton onClick={() => qualifyAction('ban')}>BAN</PrimaryButton>
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