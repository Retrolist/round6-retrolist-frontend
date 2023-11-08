import { cloneDeep, max } from "lodash";
import { ListContentView, ListData } from "../types/List";
import { IRubric } from "../types/Rubric";

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
