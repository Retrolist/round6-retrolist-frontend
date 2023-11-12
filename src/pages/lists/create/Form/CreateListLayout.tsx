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
            href: "/",
            title: <HomeOutlined />,
          },
          {
            href: "/list",
            title: <span>Lists</span>,
          },
          {
            title: "Create a new list",
          },
        ]}
      />
      <div className="flex gap-8">
        <div className="w-full lg:w-2/3">
          <div className="text-base font-bold mb-3">Create List</div>
          <div className="mb-5 text-xs text-gray-600">
            Create a List to share your votes with badgeholders.
          </div>
          {children}
        </div>

        <div className="hidden lg:block">
          <CreateListStep />
        </div>
      </div>
    </Layout>
  );
}
