import { cloneDeep, max } from "lodash";
import { ListContentView, ListData } from "../types/List";
import { IRubric } from "../types/Rubric";
import { Delegated } from "@ethereum-attestation-service/eas-sdk";
import { Signer } from "ethers";
import { AbiCoder } from "ethers";
import { shadeColor } from "./common";

// const LIST_ATTESTATION_DEADLINE = 1704067200n;
const LIST_ATTESTATION_DEADLINE = 0n;
const LIST_SCHEMA = "0x3e3e2172aebb902cf7aa6e1820809c5b469af139e7a4265442b1c22b97c6b2a5";

const PIE_CHART_BASE_COLOR = '#FF0420';

export function listContentView(data: ListData, sort = false) {
  const result: ListContentView[] = []

  for (const item of data.listContent) {
    const project = data.projectsMetadata.find(x => x.id == item.RPGF3_Application_UID);

    let score = 0;

    for (let criteriaId in (item.evaluation || [])) {
      score += item.evaluation[criteriaId].score
    }
    
    result.push({
      ...item,
      score,
      project,
    })
  }

  if (sort) {
    result.sort((a, b) => b.score - a.score)
  }

  return result
}

export function rubricTotalScore(rubric: IRubric) {
  let score = 0;

  for (let criteria of rubric.criteria) {
    let maxScore = 0;

    for (let score in criteria.scores) {
      if (parseInt(score) > maxScore) {
        maxScore = parseInt(score)
      }
    }

    score += maxScore;
  }

  return score;
}

export function listMetadataPtr(listId: string) {
  return `https://retropgf3.retrolist.app/lists/attestation/${listId}`
}

export async function listAttestSignature(listId: string, listName: string, signer: Signer, refUID = "0x0000000000000000000000000000000000000000000000000000000000000000") {
  const delegate = new Delegated({
    address: "0x4200000000000000000000000000000000000021",
    chainId: BigInt(10),
    version: '1.0.0',
  })

  const address = await signer.getAddress()

  const signature = await delegate.signDelegatedAttestation({
    schema: LIST_SCHEMA,
    recipient: address,
    deadline: LIST_ATTESTATION_DEADLINE,
    expirationTime: 0n,
    revocable: true,
    refUID,
    value: 0n,
    data: AbiCoder.defaultAbiCoder().encode(
      ['string', 'uint256', 'string'],
      [
        listName,
        2,
        listMetadataPtr(listId),
      ],
    )
  }, signer)

  return signature
}

export function listPieChart(data: ListData) {
  const chart: { title: string, value: number, color: string }[] = []
  const listContent = listContentView(data, true)

  let accOp = 0;

  for (let content of listContent) {
    chart.push({
      title: content.project?.displayName || '',
      color: shadeColor(PIE_CHART_BASE_COLOR, (accOp / data.totalOp * 100) - 50),
      value: content.OPAmount,
    })

    accOp += content.OPAmount
  }

  return chart
}
