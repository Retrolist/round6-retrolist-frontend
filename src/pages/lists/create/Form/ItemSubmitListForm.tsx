interface ItemSubmitListFormProps {
  title: string;
  score: number;
  description: string;
}

export const ItemSubmitListForm = ({
  title,
  description,
  score,
}: ItemSubmitListFormProps) => {
  return (
    <div className="flex">
      <div className="w-2/5">
        <div>{title}</div>
      </div>
      <div className="flex gap-3 w-3/5">
        <div className="w-10">
          <div
            className={`${
              score < 0 ? "bg-[#FF0420]" : "bg-[#10C200]"
            } rounded-full text-white w-6 h-6 flex justify-center items-center`}
          >
            {score}
          </div>
        </div>
        <div className="w-auto">{description}</div>
      </div>
    </div>
  );
};
