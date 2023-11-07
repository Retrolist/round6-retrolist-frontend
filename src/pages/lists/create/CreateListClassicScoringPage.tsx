import { Form, Input } from "antd";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import SecondaryButton from "../../../components/buttons/SecondaryButton";
import { useCreateListReducer } from "../../../stores/CreateListReducer";
import { ListContent } from "../../../types/List";

const MOCK_PROJECT_UIDS = [
  "optidomains",
  "bored-town",
  "bored-artist",
  "laika",
];

function OpAmountInput({
  value,
  fieldName,
}: {
  value?: ListContent;
  fieldName: number;
}) {
  return (
    <div className="flex justify-between mb-3">
      <div className="flex items-center">
        <div
          className="rounded-full bg-gray-300 mr-2"
          style={{ width: 28, height: 28 }}
        ></div>
        <div className="text-lg">{value!.RPGF3_Application_UID}</div>
      </div>

      <div className="flex items-center">
        <Form.Item noStyle name={[fieldName, "OPAmount"]}>
          <Input />
        </Form.Item>
        &nbsp;OP
      </div>
    </div>
  );
}

export default function CreateListClassicScoringPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [state, dispatch] = useCreateListReducer();

  useEffect(() => {
    if (state.listContent.length == 0) {
      dispatch({
        type: "updateProjects",
        projectUids: MOCK_PROJECT_UIDS,
      });
    }
  }, [state]);

  useEffect(() => {
    form.setFieldsValue(state);
    console.log(state.listContent);
  }, [state]);

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
                type: "updateOPAmount",
                listContent: data.listContent,
              });

              navigate("/lists/create/finalize");
            }}
          >
            <Form.List name="listContent">
              {(fields, { add, remove }) => (
                <div>
                  <div className="flex flex-col mb-3">
                    {fields.map((field) => (
                      <Form.Item noStyle key={field.key} name={[field.name]}>
                        <OpAmountInput fieldName={field.name} />
                      </Form.Item>
                    ))}
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

export const CreateListClassicScoringPageRoute = {
  path: "/lists/create/classic-scoring",
  element: <CreateListClassicScoringPage />,
};
