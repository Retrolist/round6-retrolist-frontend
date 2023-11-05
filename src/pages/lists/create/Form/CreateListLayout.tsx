import { HomeOutlined, RightOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { ReactNode } from "react";
import { CreateListStep } from "../../../../components/CreateList/Step";
import Layout from "../../../../components/Layout";

interface CreateListInfoPageLayoutProps {
  children: ReactNode;
}
export default function CreateListInfoPageLayout({
  children,
}: CreateListInfoPageLayoutProps) {
  return (
    <Layout>
      <Breadcrumb
        className="mt-4 mb-8"
        separator={<RightOutlined />}
        items={[
          {
            href: "",
            title: <HomeOutlined />,
          },
          {
            href: "",
            title: <span>Lists</span>,
          },
          {
            title: "Create a new list",
          },
        ]}
      />
      <div className="flex gap-8">
        <div className="w-2/3">
          <div className="text-base font-bold mb-3">Create List</div>
          <div className="mb-5 text-xs text-gray-600">
            Lists are a new form of flexible delegation. Create a List to share
            your votes with other badgeholders. Be sure to reference some
            methodology for allocating OP to each project Be sure to check out
            the guidelines on creating a list: LInk
          </div>
          {children}
        </div>
        <CreateListStep />
      </div>
    </Layout>
  );
}
