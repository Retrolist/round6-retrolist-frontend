import { Icon } from "@iconify/react/dist/iconify.js";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useCreateListReducer } from "../../../../stores/CreateListReducer";

interface DataType {
  key: string;
  project: string;
  bio: string;
}

function DeleteButton({ projectId }: { projectId: string }) {
  const [state, dispatch] = useCreateListReducer();

  return (
    <Space
      size="middle"
      onClick={() =>
        dispatch({
          type: "deleteProject",
          projectId,
        })
      }
      className="hover:cursor-pointer"
    >
      <Icon icon="lucide:trash" />
    </Space>
  );
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
    render: (_, record) => <DeleteButton projectId={record.key} />,
  },
];

const data: DataType[] = [
  {
    key: "1",
    project: "wwww",
    bio: "wwwww",
  },
];

export const SelectProjectTable = ({ data }: { data: DataType[] }) => {
  return <Table columns={columns} dataSource={data} className="mt-6" />;
};
