import { useEffect, useState } from "react";

interface ProjectCategoryButtonProps {
  text: string;
  amount?: number;
  categories: string[];
  category: string;
  setCategory: (category: string) => any;
}

export const ProjectCategoryButton = ({
  text,
  amount,
  categories,
  category,
  setCategory,
}: ProjectCategoryButtonProps) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!category && categories.length == 0) {
      setActive(true);
    } else if (category && categories.indexOf(category) != -1) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [categories]);

  return (
    <button
      className={
        "p-2 flex px-4 rounded-xl transition " +
        (active
          ? "bg-[#323A43] text-white"
          : "bg-[#F5F5F5] text-[#202327] hover:bg-gray-300")
      }
      onClick={() => setCategory(category)}
    >
      <div>{text}</div>
      {amount && (
        <div className="bg-white rounded-xl ml-2 px-2 py-1 text-xs text-[#202327]">
          {amount}
        </div>
      )}
    </button>
  );
};
