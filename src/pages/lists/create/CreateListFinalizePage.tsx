import { Form, Input, Select } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateListReducer } from "../../../stores/CreateListReducer";
import { useForm } from "antd/es/form/Form";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import SecondaryButton from "../../../components/buttons/SecondaryButton";
import { v4 as uuid } from "uuid";
import Layout from "../../../components/Layout";
import { ListImpactEvaluationType } from "../../../types/List";

export default function CreateListFinalizePage() {
  const navigate = useNavigate();
  const [form] = useForm();
  const [state, dispatch] = useCreateListReducer();

  useEffect(() => {
    dispatch({
      type: "finalize",
      totalOP: 30000000,
    })
  }, [])

  console.log(state)

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="text-4xl font-bold mb-3">Create List</div>
        <div className="mb-5 text-gray-600">
          Please confirm list info and impact evaluation
        </div>

        <div style={{ width: "100%", maxWidth: 500 }}>
          <div className="mb-3">
            <b>List Name:</b> {state.listName}
          </div>
        
          <div className="mb-3">
            <div><b>List Description:</b></div>
            <div>
              <pre>{state.listDescription}</pre>
            </div>
          </div>

          <div className="mb-3">
            <div><b>Impact Evaluation Description:</b></div>
            <div>
              <pre>{state.impactEvaluationDescription}</pre>
            </div>
          </div>

          <div className="mb-5">
            <b>Impact Evaluation Link:</b> {state.impactEvaluationLink}
          </div>

          <div className="text-xl font-bold mb-4">Projects</div>

          {state.impactEvaluationType == ListImpactEvaluationType.RUBRIC && (
            <div className="text-xl text-red-700 mb-4">(Specify total OP here for rubric based list creation)</div>
          )}

          {state.listContent.map(project => (
            <div className={state.impactEvaluationType == ListImpactEvaluationType.RUBRIC ? "mb-5" : ""}>
              <div className="flex justify-between mb-3">
                <div className="flex items-center">
                  <div
                    className="rounded-full bg-gray-300 mr-2"
                    style={{ width: 28, height: 28 }}
                  ></div>
                  <div className="text-lg">
                    {project.RPGF3_Application_UID}
                  </div>
                </div>

                <div className="flex items-center">
                  {project.OPAmount.toLocaleString("en-US")} OP
                </div>
              </div>

              {state.impactEvaluationType == ListImpactEvaluationType.RUBRIC && (
                <div>
                  {/* {project.comment && <div className="mb-1">Comment: {project.comment}</div>} */}

                  {/* <ul>
                    {Object.entries(project.evaluation).map(([rubricId, score]) => {
                      const rubric = state.rubrics.find(x => x.id == rubricId)
                      const scoreLabel = rubric?.scores[score]

                      return (
                        <li>{rubric?.title}: {score} - {scoreLabel}</li>
                      )
                    })}
                  </ul> */}
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-between">
            <Link to={state.impactEvaluationType == ListImpactEvaluationType.RUBRIC ? "/lists/create/rubric-scoring" : "/lists/create/classic-scoring"}>
              <SecondaryButton type="button">Back</SecondaryButton>
            </Link>

            <PrimaryButton>Submit</PrimaryButton>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const CreateListFinalizePageRoute = {
  path: "/lists/create/finalize",
  element: <CreateListFinalizePage />,
};
