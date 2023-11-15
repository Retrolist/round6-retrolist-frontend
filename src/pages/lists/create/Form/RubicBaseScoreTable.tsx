import { Icon } from "@iconify/react/dist/iconify.js";
import { Progress, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  project: string;
  score: number;
  logo: string;
}

const data: DataType[] = [
  {
    key: "1",
    project: "wwww",
    score: 10,
    logo: "/img/op-icon.png",
  },
  {
    key: "1",
    project: "wwww",
    score: 10,
    logo: "/img/op-icon.png",
  },
];
interface RubicBaseScoreTableProps {
  onOpen: (projectId: string) => void;
  data: DataType[];
  totalScore: number;
}
export const RubicBaseScoreTable = ({ onOpen, data, totalScore }: RubicBaseScoreTableProps) => {
  const columns: ColumnsType<DataType> = [
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
      render: (text, record) => (
        <div className="flex gap-3">
          <div>
            <img width={40} height={40} src={record.logo || "/img/project-placeholder.svg"} alt="" className="rounded-full" />
          </div>
          <div>
            <div>{text}</div>

            <a href={"https://retrolist.app/project/" + record.key} target="_blank">
              <div className="flex gap-1 items-center">
                <div>Project detail</div>
                <Icon icon="lucide:external-link" />
              </div>
            </a>
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
            percent={(parseInt(text) / totalScore) * 100}
            status="exception"
            format={() => {
              return <div className="text-black ml-1">{text}/{totalScore}</div>;
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
          className="flex justify-center hover:cursor-pointer"
          onClick={() => onOpen(record.key)}
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
