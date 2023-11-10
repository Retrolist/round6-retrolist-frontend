import { Divider, Form, Input, Select, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../../../../components/buttons/PrimaryButton";
import SecondaryButton from "../../../../components/buttons/SecondaryButton";
import { useCreateListReducer } from "../../../../stores/CreateListReducer";
import { useRubrics } from "../../../../hooks/useRubrics";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ListSubmitModal } from "./ListSubmitModal";

export const UserDetailForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [state, dispatch] = useCreateListReducer();
  const rubrics = useRubrics();

  return (
    <div className="p-6 bg-white rounded-lg border border-[#EAECF0]">
      <Form
        form={form}
        initialValues={state}
        layout="vertical"
        onFinish={(data) => {
          console.log(data);

          const rubric = rubrics.find(rubric => rubric._id == data.rubricId);

          if (!rubric) {
            return message.error("Please choose a rubric")
          }

          dispatch({
            type: "updateMetadata",
            metadata: data,
            rubric,
          });

          navigate("/lists/create/choose-projects");
        }}
      >
        <Form.Item
          label="List name"
          name="listName"
          required={true}
          style={{ color: "##858796" }}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item label="Description" name="listDescription" required={true}>
          <Input size="large" />
        </Form.Item>

        {/* <Form.Item
          label="Link to relevant resource"
          name="relevantResourceInput"
        >
          <Input prefix="https://" size="large" />
        </Form.Item> */}

        <Form.Item label="Select rubric" name="rubricId" required={true}>
          <Select
            placeholder="Select rubric type"
            size="large"
            options={rubrics.map((rubric) => ({
              label: rubric.name,
              value: rubric._id,
            }))}
          />
        </Form.Item>

        <button
          className="flex items-center gap-2 mt-2.5 border border-[#00A0E6] text-[#00A0E6] rounded-lg py-2.5 px-4 mb-4"
          onClick={() => window.open("https://docs.google.com/spreadsheets/d/16E2_RSRXbLIBZMfa9YLVdF56ll1bT6fHfZ7pdi058OE/edit?usp=sharing")}
        >
          <Icon icon="lucide:file-text" />
          <div>Rubric Details</div>
        </button>

        <div className="text-[16px] text-[#4C4E64AD] mb-8">
          In rubric mode, rubrics details are automatically appended into
          the impact evaluation description and the impact evaluation link is
          generated automatically.
        </div>
        <Divider />
        <div className="flex justify-between">
          <Link to="/">
            <SecondaryButton type="button">Cancel</SecondaryButton>
          </Link>
          <PrimaryButton>Next</PrimaryButton>
        </div>
      </Form>

      {/* <ListSubmitModal
        isModalOpen={true}
        handleClose={() => {}}
      /> */}
    </div>
  );
};

export const CreateListUserDetailFormRoute = {
  path: "/lists/create/user-detail",
  element: <UserDetailForm />,
};
