import { useCallback, useState } from "react";
import { ListSubmitDto } from "../types/List";
import { uselistSubmit } from "./useListSubmit";
import { useOptidomainsRegister } from "./useOptidomainsRegister";
import { useAccount, useContractRead, useContractWrite, useNetwork } from "wagmi";
import { listAttestSignature, listMetadataPtr } from "../utils/list";
import { buildSignatureHex } from "../utils/common";
import { useEthersSigner } from "../utils/wagmi-ethers";
import { namehash } from "viem";
import { useTransactionReceiptFn } from "./useTransactionReceiptFn";
import { ethers } from "ethers";

import RetrolistAttesterABI from "../abis/RetrolistAttester.json";
import ENSRegistryABI from "../abis/ENSRegistry.json";
import axios from "axios";

// Note: Use list attest combine list submission and optidomains registration together
export function useListAttest() {
  const { address } = useAccount()
  const { chain } = useNetwork()

  const {
    domainName,
    twitter,
    discord,
    performSocialLogin,
    isExistingDomainName,
  } = useOptidomainsRegister()

  const {
    listId,
    listSubmit,
  } = uselistSubmit()

  const getTransactionReceipt = useTransactionReceiptFn()

  const signer = useEthersSigner()

  const [signature, setSignature] = useState("");
  const [listName, setListName] = useState("");
  const [loading, setLoading] = useState(false)
  const [isTakeover, setIsTakeover] = useState(false);

  const { writeAsync: attest } = useContractWrite({
    address: import.meta.env.VITE_ATTESTER_CONTRACT!,
    abi: RetrolistAttesterABI,
    functionName: 'attest',
  })

  const { writeAsync: registerAndAttest } = useContractWrite({
    address: import.meta.env.VITE_ATTESTER_CONTRACT!,
    abi: RetrolistAttesterABI,
    functionName: 'registerAndAttest',
  })

  useContractRead({
    address: "0x888811b3DFC94566Fc8F6aC5e86069981a50B490",
    abi: ENSRegistryABI,
    functionName: 'owner',
    args: [
      namehash(domainName || ''),
    ],
    onSuccess(data: string) {
      if (domainName) {
        if (!data || data == '0x0000000000000000000000000000000000000000') {
          setIsTakeover(false)
        } else {
          setIsTakeover(true)
        }
        console.log(data, isTakeover)
      }
    },
  })

  const listSign = useCallback(async (list: ListSubmitDto) => {
    try {
      setLoading(true)

      if (domainName && twitter && discord) {
        const id = await listSubmit(list)
        
        if (signer) {
          const rawSignature = await listAttestSignature(id, list.listName, signer)
          setSignature(buildSignatureHex(rawSignature.signature))
          setListName(list.listName)
        } else {
          throw new Error("Please connect your wallet")
        }
  
        return id;
      } else {
        throw new Error("Missing domain")
      }
    } finally {
      setLoading(false)
    }
  }, [
    domainName,
    twitter,
    discord,
    signer,

    listSubmit,
    setSignature,
    setListName,
  ])

  const listAttest = useCallback(async () => {
    try {
      setLoading(true)

      if (!address) {
        throw new Error("Please connect your wallet");
      }

      if (domainName && twitter && discord) {
        const node = namehash(domainName)

        if (signature) {
          if (isExistingDomainName) {
            const tx = await attest({
              args: [
                node,
                2,
                listName,
                listMetadataPtr(listId),
                signature,
              ],
            })

            return await getTransactionReceipt(tx.hash)
          } else {
            const resolverData = []

            {
              // Twitter attestation
              const abi = ["function setTextWithRef(bytes32,bytes32,string,string)"]
              const contractInterface = new ethers.Interface(abi);
              const functionData = contractInterface.encodeFunctionData(
                'setTextWithRef',
                [
                  node,
                  process.env.VITE_SOCIAL_REF_ID,
                  'com.twitter',
                  twitter,
                ],
              );
              resolverData.push(functionData)
            }

            {
              // Discord attestation
              const abi = ["function setTextWithRef(bytes32,bytes32,string,string)"]
              const contractInterface = new ethers.Interface(abi);
              const functionData = contractInterface.encodeFunctionData(
                'setTextWithRef',
                [
                  node,
                  process.env.VITE_SOCIAL_REF_ID,
                  'com.discord',
                  discord,
                ],
              );
              resolverData.push(functionData)
            }

            {
              // Wallet attestation
              const abi = ["function setAddr(bytes32,address)"]
              const contractInterface = new ethers.Interface(abi);
              const functionData = contractInterface.encodeFunctionData(
                'setAddr',
                [
                  node,
                  address,
                ],
              );
              resolverData.push(functionData)
            }

            const secret = new Uint8Array(32);
            window.crypto.getRandomValues(secret);

            const args: any = {
              controllerAddress: "0xB02EDc247246ACD78294c62F403B3e64D5917031",
              chainId: chain?.id,
      
              name,
              owner: address,
              secret: '0x' + Buffer.from(secret).toString("hex"),
              resolver: "0x888811Da0c852089cc8DFE6f3bAd190a46acaAE6",
              data: resolverData,
              reverseRecord: true,
              ownerControlledFuses: 0,
      
              isTakeover,
              campaign: 'retrolist',
            }

            const oracleResponse = await axios.post(import.meta.env.VITE_SOCIAL_ORACLE_ENDPOINT + '/whitelist-registrar/register', args, {
              withCredentials: true,
            })

            const tx = await registerAndAttest({
              args: [
                domainName.split('.')[0],
                address,
                '0x' + Buffer.from(secret).toString("hex"),
                resolverData,
                oracleResponse.data.signature,

                node,
                2,
                listName,
                listMetadataPtr(listId),
                signature,
              ]
            })

            return await getTransactionReceipt(tx.hash)
          }
        } else {
          throw new Error("Attestation is not signed")
        }
      } else {
        throw new Error("Missing domain")
      }
    } finally {
      setLoading(false)
    }
  }, [
    signature,
    domainName,
    twitter,
    discord,
    isExistingDomainName,
    listId,
    listName,
    address,
  ])

  return {
    listSign,
    listAttest,

    signature,

    listId,
    listSubmit,

    domainName,
    twitter,
    discord,
    performSocialLogin,
    isExistingDomainName,

    loading,
  }
}