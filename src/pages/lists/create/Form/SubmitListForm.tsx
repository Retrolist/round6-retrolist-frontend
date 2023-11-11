import { Icon } from "@iconify/react/dist/iconify.js";
import { Collapse, Divider, Form, Progress, theme } from "antd";
import { PieChart } from "react-minimal-pie-chart";
import { useNavigate } from "react-router-dom";
import { useCreateListReducer } from "../../../../stores/CreateListReducer";
import { ItemSubmitListForm } from "./ItemSubmitListForm";
import { ListData } from "../../../../types/List";
const Comment = () => {
  return (
    <>
      <Divider style={{ borderStyle: "dashed" }} className="my-2" />
      <p className="text-[12px] text-[#4C4E64AD]">
        Comment : Thank you for participating in RetroPGF 3. Please help us
        improve the process by providing feedback on your experience as a
        badgeholder!
      </p>
    </>
  );
};

export const SubmitListView = ({ state }: { state: ListData }) => {
  const { token } = theme.useToken();
  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: "#FAFAFA",
    borderRadius: token.borderRadiusLG,
  };
  const navigate = useNavigate();
  const [form] = Form.useForm();

  return (
    <div className="p-6 bg-white rounded-lg border border-[#EAECF0]">
      <div className="flex gap-3">
        <div className="w-3/4">
          <div className="text-lg font-bold">OP Good List A</div>
          <p className="text-[#858796] mt-1">
            I believe that the various projects in these lists are quite
            community-oriented. I've selected only 3-4 projects that seem
            feasible and have already made some progress. If they receive
            support from OP, I think they will bring a lot of good things to us.
          </p>
          <div className="font-bold mt-4">Impact Evaluation</div>
          <p className="text-[#858796] mt-1">
            Since many projects tend to prioritize the selection and
            proportionate management of tokens, if the projects I've chosen
            adhere to their intentions, I believe it will greatly benefit our
            ecosystem and is quite likely to succeed.
          </p>
        </div>
        <div>
          <div className="relative">
            <PieChart
              lineWidth={30}
              data={[
                { title: "One", value: 10, color: "#E38627" },
                { title: "Two", value: 15, color: "#C13C37" },
                { title: "Three", value: 20, color: "#6A2135" },
              ]}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[20px] text-[#202327]">
              100,000 OP allocated
            </div>
          </div>
        </div>
      </div>
      <Divider style={{ borderStyle: "dashed" }} />
      <div className="text-[#202327] text-[16px] mb-5">
        3 projects 100,000 OP allocated
      </div>
      <Collapse
        defaultActiveKey={["1"]}
        bordered={true}
        items={[
          {
            key: "1",
            label: (
              <>
                <div className="my-1">
                  <div className="flex gap-3 justify-between">
                    <div className="flex gap-3 w-1/3">
                      <div>
                        <img
                          width={40}
                          height={40}
                          src="/img/op-icon.png"
                          alt=""
                        />
                      </div>
                      <div>
                        <div className="font-bold">RetroList</div>
                        <div className="flex gap-1 items-center text-xs text-gray-600">
                          <div>Project detail</div>
                          <Icon icon="lucide:external-link" />
                        </div>
                      </div>
                    </div>
                    <div className="flex w-1/3">
                      <Progress
                        showInfo={false}
                        percent={10}
                        strokeColor={"#10C200"}
                      />
                      <div>19/20</div>
                    </div>
                    <div>70% = 70,000 OP</div>
                  </div>
                </div>
              </>
            ),
            children: (
              <div className="ml-4">
                <ItemSubmitListForm
                  title="1.Reach"
                  score={4}
                  description="Reaches an expansive set of prospective OP users who are likely to
              use Optimism over other networks"
                />

                <ItemSubmitListForm
                  title="2.Users"
                  score={4}
                  description="Likely to reach power users, key Web3 ecosystems, and core developers who have a need to use OP"
                />

                <ItemSubmitListForm
                  title="3.Experimentation and Novelty"
                  score={2}
                  description="The project tests the limits of Web3 technology and offers promising new technology or infrastructure"
                />
                <ItemSubmitListForm
                  title="4.Tangible Use Case for Web3 Technology"
                  score={4}
                  description="This project presents a critical stepping stone for the broad adoption of Web3 technology built on the OP Stack"
                />
                <ItemSubmitListForm
                  title="5.Likelihood of success"
                  score={4}
                  description="The project has a substantial likelihood to generate long-term, sustainable value for the Optimism ecosystem"
                />
  
                <ItemSubmitListForm
                  title="6.Distribution implementation plan"
                  score={2}
                  description="The proposed plan creates a likelihood that the grant will reach the breadth of the recipients' intended"
                />

                <ItemSubmitListForm
                  title="6.Distribution implementation plan"
                  score={2}
                  description="The proposed plan creates a likelihood that the grant will reach the breadth of the recipients' intended"
                />

                <ItemSubmitListForm
                  title="7.Grant size"
                  score={2}
                  description="Grant size is proportional to expected benefit OR Grant Size is greater than 65k OP, this is the highest score possible for this category"
                />
                <ItemSubmitListForm
                  title="8.Milestone Assessment"
                  score={4}
                  description="The team shows a reasonable ability to deliver on the plan"
                />

                <ItemSubmitListForm
                  title="9.Optimism Relationship"
                  score={4}
                  description="Milestones are reasonably likely to hold the proposer accountable"
                />

                <ItemSubmitListForm
                  title="10.Code Audit"
                  score={4}
                  description="Some code audits but not by a well-known auditor"
                />

                <ItemSubmitListForm
                  title="11.Milestone Trackability"
                  score={4}
                  description="Somewhat trackable"
                />

                <ItemSubmitListForm
                  title="12.Timely Submission"
                  score={-1}
                  description="Proposal submitted in last 48 hours of Submission Period"
                />

                <Divider style={{ borderStyle: "dashed" }} className="my-2" />
              </div>
            ),
            style: panelStyle,
          },
        ]}
        expandIcon={({ isActive }) => <></>}
        style={{ background: "#FAFAFA" }}
        
        className="border border-gray-300"
      />
    </div>
  );
};

export const SubmitListForm = () => {
  const { token } = theme.useToken();
  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: "#FAFAFA",
    borderRadius: token.borderRadiusLG,
  };
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [state, dispatch] = useCreateListReducer();

  return (
    <div>
      <SubmitListView state={state} />
    </div>
  );
};

export const SubmitListFormRoute = {
  path: "/lists/create/submit-list",
  element: <SubmitListForm />,
};
