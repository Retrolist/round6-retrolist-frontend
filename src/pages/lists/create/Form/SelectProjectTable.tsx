import { Icon } from "@iconify/react/dist/iconify.js";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  project: string;
  bio: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Project",
    dataIndex: "project",
    key: "project",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Short bio",
    dataIndex: "bio",
    key: "bio",
  },
  {
    title: "",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Icon icon="lucide:trash" />
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    project: "wwww",
    bio: "wwwww",
  },
];

export const SelectProjectTable = () => {
  return <Table columns={columns} dataSource={data} className="mt-6" />;
};
