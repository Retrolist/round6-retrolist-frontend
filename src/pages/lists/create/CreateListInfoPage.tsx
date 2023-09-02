import React from "react";
import Layout from "../../../components/Layout";
import { useCreateListReducer } from "../../../stores/CreateListReducer";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ListImpactEvaluationType } from "../../../types/List";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import SecondaryButton from "../../../components/buttons/SecondaryButton";
import { Link } from "react-router-dom";

export default function CreateListInfoPage() {
  const [form] = Form.useForm();
  const [state, dispatch] = useCreateListReducer();

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="text-4xl font-bold mb-3">Create List</div>
        <div className="mb-5 text-gray-600">
          Please input title and description of the list
        </div>

        <div style={{ width: "100%", maxWidth: 500 }}>
          <Form
            form={form}
            initialValues={state}
            layout="vertical"
            onFinish={(data) => {
              console.log(data);

              dispatch({
                type: "updateMetadata",
                metadata: data,
              })
            }}
          >
            <Form.Item label="List name" name="listName" required={true}>
              <Input />
            </Form.Item>

            <Form.Item
              label="List description"
              name="listDescription"
              required={true}
            >
              <TextArea />
            </Form.Item>

            <Form.Item
              label="Impact evaluation description"
              name="impactEvaluationInput"
            >
              <TextArea />
            </Form.Item>

            {state.impactEvaluationType == ListImpactEvaluationType.CLASSIC ? (
              <>
                <Form.Item
                  label="Impact evaluation link"
                  name="impactEvaluationLink"
                >
                  <Input />
                </Form.Item>
              </>
            ) : (
              <div className="mb-4">
                In rubric mode, rubrics score details are automatically appended
                into the impact evaluation description and the impact evaluation
                link is generated automatically.
              </div>
            )}

            <div className="flex justify-between">
              <Link to="/lists/create">
                <SecondaryButton type="button">Back</SecondaryButton>
              </Link>

              <PrimaryButton>Next</PrimaryButton>
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  );
}

export const CreateListInfoPageRoute = {
  path: "/lists/create/info",
  element: <CreateListInfoPage />,
};
