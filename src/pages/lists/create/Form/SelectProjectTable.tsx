import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
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
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
];

export const SelectProjectTable = () => {
  return <Table columns={columns} dataSource={data} className="mt-6" />;
};
