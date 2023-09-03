import { Form, Input } from "antd"
import React from "react"
import { Link, useNavigate } from "react-router-dom";
import { useCreateListReducer } from "../../../stores/CreateListReducer";
import { useForm } from "antd/es/form/Form";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import SecondaryButton from "../../../components/buttons/SecondaryButton";
import { v4 as uuid } from 'uuid';
import Layout from "../../../components/Layout";

export default function CreateListRubricPage() {
  const navigate = useNavigate();
  const [form] = useForm()
  const [state, dispatch] = useCreateListReducer();

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="text-4xl font-bold mb-3">Create List</div>
        <div className="mb-5 text-gray-600">
          Please add criterias to your rubrics
        </div>

        <div style={{ width: "100%", maxWidth: 500 }}>
          <div className="text-xl font-bold mb-4">Rubrics</div>

          <Form
            form={form}
            initialValues={state}
            onFinish={(data) => {
              console.log(data);

              dispatch({
                type: "updateRubrics",
                rubrics: data.rubrics,
              })

              navigate("/lists/create/rubric-scoring")
            }}
          >
            <Form.List name="rubrics">
              {(fields, { add, remove }) => (
                <div>
                  <div className="mb-6">
                    {fields.map(field => (
                      <div className="mb-6" key={field.key}>
                        <Form.Item className="mb-3" label="Title" name={[field.name, "title"]}>
                          <Input />
                        </Form.Item>

                        <Form.Item className="mb-2" label="-5" name={[field.name, "scores", "-5"]}>
                          <Input />
                        </Form.Item>

                        <Form.Item className="mb-2" label="-4" name={[field.name, "scores", "-4"]}>
                          <Input />
                        </Form.Item>

                        <Form.Item className="mb-2" label="-3" name={[field.name, "scores", "-3"]}>
                          <Input />
                        </Form.Item>

                        <Form.Item className="mb-2" label="-2" name={[field.name, "scores", "-2"]}>
                          <Input />
                        </Form.Item>

                        <Form.Item className="mb-2" label="-1" name={[field.name, "scores", "-1"]}>
                          <Input />
                        </Form.Item>

                        <Form.Item className="mb-2" label="0" name={[field.name, "scores", "0"]}>
                          <Input />
                        </Form.Item>

                        <Form.Item className="mb-2" label="1" name={[field.name, "scores", "1"]}>
                          <Input />
                        </Form.Item>

                        <Form.Item className="mb-2" label="2" name={[field.name, "scores", "2"]}>
                          <Input />
                        </Form.Item>

                        <Form.Item className="mb-2" label="3" name={[field.name, "scores", "3"]}>
                          <Input />
                        </Form.Item>

                        <Form.Item className="mb-2" label="4" name={[field.name, "scores", "4"]}>
                          <Input />
                        </Form.Item>

                        <Form.Item className="mb-2" label="5" name={[field.name, "scores", "5"]}>
                          <Input />
                        </Form.Item>

                        <SecondaryButton type="button" onClick={() => remove(field.name)}>
                          Delete
                        </SecondaryButton>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <Link to="/lists/create/choose-projects">
                      <SecondaryButton type="button">Back</SecondaryButton>
                    </Link>

                    <PrimaryButton type="button" onClick={() => add({
                      id: uuid(),
                      title: "",
                      scores: {
                        "-5": "",
                        "-4": "",
                        "-3": "",
                        "-2": "",
                        "-1": "",
                        "0": "",
                        "1": "",
                        "2": "",
                        "3": "",
                        "4": "",
                        "5": "",
                      }
                    })}>+ Add</PrimaryButton>

                    <PrimaryButton>Next</PrimaryButton>
                  </div>
                </div>
              )}
            </Form.List>
          </Form>
        </div>
      </div>
    </Layout>
  )
}

export const CreateListRubricPageRoute = {
  path: "/lists/create/rubric",
  element: <CreateListRubricPage />,
};
