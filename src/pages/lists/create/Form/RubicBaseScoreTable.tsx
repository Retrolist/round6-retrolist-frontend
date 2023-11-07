import { Icon } from "@iconify/react/dist/iconify.js";
import { Progress, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  project: string;
  score: number;
}

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
interface RubicBaseScoreTableProps {
  onOpen: () => void;
}
export const RubicBaseScoreTable = ({ onOpen }: RubicBaseScoreTableProps) => {
  const columns: ColumnsType<DataType> = [
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
      render: (text, record) => (
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
          onClick={() => onOpen()}
        >
          Vote
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} className="mt-6" />
    </>
  );
};
