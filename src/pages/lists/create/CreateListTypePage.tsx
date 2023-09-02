import React from "react"
import Layout from "../../../components/Layout"

export default function CreateListTypePage() {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="text-4xl font-bold mb-3">Create List</div>
        <div className="mb-5 text-gray-600">Please choose how you want to create list</div>

        <div className="rounded-xl border border-gray-300 p-5 bg-white shadow mb-4 transition hover:cursor-pointer hover:border-gray-400" style={{ width: 480, maxWidth: "100%" }}>
          <div className="text-xl mb-1 text-gray-800">Classical</div>
          <div className="text-gray-600 text-sm">Assign OP amount to each project manually</div>
        </div>

        <div className="rounded-xl border border-gray-300 p-5 bg-white shadow mb-4 transition hover:cursor-pointer hover:border-gray-400" style={{ width: 480, maxWidth: "100%" }}>
          <div className="text-xl mb-1 text-gray-800">Rubric-based</div>
          <div className="text-gray-600 text-sm">Score each project based on a rubric. OP amount is assigned automatically based on final score.</div>
        </div>
      </div>
    </Layout>
  )
}

export const CreateListTypePageRoute =   {
  path: "/lists/create",
  element: <CreateListTypePage />,
}