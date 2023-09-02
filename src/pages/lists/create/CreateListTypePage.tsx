import React from "react";
import Layout from "../../../components/Layout";
import { useCreateListReducer } from "../../../stores/CreateListReducer";
import { ListImpactEvaluationType } from "../../../types/List";
import { useNavigate } from "react-router-dom";

export default function CreateListTypePage() {
  const navigate = useNavigate();
  const [state, dispatch] = useCreateListReducer();

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="text-4xl font-bold mb-3">Create List</div>
        <div className="mb-5 text-gray-600">
          Please choose how you want to create list
        </div>

        <div
          className="rounded-xl border border-gray-300 p-5 bg-white shadow mb-4 transition hover:cursor-pointer hover:border-gray-400"
          style={{ width: "100%", maxWidth: 500 }}
          onClick={() => {
            dispatch({
              type: "new",
              impactEvaluationType: ListImpactEvaluationType.CLASSIC,
            })
            navigate('/lists/create/info')
          }}
        >
          <div className="text-xl mb-1 text-gray-800">Classical</div>
          <div className="text-gray-600 text-sm">
            Assign OP amount to each project manually
          </div>
        </div>

        <div
          className="rounded-xl border border-gray-300 p-5 bg-white shadow mb-4 transition hover:cursor-pointer hover:border-gray-400"
          style={{ width: "100%", maxWidth: 500 }}
          onClick={() => {
            dispatch({
              type: "new",
              impactEvaluationType: ListImpactEvaluationType.RUBRIC,
            })
            navigate('/lists/create/info')
          }}
        >
          <div className="text-xl mb-1 text-gray-800">Rubric-based</div>
          <div className="text-gray-600 text-sm">
            Score each project based on a rubric. OP amount is assigned
            automatically based on final score.
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const CreateListTypePageRoute = {
  path: "/lists/create",
  element: <CreateListTypePage />,
};
