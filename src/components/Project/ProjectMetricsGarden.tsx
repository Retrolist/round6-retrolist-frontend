import { useCallback, useEffect, useState } from "react";
import { MetricsGarden } from "../../types/MetricsGarden";
import { api } from "../../utils/api";
import { Comment } from "./Comment";
import { EssentialProject } from "./EssentialProject";
import RatingDistribution from "./RatingDistribution";
import Reviewer from "./Reviewers";

export default function ProjectMetricsGarden({
  projectId,
}: {
  projectId: string;
}) {
  const [comments, setComments] = useState<MetricsGarden[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshData = useCallback(async () => {
    setLoading(true);
    const response = await api.get(`/projects/${projectId}/metricsgarden`);
    let comments: MetricsGarden[] = response.data;
    comments = comments.sort((a, b) => {
      const aStar =
        a.impactAttestations.find((x) => x.name == "Likely to Recommend")
          ?.value || 0;
      const bStar =
        b.impactAttestations.find((x) => x.name == "Likely to Recommend")
          ?.value || 0;

      const aImportance =
        a.impactAttestations.find((x) => x.name == "Feeling if didnt exist")
          ?.value || 0;
      const bImportance =
        b.impactAttestations.find((x) => x.name == "Feeling if didnt exist")
          ?.value || 0;

      if (aStar > bStar) return -1;
      if (aStar < bStar) return 1;

      if (aImportance > bImportance) return -1;
      if (aImportance < bImportance) return 1;

      return a.time - b.time;
    });

    setComments(comments);
    setLoading(false);
  }, [setComments, projectId]);

  useEffect(() => {
    if (projectId) {
      refreshData();
    }
  }, [projectId]);

  const star = comments
    .map((item) =>
      item.impactAttestations
        .filter((att) => att.name === "Likely to Recommend")
        .map((att) => att.value / 2)
    )
    .flat(); // Use flat() to flatten the nested arrays

  if (loading) return <div></div>;

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-[#272930DE] text-2xl" id="impact-garden">
            Impact Garden
          </div>
          <div className="mt-1 font-normal text-md text-[#535862] mb-4">
            Understand the impact of your project
          </div>
        </div>
        <img src="/svg/metric-garden.svg" alt="" />
      </div>
      <div className="flex gap-4 mb-4">
        <div className="w-1/2 flex flex-col justify-between">
          <RatingDistribution star={star} />
          <Reviewer comments={comments} />
        </div>
        <div className="w-1/2">
          <EssentialProject comments={comments} />
        </div>
      </div>
      <Comment comments={comments} />
    </div>
  );
}
