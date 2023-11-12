import { useCallback } from "react";
import { usePublicClient } from "wagmi";

export class TransactionReceiptFailedError extends Error {}

export function useTransactionReceiptFn() {
  const publicClient = usePublicClient();

  const getTransactionReceipt = useCallback(async (hash: `0x${string}`) => {
    const receipt = await publicClient.waitForTransactionReceipt({ hash })

    if (receipt.status == "success") {
      return receipt
    } else {
      throw new TransactionReceiptFailedError("Transaction failed! Please try again.")
    }
  }, [ publicClient ])

  return getTransactionReceipt
}