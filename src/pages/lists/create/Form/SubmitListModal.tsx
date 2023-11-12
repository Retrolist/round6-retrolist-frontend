import { Button, Divider, Form, Input, Modal, Progress, Radio, message } from "antd";
import { useCreateListReducer } from "../../../../stores/CreateListReducer";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { ICriteria } from "../../../../types/Rubric";
import { CommentAndScore } from "../../../../types/List";
import PrimaryButton from "../../../../components/buttons/PrimaryButton";
import { useListAttest } from "../../../../hooks/useListAttest";
import { CheckCircleTwoTone, CheckCircleFilled } from '@ant-design/icons';

interface SubmitListModalProps {
  isModalOpen: boolean;
  handleClose: () => void;
}

function CircleWithNumber({ children, checked }: { children: ReactNode, checked: boolean }) {
  if (checked) {
    return (
      <CheckCircleFilled style={{ fontSize: 24, color: "#27AE60" }} className="mr-2" />
    )
  }

  return (
    <div className="rounded-full bg-optimism text-white font-bold mr-2 pb-0.5 flex items-center justify-center" style={{ width: 24, height: 24 }}>
      {children}
    </div>
  )
}

function DividerDarker({ dashed = false }) {
  return (
    <Divider className="border-gray-300 my-2" dashed={dashed} />
  )
}

const BOX_CLASSNAME = "mt-3 bg-gray-100 rounded-xl p-3 border border-gray-300"
const BOX_CHECKED_CLASSNAME = "mt-3 bg-green-100 rounded-xl p-3 border border-2 border-green-500"

export const SubmitListModal = ({
  isModalOpen,
  handleClose,
}: SubmitListModalProps) => {
  const [state, dispatch] = useCreateListReducer();

  const {
    listSign,
    listAttest,

    signature,

    listId,
    listSubmit,

    domainName,
    twitter,
    discord,
    performSocialLogin,
    isExistingDomainName,

    loading,
  } = useListAttest();

  const passed1 = Boolean(domainName) && Boolean(twitter) && Boolean(discord);
  const passed2 = Boolean(signature);

  return (
    <Modal
      open={isModalOpen}
      footer={<></>}
      bodyStyle={{ padding: 0 }}
      className="relative"
      onCancel={handleClose}
    >
      <h2 className="text-2xl">Submit your list</h2>

      <p className="text-[#858796] mt-1">
        Follow these steps to submit your list
      </p>

      <div className={passed1 ? BOX_CHECKED_CLASSNAME : BOX_CLASSNAME}>
        <div className="flex items-center mb-1">
          <CircleWithNumber checked={passed1}>1</CircleWithNumber>
          <div className="text-[#272930] font-bold">Verify your profile</div>
        </div>

        <div>
          <div className="text-[#858796] text-xs">
            Connect your social profiles to verify authencity
          </div>
        </div>

        <DividerDarker />

        <div className="flex justify-between items-center">
          <div className="truncate">
            <div className="flex">
              <div className="text-[#272930] font-bold">Verify X / Twitter</div>
            </div>
            {twitter ? (
              <div className="text-sm truncate">
                <span className="text-[#858796]">Linked as:</span> {twitter}
              </div>
            ) : (
              <div className="text-sm text-[#858796]">Not linked</div>
            )}
          </div>

          <div>
            {twitter ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 28 }} className="mr-2" />
            ) : (
              <PrimaryButton onClick={() => performSocialLogin("twitter")} disabled={Boolean(twitter)}>
                Verify
              </PrimaryButton>
            )}
          </div>
        </div>

        <DividerDarker dashed />

        <div className="flex justify-between items-center">
          <div className="truncate">
            <div className="flex">
              <div className="text-[#272930] font-bold">Verify Discord</div>
            </div>
            {discord ? (
              <div className="text-sm truncate">
                <span className="text-[#858796]">Linked as:</span> {discord}
              </div>
            ) : (
              <div className="text-sm text-[#858796]">Not linked</div>
            )}
          </div>

          <div>
            {discord ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 28 }} className="mr-2" />
            ) : (
              <PrimaryButton onClick={() => performSocialLogin("discord")} disabled={Boolean(discord)}>
                Verify
              </PrimaryButton>
            )}
          </div>
        </div>
      </div>

      <div className={passed2 ? BOX_CHECKED_CLASSNAME : BOX_CLASSNAME}>
        <div className="flex items-center mb-1">
          <CircleWithNumber checked={passed2}>2</CircleWithNumber>
          <div className="text-[#272930] font-bold">Sign your list attestation</div>
        </div>

        <div>
          <div className="text-[#858796] text-xs">
            Sign your list attestation to claim the list ownership
          </div>
        </div>

        {!signature && (
          <>
            <DividerDarker />

            <div>
              <PrimaryButton
                onClick={async () => {
                  if (domainName) {
                    try {
                      const id = await listSign({
                        ...state,
                        domainName,
                      });

                      dispatch({
                        type: "assignId",
                        id,
                      })
                    } catch (err: any) {
                      console.error(err)
                      message.error(err.shortMessage || err.message || 'List signing failed!')
                    }
                  }
                }}
                disabled={loading || !domainName || !twitter || !discord || signature}
                className={"w-full flex justify-center"}
              >
                {loading ? 'Signing...' : 'Sign List Attestation'}
              </PrimaryButton>
            </div>          
          </>
        )}
      </div>

      <div className={BOX_CLASSNAME}>
        <div className="flex items-center mb-1">
          <CircleWithNumber checked={false}>3</CircleWithNumber>
          <div className="text-[#272930] font-bold">Submit your list</div>
        </div>

        <div>
          <div className="text-[#858796] text-xs">
            Publish your list on Optimism Mainnet!
          </div>
        </div>

        <DividerDarker />

        <div>
          <PrimaryButton
            onClick={() => {
              if (domainName) {
                listAttest()
              }
            }}
            disabled={loading || !domainName || !twitter || !discord || !signature}
            className={"w-full flex justify-center"}
          >
            {loading && signature ? 'Submitting' : 'Submit and Publish'}
          </PrimaryButton>
        </div>
      </div>
      
      <div>

      </div>
    </Modal>
  );
};
