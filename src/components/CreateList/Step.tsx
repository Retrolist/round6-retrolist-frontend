import { Divider } from "antd";
import { CreateListStepCard } from "./Card";

export const CreateListStep = () => {
  return (
    <div className="flex flex-col">
      <CreateListStepCard
        title="Your details"
        description="Please provide your name and email"
        icon="lucide:user-2"
        selected
      />
      <div className="w-[50px] text-center">
        <Divider type="vertical" className="h-6 my-1.5" />
      </div>
      <CreateListStepCard
        title="Select project"
        description="A few details about your company"
        icon="lucide:flag"
      />
      <div className="w-[50px] text-center">
        <Divider type="vertical" className="h-6 my-1.5" />
      </div>
      <CreateListStepCard
        title="Rubric based score"
        description="Start collaborating with your team"
        icon="tabler:users-plus"
      />
      <div className="w-[50px] text-center">
        <Divider type="vertical" className="h-6 my-1.5" />
      </div>
      <CreateListStepCard
        title="Submit your list"
        description="Share posts to your social accounts"
        icon="lucide:sparkles"
      />
    </div>
  );
};
