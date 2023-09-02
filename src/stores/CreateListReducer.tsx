import { useReducer } from "react";
import {
  ListContent,
  ListContentWithRubrics,
  ListData,
  ListImpactEvaluationType,
  ListMetadata,
  ListRubric,
} from "../types/List";
import { cloneDeep } from "lodash";

type ListReducerAction =
  | { type: "new"; impactEvaluationType: string }
  | { type: "load"; list: ListData }
  | { type: "fork"; list: ListData }
  | { type: "updateMetadata"; metadata: ListMetadata }
  | { type: "updateProjects"; projectUids: string[] }
  | { type: "updateOPAmount"; listContent: ListContent[] }
  | { type: "updateRubrics"; rubrics: ListRubric[] }
  | { type: "updateRubricEvaluation"; listContent: ListContentWithRubrics[] }
  | { type: "finalize"; }

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
  attestationUid: "",
  forkedFrom: "",

  rubrics: [],
  histories: [],

  createdAt: new Date(),
  updatedAt: new Date(),
};

const reducer = (state: ListData, action: ListReducerAction) => {
  switch (action.type) {
    case "new":
      return {
        ...cloneDeep(initialList),
        impactEvaluationType: action.impactEvaluationType,
      };

    case "load":
      return {
        ...cloneDeep(action.list),
      }

    case "fork":
      return {
        ...cloneDeep(action.list),
        id: "",
        forkedFrom: action.list.id,
      };

    case "updateMetadata":
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

    case "updateProjects":
      const projects = [...state.listContent]
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

    

    default:
      return state;
  }
};
