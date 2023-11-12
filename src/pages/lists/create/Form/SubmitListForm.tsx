import { Icon } from "@iconify/react/dist/iconify.js";
import { Collapse, Divider, Form, Progress, Tooltip, theme } from "antd";
import { PieChart } from "react-minimal-pie-chart";
import { Link, useNavigate } from "react-router-dom";
import { useCreateListReducer } from "../../../../stores/CreateListReducer";
import { ItemSubmitListForm } from "./ItemSubmitListForm";
import { ListData } from "../../../../types/List";
import PrimaryButton from "../../../../components/buttons/PrimaryButton";
import SecondaryButton from "../../../../components/buttons/SecondaryButton";
import { ReactNode, useState } from "react";
import { SubmitListModal } from "./SubmitListModal";
import {
  listContentView,
  listPieChart,
  rubricTotalScore,
} from "../../../../utils/list";
import { removeScientificNotation } from "../../../../utils/common";

export const SubmitListView = ({
  state,
  children,
}: {
  state: ListData;
  children: ReactNode;
}) => {
  const { token } = theme.useToken();
  const panelStyle: React.CSSProperties = {
    background: "#FAFAFA",
    borderRadius: token.borderRadiusLG,
  };

  const listContent = listContentView(state, true);
  const totalScore = state.rubric ? rubricTotalScore(state.rubric) : 0;

  const [activeKeys, setActiveKeys] = useState(
    state.listContent.length > 0
      ? [state.listContent[0].RPGF3_Application_UID]
      : []
  );

  return (
    <div>
      <div className="flex gap-3">
        <div className="w-3/4">
          <div className="text-lg font-bold">{state.listName}</div>
          <p className="text-[#858796] mt-1 whitespace-pre-line">
            {state.listDescription}
          </p>
          <div className="font-bold mt-4">Impact Evaluation</div>
          <p className="text-[#858796] mt-1 whitespace-pre-line">
            {state.impactEvaluationDescription}
          </p>
        </div>
        <div>
          <div className="relative">
            <PieChart lineWidth={30} data={listPieChart(state)} />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[20px] text-[#202327]">
              {state.totalOp.toLocaleString("en-US")} OP allocated
            </div>
          </div>
        </div>
      </div>
      <Divider style={{ borderStyle: "dashed" }} />
      <div className="text-[#202327] text-[16px] mb-5">
        {listContent.length} projects {state.totalOp.toLocaleString("en-US")} OP
        allocated
      </div>
      <Collapse
        defaultActiveKey={activeKeys}
        onChange={() => setActiveKeys(activeKeys)}
        bordered={true}
        items={listContent.map((project) => ({
          key: project.RPGF3_Application_UID,
          label: (
            <>
              <div className="my-1">
                <div className="flex gap-3 justify-between">
                  <div className="flex gap-3 w-full">
                    <div>
                      <img
                        width={40}
                        height={40}
                        src={
                          project.project?.profileImageUrl ||
                          "/img/project-placeholder.svg"
                        }
                        className="rounded-full"
                        alt=""
                      />
                    </div>
                    <div>
                      <div className="font-bold">
                        {project.project?.displayName}
                      </div>

                      <a
                        href={`https://retrolist.app/project/${project.RPGF3_Application_UID}`}
                        target="_blank"
                      >
                        <div className="flex gap-1 items-center text-xs text-gray-600">
                          <div>Project detail</div>
                          <Icon icon="lucide:external-link" />
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="flex shrink-0" style={{ flexBasis: 240 }}>
                    <Progress
                      showInfo={false}
                      percent={(project.score / totalScore) * 100}
                      strokeColor={"#10C200"}
                    />
                    <div>
                      {project.score}/{totalScore}
                    </div>
                  </div>
                  <div
                    className="text-right shrink-0"
                    style={{ flexBasis: 140 }}
                  >
                    {removeScientificNotation(
                      ((project.OPAmount / state.totalOp) * 100).toPrecision(2)
                    )}
                    % = {project.OPAmount.toLocaleString("en-US")} OP
                  </div>
                </div>
              </div>
            </>
          ),
          children: (
            <div className="ml-4">
              {state.rubric?.criteria.map(
                (criteria) =>
                  project.evaluation[criteria._id] && (
                    <ItemSubmitListForm
                      title={criteria.title}
                      score={project.evaluation[criteria._id].score}
                      description={
                        criteria.scores[
                          project.evaluation[criteria._id].score
                        ] || "ERROR"
                      }
                      comment={project.evaluation[criteria._id].comment}
                      key={criteria._id}
                    />
                  )
              )}
            </div>
          ),
          style: panelStyle,
        }))}
        expandIcon={({ isActive }) => <></>}
        style={{ background: "#FAFAFA" }}
        className="border border-gray-300"
      />

      {children}
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

  const [showSubmitModal, setShowSubmitModal] = useState(false);

  return (
    <div className="p-6 bg-white rounded-lg border border-[#EAECF0]">
      <SubmitListView state={state}>
        <Divider />

        <div className="flex justify-between">
          <Link to="/lists/create/rubric-score">
            <SecondaryButton type="button">Back</SecondaryButton>
          </Link>
          <PrimaryButton onClick={() => setShowSubmitModal(true)}>
            Submit
          </PrimaryButton>
        </div>

        <SubmitListModal
          isModalOpen={showSubmitModal}
          handleClose={() => setShowSubmitModal(false)}
        ></SubmitListModal>
      </SubmitListView>
    </div>
  );
};

export const SubmitListFormRoute = {
  path: "/lists/create/submit-list",
  element: <SubmitListForm />,
};
