import { Button, Divider, Form, Input, Modal, Progress, Radio } from "antd";
import { useCreateListReducer } from "../../../../stores/CreateListReducer";
import { useCallback, useEffect, useState } from "react";
import { ICriteria } from "../../../../types/Rubric";
import { CommentAndScore } from "../../../../types/List";
import PrimaryButton from "../../../../components/buttons/PrimaryButton";
import { useListAttest } from "../../../../hooks/useListAttest";

interface ListSubmitModalProps {
  isModalOpen: boolean;
  handleClose: () => void;
}

export const ListSubmitModal = ({
  isModalOpen,
  handleClose,
}: ListSubmitModalProps) => {
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
  } = useListAttest()

  return (
    <Modal
      open={isModalOpen}
      footer={<></>}
      bodyStyle={{ height: 500, padding: 0 }}
      className="relative"
      onCancel={handleClose}
    >
      <h2 className="text-2xl">
        Submit your list
      </h2>

      <p className="text-[#858796] mt-1">
        Follow these steps to submit your list
      </p>

      <div>
        <div>
          <div>1</div>
          <div>Verify your profile</div>
        </div>

        <div>
          <div>Connect your social profiles to verify authencity of the list</div>
        </div>

        <Divider />

        <div>
          <div>
            <div>Link X / Twitter</div>
            <div><span>Linked as:</span> Chomtana</div>
          </div>

          <div>
            <PrimaryButton onClick={() => performSocialLogin('twitter')}>Verify</PrimaryButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};
