import { flatMap, map, reduce } from "lodash";
import { useState, useEffect } from "react";

export function useOPDistributionR4(): [
  {
    [category: string]: { [projectId: string]: number };
  },
  {
    [category: string]: { [projectId: string]: number };
  },
  { [projectId: string]: number },
  boolean
] {
  const [data, setData] = useState<{
    [category: string]: { [projectId: string]: number };
  }>({});
  const [dataOSS, setDataOSS] = useState<{
    [category: string]: { [projectId: string]: number };
  }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        {
          const response = await fetch("/dataset/rpgf4/categoryOP.json");
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const result = await response.json();
          setData(result);
        }

        {
          const response = await fetch("/dataset/rpgf4/categoryOSS.json");
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const result = await response.json();
          setDataOSS(result);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Flatten the grouped data
  const flattenedData = flatMap(data, (items) =>
    map(items, (totalOP, id) => ({ id, totalOP }))
  );

  // Convert flattened data to an object with 'id': 'totalOP'
  const result = reduce(
    flattenedData,
    (acc: { [projectId: string]: number }, item) => {
      acc[item.id] = item.totalOP;
      return acc;
    },
    {}
  );

  return [data, dataOSS, result, loading];
}
