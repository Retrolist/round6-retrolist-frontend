import { Divider } from "antd";
import { useLocation, useParams } from "react-router-dom";
import { CreateListStepCard } from "./Card";

export const CreateListStep = () => {
  const { pathname } = useLocation();

  // console.log(pathname)

  return (
    <div className="flex flex-col">
      <CreateListStepCard
        title="Select project"
        description="Choose projects to be included"
        icon="lucide:flag"
        selected={pathname == '/lists/create/choose-projects'}
      />
      <div className="w-[50px] text-center">
        <Divider type="vertical" className="h-6 my-1.5" />
      </div>
      {/* <CreateListStepCard
        title="List details"
        description="Name, description and rubric"
        icon="lucide:user-2"
        selected={pathname == '/lists/create/list-detail'}
      />
      <div className="w-[50px] text-center">
        <Divider type="vertical" className="h-6 my-1.5" />
      </div> */}
      <CreateListStepCard
        title="Rubric based score"
        description="Grade projects using selected rubric"
        icon="tabler:users-plus"
        selected={pathname == '/lists/create/rubric-score'}
      />
      <div className="w-[50px] text-center">
        <Divider type="vertical" className="h-6 my-1.5" />
      </div>
      <CreateListStepCard
        title="Submit your list"
        description="Publish your list on-chain"
        icon="lucide:sparkles"
        selected={pathname == '/lists/create/submit-list' || pathname == '/lists/create/success'}
      />
    </div>
  );
};
