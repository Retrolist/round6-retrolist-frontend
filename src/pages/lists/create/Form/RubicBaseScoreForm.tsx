import { Icon } from "@iconify/react/dist/iconify.js";
import { Divider, Form, Slider } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../../../../components/buttons/PrimaryButton";
import SecondaryButton from "../../../../components/buttons/SecondaryButton";
import { useCreateListReducer } from "../../../../stores/CreateListReducer";
import { RubricBaseScoreModal } from "./RubicBaseScoreModal";
import { RubicBaseScoreTable } from "./RubicBaseScoreTable";
import { listContentView, rubricTotalScore } from "../../../../utils/list";
import { sigmoid } from "../../../../utils/common";

const TOTAL_PROJECT_SHARE = 644
const TOTAL_OP = 30_000_000
const EXP_CONST = 6;

export const RubricBaseScoreForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const options = [
    {
      value: "test1",
      label: "test1",
      img: "/img/platform/1.png",
      description:
        " RetroPGF Rubric-based List Creation UI opening to public crowdsourcing",
    },
    {
      value: "test2",
      label: "test2",
      img: "/img/platform/1.png",
      description:
        " RetroPGF Rubric-based List Creation UI opening to public crowdsourcing",
    },
    {
      value: "test3",
      label: "test3",
      img: "/img/platform/1.png",
      description:
        " RetroPGF Rubric-based List Creation UI opening to public crowdsourcing",
    },
  ];
  const [state, dispatch] = useCreateListReducer();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [votingProjectId, setVotingProjectId] = useState('')
  const [totalOpSlider, setTotalOpSlider] = useState(50)
  const [totalOp, setTotalOp] = useState(0)

  const handleOpen = (projectId: string) => {
    setIsModalOpen(true);
    setVotingProjectId(projectId)
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const selectedShare = state.listContent.length * Math.exp(EXP_CONST * (sigmoid((totalOpSlider - 50) / 50, 2) - 0.5))
    const totalShare = selectedShare + (TOTAL_PROJECT_SHARE - state.listContent.length)
    const opPerShare = TOTAL_OP / totalShare

    setTotalOp(Math.floor(selectedShare * opPerShare))
  }, [state, totalOpSlider])

  const totalScore = state.rubric ? rubricTotalScore(state.rubric) : 0;

  return (
    <div className="p-6 bg-white rounded-lg border border-[#EAECF0]">
      <div>Rubric-based Scoring</div>
      <p className="text-[#4C4E64AD] text-sm mt-2">
        Grade projects in the list with selected rubric
      </p>
      <button
        className="flex items-center gap-2 mt-2.5 border border-[#00A0E6] text-[#00A0E6] rounded-lg py-2.5 px-4"
        onClick={() => window.open("https://docs.google.com/spreadsheets/d/16E2_RSRXbLIBZMfa9YLVdF56ll1bT6fHfZ7pdi058OE/edit?usp=sharing")}
      >
        <Icon icon="lucide:file-text" />
        <div>Rubric Details</div>
      </button>
      <Form
        form={form}
        initialValues={state}
        layout="vertical"
        onFinish={(data) => {
          console.log(data);

          dispatch({
            type: "updateTotalOp",
            impactEvaluationInput: data.impactEvaluationInput,
            totalOp,
          })

          dispatch({
            type: "finalize",
          })

          navigate("/lists/create/submit-list");
        }}
      >
        <div className="text-[#4C4E64AD] text-sm mt-6">
          Select your OP allocated
        </div>
        <Slider
          defaultValue={50}
          step={5}
          trackStyle={{ background: "red" }}
          handleStyle={{ borderColor: "red" }}
          className="my-1.5"
          onChange={(value) => {
            setTotalOpSlider(value)
          }}
        />
        <div className="text-[#4C4E64AD] text-sm">
          List allocated = {totalOp.toLocaleString("en-US")} OP
        </div>
        <Form.Item
          label="Impact evaluation"
          name="impactEvaluationInput"
          style={{ color: "##858796" }}
          className="mt-6"
        >
          <TextArea
            placeholder="Ex: This list should receive the maximum OP allocation for their contribution to the OP Stack technology."
            size="large"
          />
        </Form.Item>
        <Divider className="my-6" />
        <RubicBaseScoreTable
          onOpen={handleOpen}
          data={listContentView(state).map(project => ({
            key: project.RPGF3_Application_UID,
            project: project.project?.displayName || '',
            score: project.score,
            logo: project.project?.profileImageUrl || '',
          }))}
          totalScore={state.rubric ? totalScore : 0}
        />
        <Divider />
        <div className="flex justify-between">
          <Link to="/lists/create/choose-projects">
            <SecondaryButton type="button">Back</SecondaryButton>
          </Link>
          <PrimaryButton>Next</PrimaryButton>
        </div>
      </Form>
      <RubricBaseScoreModal
        projectId={votingProjectId}
        isModalOpen={isModalOpen}
        handleClose={handleClose}
      />
    </div>
  );
};

export const RubricBaseScoreFormRoute = {
  path: "/lists/create/rubric-score",
  element: <RubricBaseScoreForm />,
};
