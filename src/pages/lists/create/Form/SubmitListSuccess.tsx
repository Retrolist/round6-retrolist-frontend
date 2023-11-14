import React from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Link } from "react-router-dom"
import { useCreateListReducer } from "../../../../stores/CreateListReducer"
import PrimaryButton from "../../../../components/buttons/PrimaryButton"

export const SubmitListSuccess = () => {
  const [ state, dispatch ] = useCreateListReducer()

  return (
    <div className="p-6 bg-white rounded-lg border border-[#EAECF0]">
      <div className="flex flex-col items-center">
        <div className="text-lg text-center">
          Your list has been published on-chain!
        </div>

        <div className="mt-3">
          <Link to={"/list/" + state.id}>
            <PrimaryButton>View your list</PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  )
}

export const SubmitListSuccessRoute = {
  path: "/lists/create/success",
  element: <SubmitListSuccess />,
};
