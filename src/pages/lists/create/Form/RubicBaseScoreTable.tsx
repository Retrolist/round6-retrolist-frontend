import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Button,
  Divider,
  Form,
  Modal,
  Progress,
  Radio,
  Space,
  Table,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";

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

interface DataType {
  key: string;
  project: string;
  score: number;
}

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
const data: DataType[] = [
  {
    key: "1",
    project: "wwww",
    score: 10,
  },
  {
    key: "1",
    project: "wwww",
    score: 10,
  },
];

export const RubicBaseScoreTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
      render: (text) => (
        <div className="flex gap-3">
          <div>
            <img width={40} height={40} src="/img/op-icon.png" alt="" />
          </div>
          <div>
            <div>RetroList</div>
            <div className="flex gap-1 items-center">
              <div>Project detail</div>
              <Icon icon="lucide:external-link" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      render: (text) => (
        <>
          <Progress
            percent={(11 / 12) * 100}
            status="exception"
            format={() => {
              return <div className="text-black ml-1">11/12</div>;
            }}
          />
        </>
      ),
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space
          size="middle"
          className="flex justify-center"
          onClick={() => showModal()}
        >
          Vote
        </Space>
      ),
    },
  ];
  const [form] = Form.useForm();

  return (
    <>
      <Form
        form={form}
        // initialValues={state}
        layout="vertical"
        onFinish={(data) => {
          console.log(data);
          handleOk();
          // navigate("/lists/create/choose-projects");
        }}
        className="relative"
      >
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={<></>}
          bodyStyle={{ height: 500, overflow: "scroll", padding: 0 }}
          className="relative"
        >
          <h2 className="text-2xl">Rubric</h2>
          <p className="text-[#858796] text-xs">
            Questions in each topic are calculated to affect the gain OP token
          </p>
          <div className="mt-4 mb-3">Builder Reach</div>
          <>
            {questions.map((question, index) => {
              return (
                <div className="p-3 rounded-lg border border-[#EAECF0] bg-[#FAFAFA] mb-3">
                  <div>
                    {index + 1}.{question.title}
                  </div>
                  <p className="py-1 text-[#858796]">{question.description}</p>
                  <Divider className="my-2" />
                  <Form.Item className="mb-0">
                    <Radio.Group className="flex flex-col gap-2">
                      {question.answers.map((answer, index) => {
                        return (
                          <RadioItem
                            value={answer.value}
                            description={answer.label}
                            questionNumber={index}
                          />
                        );
                      })}
                    </Radio.Group>
                  </Form.Item>
                </div>
              );
            })}
          </>
          <Progress
            percent={20}
            showInfo={false}
            strokeLinecap="butt"
            strokeColor="#45D700"
            className="absolute left-0 bottom-[70px] z-50"
          />
          <div className="sticky bottom-0 bg-white pt-5">
            <div className="flex justify-between gap-2 w-full">
              <Button
                className="w-1/2 border border-[#FF04207D] text-[#FF0420] h-10"
                onClick={handleCancel}
              >
                Back
              </Button>
              <Button className="w-1/2 bg-[#FF0420] text-white h-10">
                Next
              </Button>
            </div>
          </div>
        </Modal>
      </Form>
      <Table columns={columns} dataSource={data} className="mt-6" />;
    </>
  );
};
