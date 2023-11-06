import { Icon } from "@iconify/react/dist/iconify.js";
import { Divider, Form, Slider } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../../../../components/buttons/PrimaryButton";
import SecondaryButton from "../../../../components/buttons/SecondaryButton";
import { useCreateListReducer } from "../../../../stores/CreateListReducer";
import { RubricBaseScoreModal } from "./RubicBaseScoreModal";
import { RubicBaseScoreTable } from "./RubicBaseScoreTable";

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

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };
  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="p-6 bg-white rounded-lg border border-[#EAECF0]">
      <div>Rubric-based</div>
      <p className="text-[#4C4E64AD] text-sm mt-2">
        The Rubric for grading initial proposals should be used by Sub-Committee
        members based on the criteria in the table below. To pass from
        Preliminary Review to the Final Review, a proposer much achieve an
        average score of 20 or higher from the two preliminary reviewers.
      </p>
      <button className="flex items-center gap-2 mt-2.5 border border-[#00A0E6] text-[#00A0E6] rounded-lg py-2.5 px-4 ">
        <Icon icon="lucide:file-text" />
        <div>Documentation</div>
      </button>
      <Form
        form={form}
        initialValues={state}
        layout="vertical"
        onFinish={(data) => {
          console.log(data);
          navigate("/lists/create/choose-projects");
        }}
      >
        <div className="text-[#4C4E64AD] text-sm mt-6">
          Select your OP allocated
        </div>
        <Slider
          defaultValue={30}
          trackStyle={{ background: "red" }}
          handleStyle={{ borderColor: "red" }}
          className="my-1.5"
        />
        <div className="text-[#4C4E64AD] text-sm">
          List allocated = 15,000,000 OP
        </div>
        <Form.Item
          label="Impact evaluation"
          name="impactEvaluation"
          required={true}
          style={{ color: "##858796" }}
          className="mt-6"
        >
          <TextArea
            placeholder="How did you evaluate the impact of projects? Help other badgeholders understand your methodology."
            size="large"
          />
        </Form.Item>
        <Divider className="my-6" />
        <RubicBaseScoreTable onOpen={handleOpen} />
        <Divider />
        <div className="flex justify-between">
          <Link to="/lists/create">
            <SecondaryButton type="button">Cancel</SecondaryButton>
          </Link>
          <PrimaryButton>Next</PrimaryButton>
        </div>
      </Form>
      <RubricBaseScoreModal
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
