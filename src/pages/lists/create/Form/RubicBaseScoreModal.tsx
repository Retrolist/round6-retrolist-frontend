import { Button, Divider, Form, Input, Modal, Progress, Radio } from "antd";
import { useCreateListReducer } from "../../../../stores/CreateListReducer";
import { useCallback, useEffect, useState } from "react";
import { ICriteria } from "../../../../types/Rubric";

const questions = [
  {
    title: "Reach",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    answers: [
      {
        value: 0,
        questionNumber: 0,
        label: "Reaches a low or insignificant number of OP users",
      },
      {
        value: 1,
        questionNumber: 1,
        label: "Reaches a moderate number of OP users",
      },
      {
        value: 2,
        questionNumber: 2,
        label: "Reaches a large number of prospective OP users",
      },
      {
        value: 3,
        questionNumber: 3,
        label: "Reaches an expansive set of prospective OP users",
      },
      {
        value: 4,
        questionNumber: 4,
        label:
          "Reaches an expansive set of prospective OP users who are likely to use Optimism over other networks",
      },
    ],
  },
  {
    title: "Reach",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    answers: [
      {
        value: 0,
        questionNumber: 0,
        label: "Reaches a low or insignificant number of OP users",
      },
      {
        value: 1,
        questionNumber: 1,
        label: "Reaches a moderate number of OP users",
      },
      {
        value: 2,
        questionNumber: 2,
        label: "Reaches a large number of prospective OP users",
      },
      {
        value: 3,
        questionNumber: 3,
        label: "Reaches an expansive set of prospective OP users",
      },
      {
        value: 4,
        questionNumber: 4,
        label:
          "Reaches an expansive set of prospective OP users who are likely to use Optimism over other networks",
      },
    ],
  },
];

interface RadioItemProps {
  value: string | number;
  questionNumber: number;
  description: string;
}

const RadioItem = ({ questionNumber, description, value }: RadioItemProps) => {
  return (
    <Radio value={value}>
      <div className="flex gap-1 items-center">
        <div>{questionNumber}</div>
        <Divider type="vertical" />
        <div>{description}</div>
      </div>
    </Radio>
  );
};

interface RubricBaseScoreModalProps {
  projectId: string;
  isModalOpen: boolean;
  handleClose: () => void;
}

interface ICriteriaWithValue extends ICriteria {
  value: string | number;
  comment: string;
}

export const RubricBaseScoreModal = ({
  projectId,
  isModalOpen,
  handleClose,
}: RubricBaseScoreModalProps) => {
  const [form] = Form.useForm();
  const [state, dispatch] = useCreateListReducer();
  const [criterias, setCriterias] = useState<ICriteriaWithValue[]>([]);

  useEffect(() => {
    console.log(projectId, state, state.rubric)
    if (projectId && state && state.rubric) {
      const listContent = state.listContent.find(x => x.RPGF3_Application_UID == projectId)

      const criterias = state.rubric.criteria.map(criteria => ({
        ...criteria,
        value: (listContent?.evaluation[criteria._id] && listContent?.evaluation[criteria._id].score) || '',
        comment: (listContent?.evaluation[criteria._id] && listContent?.evaluation[criteria._id].comment) || "",
      }))
      
      setCriterias(criterias)

      form.setFieldValue("criterias", criterias)
    }
  }, [state, projectId]);

  return (
    <Modal
      open={isModalOpen}
      footer={<></>}
      bodyStyle={{ height: 500, overflow: "scroll", padding: 0 }}
      className="relative"
      onCancel={handleClose}
    >
      <Form
        form={form}
        initialValues={{ criterias }}
        layout="vertical"
        onFinish={(data) => {
          console.log(data);
          handleClose();
          // navigate("/lists/create/choose-projects");
        }}
      >
        <h2 className="text-2xl">Rubric</h2>
        <p className="text-[#858796] text-xs">
          Questions in each topic are calculated to allocate the OP token
        </p>
        <div className="mt-4 mb-3 text-lg">{state.rubric?.name}</div>
        <Form.List name="criterias">
          {(fields) => (
            <>
              {fields.map(({ key, name: index }) => (
                <div
                  className="p-3 rounded-lg border border-[#EAECF0] bg-[#FAFAFA] mb-3"
                  key={key}
                >
                  <div>
                    {index + 1}. {form.getFieldValue(["criterias", index, "title"])}
                  </div>

                  {/* <p className="py-1 text-[#858796]">{criteria.description}</p> */}
                  <Divider className="my-2" />

                  <Form.Item name={[index, "value"]} className="mb-0">
                    <Radio.Group className="flex flex-col gap-2">
                      {Object.entries<string>(
                        form.getFieldValue(["criterias", index, "scores"])
                      ).map(([score, answer]) => {
                        return (
                          <RadioItem
                            value={score}
                            description={answer}
                            questionNumber={parseInt(score)}
                          />
                        );
                      })}
                    </Radio.Group>
                  </Form.Item>

                  <Divider className="my-2" />

                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input placeholder="Comment (Optional)" />
                  </Form.Item>
                </div>
              ))}
            </>
          )}
        </Form.List>
        <Progress
          percent={20}
          showInfo={false}
          strokeLinecap="butt"
          strokeColor="#45D700"
          className="absolute left-0 bottom-[70px] z-50"
        />
        <Form.Item className="sticky bottom-0 bg-white pt-5">
          <div className="flex justify-between gap-2 w-full">
            <Button
              className="w-1/2 border border-[#FF04207D] text-[#FF0420] h-10"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              className="w-1/2 bg-[#FF0420] text-white h-10"
              htmlType="submit"
            >
              Vote
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};
