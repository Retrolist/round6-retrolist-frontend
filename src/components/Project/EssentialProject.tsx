import { Icon } from "@iconify/react/dist/iconify.js";
import { MetricsGarden } from "../../types/MetricsGarden";

interface EssentialProjectProps {
  comments: MetricsGarden[];
}

interface SummaryItem {
  type: string;
  count: number;
  percentage: string;
}

// Helper function to map numeric values to importance text
const getImportanceText = (value: number): string => {
  switch (value) {
    case 1:
      return "Neutral";
    case 2:
      return "Somewhat Upset";
    case 3:
      return "Extremely Upset";
    default:
      return "Unknown";
  }
};

// Function to calculate importance summary
const calculateImportanceSummary = (
  comments: MetricsGarden[]
): SummaryItem[] => {
  const summary: Record<string, number> = {
    Neutral: 0,
    "Somewhat Upset": 0,
    "Extremely Upset": 0,
  };

  comments.forEach((comment) => {
    const importance = comment.impactAttestations.find(
      (x) => x.name === "Feeling if didnt exist"
    )?.value;

    const importanceText = getImportanceText(importance ?? 0);
    if (importanceText in summary) {
      summary[importanceText]++;
    }
  });

  const total = comments.length;
  return Object.entries(summary).map(([type, count]) => ({
    type,
    count,
    percentage: total > 0 ? ((count / total) * 100).toFixed(2) + "%" : "0%",
  }));
};

// Component to render each summary row
const SummaryRow: React.FC<SummaryItem> = ({ type, count, percentage }) => (
  <>
    <div>{type}</div>
    <div className="text-end">{count}</div>
    <div className="text-end">{percentage}</div>
  </>
);

export const EssentialProject: React.FC<EssentialProjectProps> = ({
  comments,
}) => {
  const importanceSummary = calculateImportanceSummary(comments);

  return (
    <div className="group rounded-3xl p-[2px] project-card-gradient transition-all duration-300 hover:shadow-xl">
      <div className="bg-white p-4 rounded-[calc(1.5rem-2px)] relative overflow-hidden">
        <div className="flex gap-3 items-start">
          <img src="/svg/essential-project.svg" alt="Essential Project Icon" />
          <div className="text-[30px] font-semibold linear-wipe">
            <div>Essential</div>
            <div className="text-start">Project</div>
          </div>
        </div>
        <img
          src="/img/blue-star.png"
          className="absolute left-0 top-20"
          alt="Blue Star"
        />
        <img
          src="/img/red-star.png"
          className="absolute right-0 top-0"
          alt="Red Star"
        />
        <hr className="my-4" />
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-full bg-[#F5F5F5]">
            <Icon icon="lucide:info" />
          </div>
          <div className="text-md text-[#181D27] font-semibold">
            Major concern if this is not available!
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-base font-semibold text-[#475467]">
          {importanceSummary.map((item, index) => (
            <SummaryRow
              key={index}
              type={item.type}
              count={item.count}
              percentage={item.percentage}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
