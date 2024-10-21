import { useCallback, useEffect, useState } from "react";
import { MetricsGarden } from "../../types/metricsGarden";
import { api } from "../../utils/api";

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

  if (loading) return <div></div>;

  return (
    <div className="mt-5">
      <div className="text-[#272930DE] text-2xl mb-5">Metrics Garden</div>

      <div className="grid md:grid-cols-2 gap-5">
        {comments.map((comment) => {
          const star = comment.impactAttestations.find(
            (x) => x.name == "Likely to Recommend"
          )?.value;

          const importance = comment.impactAttestations.find(
            (x) => x.name == "Feeling if didnt exist"
          )?.value;

          let importanceText = ""

          console.log(importance)

          switch (importance) {
            case 1: importanceText = 'Neutral'; break;
            case 2: importanceText = 'Important'; break;
            case 3: importanceText = 'Essential'; break;
          }

          return (
            <div className="flex flex-col">
              <div className="flex">
                <div className="mr-3">
                  <img
                    src={comment.profile.pfpUrl}
                    className="h-12 w-12 rounded-full"
                  ></img>
                </div>
                <div>
                  <div className="font-bold">{comment.profile.displayName}</div>
                  <div className="flex">
                    {star && <div>{star / 2} ★ |&nbsp;</div>}
                    <div>{importanceText} Project</div>
                  </div>
                </div>
              </div>

              <div className="border bg-white border-[#EAECF0] rounded-lg p-4 mt-3 text-[#858796] text-sm h-full flex flex-col justify-between">
                <div>{comment.comment || "-- No comment --"}</div>

                <a href={`https://optimism.easscan.org/attestation/view/${comment.id}`} target="_blank">
                  <div className="flex justify-end mt-2 font-bold text-red-600">
                    <div>View on EAS</div>
                  </div>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
