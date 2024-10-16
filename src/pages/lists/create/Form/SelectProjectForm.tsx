import { Icon } from "@iconify/react/dist/iconify.js";
import { Divider, Form, Input, Select, message } from "antd";
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
import { SelectProjectCategorizationModal } from "./SelectProjectCategorizationModal";
import { SIMPLE_REQUIRED } from "../../../../utils/form";
import { useRubrics } from "../../../../hooks/useRubrics";

import pairwise from "../../../../dataset/pairwise.json";
import recategorization from "../../../../dataset/recategorization.json";

export const SelectProjectForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [search, setSearch] = useState("")
  const [showPairwiseModal, setShowPairwiseModal] = useState(false)
  const [showRecategorizationModal, setShowRecategorizationModal] = useState(false)
  const [state, dispatch] = useCreateListReducer();

  const [rubricSelectClassicMode, setRubricSelectClassicMode] = useState(state.rubricId && state.rubricId != '65695f889c41a3dbb680a30c' && state.rubricId != '65695f6e9c41a3dbb6808a7a')
  const [projectSelectClassicMode, setProjectSelectClassicMode] = useState(state.listContent.length > 0)

  const rubricId = Form.useWatch("rubricId", form)

  const categories = useMemo(() => [], [])

  const { projects } = useProjects({
    search,
    categories: categories,
    approved: true,
  })

  const [options, setOptions] = useState<any[]>([])

  const rubrics = useRubrics();

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

  useEffect(() => {
    setProjectSelectClassicMode(state.listContent.length > 0)
  }, [state])

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
      <Form
        form={form}
        initialValues={state}
        layout="vertical"
        onFinish={(data) => {
          console.log(data);
          
          const rubric = rubrics.find((rubric) => rubric._id == data.rubricId);

          if (!rubric) {
            return message.warning("Please choose a rubric");
          }

          if (state.listContent.length == 0) {
            return message.warning("Please choose a project");
          }
          
          dispatch({
            type: "updateMetadata",
            metadata: {
              ...data,
              rubric,
              categories:
                rubrics.find((x) => x._id == rubric._id)?.categories || [],
            },
          });

          if (rubricId == '65695f889c41a3dbb680a30c') {
            navigate("/lists/create/submit-list");
          } else {
            navigate("/lists/create/rubric-score");
          }
          
        }}
      >
        <Form.Item
          label="List name"
          name="listName"
          required={true}
          style={{ color: "##858796" }}
          rules={SIMPLE_REQUIRED}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="listDescription"
          required={true}
          rules={SIMPLE_REQUIRED}
        >
          <Input size="large" />
        </Form.Item>

        {/* <Form.Item
          label="Link to relevant resource"
          name="relevantResourceInput"
        >
          <Input prefix="https://" size="large" />
        </Form.Item> */}

        <Divider />

        <div className="flex gap-3 mb-3">
          <Icon icon="noto:fire" width={20} />
          <div>Hot Pick Project</div>
        </div>

        {projectSelectClassicMode ? (
          <>
            <div className="grid sm:grid-cols-3 gap-4">
              <HotPickProject
                name="Badgeholder Categorization"
                icon="/img/platform/op.png"
                description="[RECOMMENDED] Quickly add project with categorization from OP and badgeholders."
                onClick={() => {
                  setShowRecategorizationModal(true)
                }}
              />

              <HotPickProject
                name="Pairwise Categorization"
                icon="/img/platform/pairwise.png"
                description="Add projects to the list more quickly by using categorization from Pairwise."
                onClick={() => {
                  setShowPairwiseModal(true)
                }}
              />

              <HotPickProject
                name="RetroList"
                icon="/img/platform/retrolist.png"
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
          </>
        ) : (
          <div>
            <div
              className="rounded-xl shadow border border-gray-300 transition hover:cursor-pointer hover:bg-gray-100 p-4 mb-4"
              onClick={() => {
                setShowRecategorizationModal(true)
              }}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-2">
                  <img
                    className="h-8 w-8 rounded-full ring-2 ring-white"
                    src={"/img/platform/op.png"}
                    alt=""
                  />
                </div>

                <div>
                  <div className="font-bold">Badgeholder Categorization</div>
                  <div className="text-[#4C4E64AD] text-sm"><b>[RECOMMENDED]</b> Quickly add project with categorization from OP and badgeholders.</div>
                </div>
              </div>
            </div>

            <div
              className="rounded-xl shadow border border-gray-300 transition hover:cursor-pointer hover:bg-gray-100 p-4 mb-4"
              onClick={() => {
                setShowPairwiseModal(true)
              }}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-2">
                  <img
                    className="h-8 w-8 rounded-full ring-2 ring-white"
                    src={"/img/platform/pairwise.png"}
                    alt=""
                  />
                </div>

                <div>
                  <div className="font-bold">Pairwise Categorization</div>
                  <div className="text-[#4C4E64AD] text-sm">Add projects to the list more quickly by using categorization from Pairwise.</div>
                </div>
              </div>
            </div>

            <div
              className="rounded-xl shadow border border-gray-300 transition hover:cursor-pointer hover:bg-gray-100 p-4 mb-4"
              onClick={() => setProjectSelectClassicMode(true)}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-2">
                  <img
                    className="h-8 w-8 rounded-full ring-2 ring-white"
                    src={"/img/impact-logo.png"}
                    alt=""
                  />
                </div>

                <div>
                  <div className="font-bold">Manually Select</div>
                  <div className="text-[#4C4E64AD] text-sm">Select project manually by searching one-by-one</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Divider />

        <div className={rubricSelectClassicMode ? 'hidden' : ''}>
          <div className="mb-4"><span className="text-red-500">*</span> Select rubric</div>

          <div
            className={`rounded-xl shadow border border-gray-300 ${rubricId == '65695f889c41a3dbb680a30c' ? 'border-red-300 bg-red-100' : 'hover:bg-gray-100'} transition hover:cursor-pointer p-4 mb-4`}
            onClick={() => form.setFieldValue("rubricId", "65695f889c41a3dbb680a30c")}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-2">
                <img
                  className="h-8 w-8 rounded-full ring-2 ring-white"
                  src={"/img/create-list/folder.png"}
                  alt=""
                />
              </div>

              <div>
                <div className="font-bold">Categorization Only</div>
                <div className="text-[#4C4E64AD] text-sm">Categorization projects without voting / allocating any OP to them</div>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl shadow border border-gray-300 ${rubricId == '65695f6e9c41a3dbb6808a7a' ? 'border-red-300 bg-red-100' : 'hover:bg-gray-100'} transition hover:cursor-pointer p-4 mb-4`}
            onClick={() => form.setFieldValue("rubricId", "65695f6e9c41a3dbb6808a7a")}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-2">
                <img
                  className="h-8 w-8 rounded-full ring-2 ring-white"
                  src={"/img/create-list/voting-box.png"}
                  alt=""
                />
              </div>

              <div>
                <div className="font-bold">Quick Voting</div>
                <div className="text-[#4C4E64AD] text-sm">Vote and rank projects in a quick way by voting on reach and project quality</div>
              </div>
            </div>
          </div>

          <div
            className="rounded-xl shadow border border-gray-300 transition hover:cursor-pointer hover:bg-gray-100 p-4 mb-4"
            onClick={() => {
              form.setFieldValue("rubricId", "")
              setRubricSelectClassicMode(true)
            }}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-2">
                <img
                  className="h-8 w-8 rounded-full ring-2 ring-white"
                  src={"/img/create-list/bulletin.png"}
                  alt=""
                />
              </div>

              <div>
                <div className="font-bold">Detailed Voting</div>
                <div className="text-[#4C4E64AD] text-sm">Vote projects deeply in detail with one of our rubric</div>
              </div>
            </div>
          </div>
        </div>

        <div className={rubricSelectClassicMode ? '' : 'hidden'}>
          <Form.Item
            label="Select rubric"
            name="rubricId"
            required={true}
            rules={SIMPLE_REQUIRED}
          >
            <Select
              placeholder="Select rubric type"
              size="large"
              options={rubrics.map((rubric) => ({
                label: rubric.name,
                value: rubric._id,
              }))}
            />
          </Form.Item>

          <button
            className="flex items-center gap-2 mt-2.5 border border-[#00A0E6] text-[#00A0E6] rounded-lg py-2.5 px-4 mb-4"
            onClick={() =>
              window.open(
                "https://docs.google.com/spreadsheets/d/16E2_RSRXbLIBZMfa9YLVdF56ll1bT6fHfZ7pdi058OE/edit?usp=sharing"
              )
            }
          >
            <Icon icon="lucide:file-text" />
            <div>Rubric Details</div>
          </button>

          <div className="text-[16px] text-[#4C4E64AD] mb-8">
            In rubric mode, rubrics details are automatically appended into the
            impact evaluation description and the impact evaluation link is
            generated automatically.
          </div>
        </div>

        <Divider />

        <div className="flex justify-between">
          <Link to="/">
            <SecondaryButton type="button">Cancel</SecondaryButton>
          </Link>
          {/* <Link to="/lists/create/list-detail">
            <SecondaryButton type="button">Back</SecondaryButton>
          </Link> */}

          <PrimaryButton>Next</PrimaryButton>
        </div>
      </Form>

      <SelectProjectCategorizationModal
        isModalOpen={showPairwiseModal}
        handleClose={() => setShowPairwiseModal(false)}
        dataset={pairwise}
        sourceLabel="Pairwise"
        sourceUrl="https://www.pairwise.vote"
      ></SelectProjectCategorizationModal>

      <SelectProjectCategorizationModal
        isModalOpen={showRecategorizationModal}
        handleClose={() => setShowRecategorizationModal(false)}
        dataset={recategorization}
        sourceLabel="OP & Badgeholder categorization"
        sourceUrl="https://plaid-cement-e44.notion.site/b54253ffc6d749b2b8adf9035202fa10?v=95202c84c71f4b158115c1da4ec26dbc"
      ></SelectProjectCategorizationModal>
    </div>
  );
};

export const SelectProjectFormRoute = {
  path: "/lists/create/choose-projects",
  element: <SelectProjectForm />,
};
