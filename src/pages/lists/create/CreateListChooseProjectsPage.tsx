import React, { useEffect } from "react";
import Layout from "../../../components/Layout";
import { useCreateListReducer } from "../../../stores/CreateListReducer";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ListImpactEvaluationType } from "../../../types/List";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import SecondaryButton from "../../../components/buttons/SecondaryButton";
import { Link } from "react-router-dom";

const MOCK_PROJECT_UIDS = [
  'optidomains',
  'bored-town',
  'bored-artist',
  'laika',
]

export default function CreateListChooseProjectsPage() {
  const [form] = Form.useForm();
  const [state, dispatch] = useCreateListReducer();

  useEffect(() => {
    if (state.listContent.length == 0) {
      dispatch({
        type: "updateProjects",
        projectUids: MOCK_PROJECT_UIDS,
      })
    }
  }, [state])

  useEffect(() => {
    form.setFieldsValue(state)
    console.log(state.listContent)
  }, [state])

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="text-4xl font-bold mb-3">Create List</div>
        <div className="mb-5 text-gray-600">
          Choose project you want to include in the list
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
            <Form.List name="listContent">
              {(fields, { add, remove }) => (
                <div className="flex flex-col">
                  {fields.map(field => (
                    <Form.Item noStyle key={field.key} dependencies={["listContent", field.name]}>
                      {({ getFieldValue}) => (
                        <div>{field.name} {getFieldValue(["listContent", field.name, "RPGF3_Application_UID"])}</div>
                      )}
                    </Form.Item>
                  ))}
                </div>
              )}
            </Form.List>
          </Form>
        </div>
      </div>
    </Layout>
  );
}

export const CreateListChooseProjectsPageRoute = {
  path: "/lists/create/choose-projects",
  element: <CreateListChooseProjectsPage />,
};
