import { Divider } from "antd";

interface ItemSubmitListFormProps {
  title: string;
  score: number;
  description: string;
  comment?: string;
}

export const ItemSubmitListForm = ({
  title,
  description,
  score,
  comment,
}: ItemSubmitListFormProps) => {
  return (
    <div>
      <div className="flex">
        <div className="w-2/5">
          <div>{title}</div>
        </div>
        <div className="flex gap-3 w-3/5">
          <div style={{ width: 24, height: 24 }}>
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

      {comment && (
        <div className="mt-1">
          <p className="text-[12px] text-[#4C4E64AD]">
            Comment : {comment}
          </p>
        </div>
      )}

      <Divider dashed className="my-3 border-gray-300" />
    </div>
  );
};
