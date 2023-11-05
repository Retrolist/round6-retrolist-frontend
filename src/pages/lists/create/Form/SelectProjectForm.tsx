import { Icon } from "@iconify/react/dist/iconify.js";
import { Divider, Form, Select } from "antd";
import { Option } from "antd/es/mentions";
import { Link, useNavigate } from "react-router-dom";
import { HotPickProject } from "../../../../components/CreateList/HotPickProject";
import PrimaryButton from "../../../../components/buttons/PrimaryButton";
import SecondaryButton from "../../../../components/buttons/SecondaryButton";
import { useCreateListReducer } from "../../../../stores/CreateListReducer";
import { SelectProjectTable } from "./SelectProjectTable";

export const SelectProjectForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const options = [
    {
      value: "test1",
      label: "test1",
      img: "/img/platform/1.png",
      description:
        " RetroPGF Rubric-based List Creation UI opening to public crowdsourcing",
    },
    {
      value: "test2",
      label: "test2",
      img: "/img/platform/1.png",
      description:
        " RetroPGF Rubric-based List Creation UI opening to public crowdsourcing",
    },
    {
      value: "test3",
      label: "test3",
      img: "/img/platform/1.png",
      description:
        " RetroPGF Rubric-based List Creation UI opening to public crowdsourcing",
    },
  ];
  const [state, dispatch] = useCreateListReducer();

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="p-6 bg-white rounded-lg border border-[#EAECF0]">
      <div className="flex gap-3">
        <Icon icon="noto:fire" width={20} />
        <div>Hot Pick Project</div>
      </div>
      <Form
        form={form}
        initialValues={state}
        layout="vertical"
        onFinish={(data) => {
          console.log(data);
          navigate("/lists/create/choose-projects");
        }}
      >
        <div className="grid grid-cols-3 gap-4">
          <HotPickProject />
          <HotPickProject />
          <HotPickProject />
        </div>
        <Select
          className="mt-6"
          size="large"
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Search project"
          defaultValue={[]}
          onChange={handleChange}
          tagRender={(props) => <></>}
          open
        >
          {options.map((option) => {
            return (
              <Option value={option.value} className="my-1">
                <div className="flex items-center gap-2">
                  <img
                    className="h-8 w-8 rounded-full ring-2 ring-white"
                    src={option.img}
                    alt=""
                  />
                  <div>
                    <div>{option.label}</div>
                    <div className="text-[10px]">{option.description}</div>
                  </div>
                </div>
              </Option>
            );
          })}
        </Select>
        <SelectProjectTable />
        <Divider />
        <div className="flex justify-between">
          <Link to="/lists/create">
            <SecondaryButton type="button">Cancel</SecondaryButton>
          </Link>

          <PrimaryButton>Next</PrimaryButton>
        </div>
      </Form>
    </div>
  );
};

export const SelectProjectFormRoute = {
  path: "/lists/create/choose-projects",
  element: <SelectProjectForm />,
};
