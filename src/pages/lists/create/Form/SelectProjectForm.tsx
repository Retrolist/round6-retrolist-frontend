import { Icon } from "@iconify/react/dist/iconify.js";
import { Divider, Form, Select } from "antd";
import { Option } from "antd/es/mentions";
import { Link, useNavigate } from "react-router-dom";
import { HotPickProject } from "../../../../components/CreateList/HotPickProject";
import PrimaryButton from "../../../../components/buttons/PrimaryButton";
import SecondaryButton from "../../../../components/buttons/SecondaryButton";
import { useCreateListReducer } from "../../../../stores/CreateListReducer";
import { SelectProjectTable } from "./SelectProjectTable";
import { useEffect, useMemo, useState } from "react";
import { useProjects } from "../../../../hooks/useProjects";
import { ProjectMetadataSimple } from "../../../../types/Project";

export const SelectProjectForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [search, setSearch] = useState("")

  const categories = useMemo(() => [], [])

  const { projects } = useProjects({
    search,
    categories: categories,
    approved: true,
  })

  const [options, setOptions] = useState<any[]>([])

  useEffect(() => {
    if (projects.length > 0) {
      setOptions(
        projects.map(project => ({
          value: JSON.stringify({
            id: project.id,
            displayName: project.displayName,
            profileImageUrl: project.profileImageUrl,
            bio: project.bio,
          }),
          label: project.displayName,
          img: project.profileImageUrl,
          description: project.bio,
        }))
      )
    }
  }, [projects])

  // const options = [
  //   {
  //     value: "test1",
  //     label: "test1",
  //     img: "/img/platform/1.png",
  //     description:
  //       " RetroPGF Rubric-based List Creation UI opening to public crowdsourcing",
  //   },
  //   {
  //     value: "test2",
  //     label: "test2",
  //     img: "/img/platform/1.png",
  //     description:
  //       " RetroPGF Rubric-based List Creation UI opening to public crowdsourcing",
  //   },
  //   {
  //     value: "test3",
  //     label: "test3",
  //     img: "/img/platform/1.png",
  //     description:
  //       " RetroPGF Rubric-based List Creation UI opening to public crowdsourcing",
  //   },
  // ];

  const [state, dispatch] = useCreateListReducer();

  const handleChange = (value: string[]) => {
    // console.log(`selected ${value}`);

    const projects: ProjectMetadataSimple[] = value.map(x => JSON.parse(x))
    dispatch({
      type: "updateProjects",
      projects,
    })
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-[#EAECF0]">
      <div className="flex gap-3 mb-3">
        <Icon icon="noto:fire" width={20} />
        <div>Hot Pick Project</div>
      </div>
      <Form
        form={form}
        initialValues={state}
        layout="vertical"
        onFinish={(data) => {
          console.log(data);
          navigate("/lists/create/rubric-score");
        }}
      >
        <div className="grid sm:grid-cols-3 gap-4">
          <HotPickProject
            name="Pairwise Categorization"
            icon="/img/platform/pairwise.png"
            description="Add projects to the list more quickly by using categorization from Pairwise."
            onClick={() => {

            }}
          />

          <HotPickProject
            name="RetroList"
            icon="/img/platform/1.png"
            description="Add RetroList to your list and include it in your ballot to signal your support for RetroList."
            onClick={() => {
              dispatch({
                type: "appendProjects",
                projects: [
                  {
                    "id": "0x6886a3d5da589ee9fc5528548edca61cbefa640ff7b11d7d545281d3423cfd93",
                    "displayName": "Retrolist | RetroPGF Rubric-based List Creation UI",
                    "bio": "RetroPGF Rubric-based List Creation UI opening to public crowdsourcing",
                    "profileImageUrl": "https://content.optimism.io/profile/v0/profile-image/10/0x73F4e6132Cd9E4a3945d9CA6E98e5985BBe16d2D.png",
                  }
                ]
              })
            }}
          />

          {/* <HotPickProject /> */}
        </div>
        <Select
          className="mt-6"
          size="large"
          mode="multiple"
          showSearch
          filterOption={false}
          allowClear
          style={{ width: "100%" }}
          placeholder="Select project"
          value={state.projectsMetadata.map(project => JSON.stringify(project))}
          onChange={handleChange}
          tagRender={(props) => <></>}
          onSearch={(search) => setSearch(search)}
        >
          {options.map((option) => {
            return (
              <Option value={option.value} key={option.value} className="my-1">
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
        <SelectProjectTable data={state.projectsMetadata.map(project => ({
          key: project.id,
          project: project.displayName,
          bio: project.bio,
          icon: project.profileImageUrl,
        }))} />
        <Divider />
        <div className="flex justify-between">
          <Link to="/lists/create/list-detail">
            <SecondaryButton type="button">Back</SecondaryButton>
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
