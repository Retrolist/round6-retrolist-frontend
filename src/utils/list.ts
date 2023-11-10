import { cloneDeep, max } from "lodash";
import { ListContentView, ListData } from "../types/List";
import { IRubric } from "../types/Rubric";
import { Delegated } from "@ethereum-attestation-service/eas-sdk";
import { Signer } from "ethers";
import { AbiCoder } from "ethers";

const LIST_ATTESTATION_DEADLINE = 1704067200n;
const LIST_SCHEMA = "0x3e3e2172aebb902cf7aa6e1820809c5b469af139e7a4265442b1c22b97c6b2a5";

export function listContentView(data: ListData) {
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
        `https://retropgf3.retrolist.app/lists/attestation/${listId}`
      ],
    )
  }, signer)

  return signature
}
