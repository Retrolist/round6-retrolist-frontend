import React, { useEffect } from "react";
import Layout from "../../../components/Layout";
import { useCreateListReducer } from "../../../stores/CreateListReducer";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ListImpactEvaluationType } from "../../../types/List";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import SecondaryButton from "../../../components/buttons/SecondaryButton";
import { Link, useNavigate } from "react-router-dom";

const MOCK_PROJECT_UIDS = [
  'optidomains',
  'bored-town',
  'bored-artist',
  'laika',
]

export default function CreateListChooseProjectsPage() {
  const navigate = useNavigate();
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

              // dispatch({
              //   type: "updateProjects",
              //   metadata: data,
              // })

              if (state.impactEvaluationType == ListImpactEvaluationType.RUBRIC) {
                navigate("/lists/create/rubric")
              } else {
                navigate("/lists/create/classic-scoring")
              }
            }}
          >
            <Form.List name="listContent">
              {(fields, { add, remove }) => (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-xl font-bold">Projects</div>
                    <div>
                      <PrimaryButton>+ Add Project</PrimaryButton>
                    </div>
                  </div>

                  <div className="flex flex-col mb-3">
                    {fields.map(field => (
                      <Form.Item noStyle key={field.key} dependencies={["listContent", field.name]}>
                        {({ getFieldValue}) => (
                          <div className="flex justify-between mb-3">
                            <div className="flex items-center">
                              <div className="rounded-full bg-gray-300 mr-2" style={{ width: 28, height: 28 }}></div>
                              <div className="text-lg">{getFieldValue(["listContent", field.name, "RPGF3_Application_UID"])}</div>
                            </div>

                            <div className="flex items-center">
                              <div>Delete</div>
                            </div>
                          </div>
                        )}
                      </Form.Item>
                    ))}
                  </div>

                  <div>

                  </div>
                </div>
              )}
            </Form.List>

            <div className="flex justify-between">
              <Link to="/lists/create/info">
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

export const CreateListChooseProjectsPageRoute = {
  path: "/lists/create/choose-projects",
  element: <CreateListChooseProjectsPage />,
};
