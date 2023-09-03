import { Form, Input, Select } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateListReducer } from "../../../stores/CreateListReducer";
import { useForm } from "antd/es/form/Form";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import SecondaryButton from "../../../components/buttons/SecondaryButton";
import { v4 as uuid } from "uuid";
import Layout from "../../../components/Layout";

export default function CreateListRubricScoringPage() {
  const navigate = useNavigate();
  const [form] = useForm();
  const [state, dispatch] = useCreateListReducer();

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="text-4xl font-bold mb-3">Create List</div>
        <div className="mb-5 text-gray-600">
          Please assign rubric score to each project
        </div>

        <div style={{ width: "100%", maxWidth: 500 }}>
          <div className="text-xl font-bold mb-4">Projects</div>

          <Form
            form={form}
            initialValues={state}
            onFinish={(data) => {
              console.log(data);

              dispatch({
                type: "updateRubricEvaluation",
                listContent: data.listContent,
              });
            }}
          >
            <Form.List name="listContent">
              {(fields, { add, remove }) => (
                <div>
                  <div className="mb-6">
                    {fields.map((field) => (
                      <div className="mb-6" key={field.key}>
                        <Form.Item
                          noStyle
                          key={field.key}
                          dependencies={["listContent", field.name]}
                        >
                          {({ getFieldValue }) => (
                            <div className="flex justify-between mb-3">
                              <div className="flex items-center">
                                <div
                                  className="rounded-full bg-gray-300 mr-2"
                                  style={{ width: 28, height: 28 }}
                                ></div>
                                <div className="text-lg">
                                  {getFieldValue([
                                    "listContent",
                                    field.name,
                                    "RPGF3_Application_UID",
                                  ])}
                                </div>
                              </div>

                              <div className="flex items-center">
                                {/* <div>Delete</div> */}
                              </div>
                            </div>
                          )}
                        </Form.Item>

                        {state.rubrics.map((rubric) => (
                          <Form.Item
                            className="mb-2"
                            label={rubric.title}
                            name={[field.name, "evaluation", rubric.id]}
                          >
                            <Select
                              defaultValue="0"
                              options={Object.entries(rubric.scores)
                                .filter(([score, label]) => label)
                                .map(([score, label]) => ({
                                  value: score,
                                  label: `${score} - ${label}`,
                                }))}
                            ></Select>
                          </Form.Item>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <Link to="/lists/create/rubric">
                      <SecondaryButton type="button">Back</SecondaryButton>
                    </Link>

                    <PrimaryButton>Next</PrimaryButton>
                  </div>
                </div>
              )}
            </Form.List>
          </Form>
        </div>
      </div>
    </Layout>
  );
}

export const CreateListRubricScoringPageRoute = {
  path: "/lists/create/rubric-scoring",
  element: <CreateListRubricScoringPage />,
};
