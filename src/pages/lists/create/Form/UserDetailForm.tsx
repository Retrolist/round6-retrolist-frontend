import { Divider, Form, Input, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../../../../components/buttons/PrimaryButton";
import SecondaryButton from "../../../../components/buttons/SecondaryButton";
import { useCreateListReducer } from "../../../../stores/CreateListReducer";

export const UserDetailForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [state, dispatch] = useCreateListReducer();
  return (
    <div className="p-6 bg-white rounded-lg border border-[#EAECF0]">
      <Form
        form={form}
        initialValues={state}
        layout="vertical"
        onFinish={(data) => {
          console.log(data);

          dispatch({
            type: "updateMetadata",
            metadata: data,
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

        <Form.Item
          label="Link to relevant resource"
          name="relevantResourceInput"
        >
          <Input prefix="https://" size="large" />
        </Form.Item>

        <Form.Item label="Select rubric" name="rubricInput">
          <Select placeholder="Select rubric type" size="large" />
        </Form.Item>

        <div className="text-[16px] text-[#4C4E64AD] mb-8">
          In rubric mode, rubrics score details are automatically appended into
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
    </div>
  );
};

export const CreateListUserDetailFormRoute = {
  path: "/lists/create/user-detail",
  element: <UserDetailForm />,
};
