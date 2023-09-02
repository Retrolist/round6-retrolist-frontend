import React, { ReactNode, useContext, useReducer } from "react";
import {
  ListContent,
  ListContentView,
  ListContentWithRubrics,
  ListData,
  ListImpactEvaluationType,
  ListMetadata,
  ListRubric,
} from "../types/List";
import { cloneDeep, omit } from "lodash";
import { Outlet } from "react-router-dom";

type ListReducerAction =
  | { type: "new"; impactEvaluationType: ListImpactEvaluationType }
  | { type: "load"; list: ListData }
  | { type: "fork"; list: ListData }
  | { type: "updateMetadata"; metadata: ListMetadata }
  | { type: "updateProjects"; projectUids: string[] }
  | { type: "updateOPAmount"; listContent: ListContent[] }
  | { type: "updateRubrics"; rubrics: ListRubric[] }
  | { type: "updateRubricEvaluation"; listContent: Partial<ListContentWithRubrics>[] }
  | { type: "finalize"; totalOP: number }

const initialList: ListData = {
  id: "",

  listName: "",
  listDescription: "",

  impactEvaluationInput: "",
  impactEvaluationDescription: "",
  impactEvaluationLink: "",
  impactEvaluationType: ListImpactEvaluationType.UNKNOWN,

  listContent: [],

  walletAddress: "",
  isBadgeholder: true,
  attestationUid: "",
  forkedFrom: "",

  rubrics: [],
  histories: [],

  createdAt: new Date(),
  updatedAt: new Date(),
};

const reducer = (state: ListData, action: ListReducerAction): ListData => {
  switch (action.type) {
    case "new": {
      return {
        ...cloneDeep(initialList),
        impactEvaluationType: action.impactEvaluationType,
      };
    }

    case "load": {
      return {
        ...cloneDeep(initialList),
        ...cloneDeep(action.list),
      }
    }

    case "fork": {
      return {
        ...cloneDeep(initialList),
        ...cloneDeep(action.list),
        id: "",
        forkedFrom: action.list.id,
      };
    }

    case "updateMetadata": {
      if (state.impactEvaluationType == ListImpactEvaluationType.CLASSIC) {
        return {
          ...state,
          listName: action.metadata.listName,
          listDescription: action.metadata.listDescription,
          impactEvaluationInput: action.metadata.impactEvaluationInput,
          impactEvaluationLink: action.metadata.impactEvaluationLink,
        }
      } else {
        return {
          ...state,
          listName: action.metadata.listName,
          listDescription: action.metadata.listDescription,
        }
      }
    }

    case "updateProjects": {
      const projects = cloneDeep(state.listContent)
      for (const uid of action.projectUids) {
        if (!projects.find(x => x.RPGF3_Application_UID == uid)) {
          projects.push({
            RPGF3_Application_UID: uid,
            OPAmount: 0,
            comment: "",
            evaluation: {},
          })
        }
      }

      return {
        ...state,
        listContent: projects,
      }
    }

    case "updateOPAmount": {
      const projects = cloneDeep(state.listContent)
      for (const item of action.listContent) {
        const project = projects.find(x => x.RPGF3_Application_UID == item.RPGF3_Application_UID);
        if (project) {
          project.OPAmount = item.OPAmount
        }
      }

      return {
        ...state,
        listContent: projects,
      }
    }

    case "updateRubrics": {
      return {
        ...state,
        rubrics: cloneDeep(action.rubrics),
      }
    }

    case "updateRubricEvaluation": {
      const projects = cloneDeep(state.listContent)
      for (const item of action.listContent) {
        const project = projects.find(x => x.RPGF3_Application_UID == item.RPGF3_Application_UID);
        if (project && item.evaluation) {
          project.comment = item.comment || ""
          project.evaluation = item.evaluation;
        }
      }

      return {
        ...state,
        listContent: projects,
      }
    }

    case "finalize": {
      const newState = cloneDeep(state)

      switch (newState.impactEvaluationType) {
        case ListImpactEvaluationType.CLASSIC: {
          newState.impactEvaluationDescription = newState.impactEvaluationInput;
          break;
        }

        case ListImpactEvaluationType.RUBRIC: {
          const projects: ListContentView[] = []

          let totalScore = 0;

          for (const project of newState.listContent) {
            let score = 0;
            for (const rubricId in project.evaluation) {
              score += project.evaluation[rubricId]
            }

            totalScore += score;

            projects.push({
              ...project,
              score,
            })
          }

          if (totalScore > 0) {
            for (const project of projects) {
              project.OPAmount = project.score / totalScore * action.totalOP
            }
          }

          // Remove score from projects to reduce redundancy
          newState.listContent = projects.map(project => omit(project, ['score']))

          // Generate impact description
          let description = "Impact evaluation rubrics:\n\n"

          for (const rubric of newState.rubrics) {
            description += `${rubric.title}\n`
            for (const score in rubric.scores) {
              description += `* ${score} - ${rubric.scores[score]}\n`
            }
            description += '\n'
          }

          newState.impactEvaluationDescription = (`${newState.impactEvaluationInput}\n\n${description}`).trim()
          newState.impactEvaluationLink = "https://retrolist.opti.domains/lists/..."

          break;
        }
      }

      

      return newState
    }

    default:
      return state;
  }
};

export const CreateListReducerContext = React.createContext<[ListData, React.Dispatch<ListReducerAction>]>([] as any);

export function useCreateListReducer() {
  return useContext(CreateListReducerContext);
}

export function CreateListReducerProvider({ children }: { children: ReactNode }) {
  const hook = useReducer(reducer, initialList)

  return (
    <CreateListReducerContext.Provider value={hook}>
      {children}
    </CreateListReducerContext.Provider>
  )
}

export function CreateListReducerRouteWrapper() {
  return (
    <CreateListReducerProvider>
      <Outlet />
    </CreateListReducerProvider>
  )
}
