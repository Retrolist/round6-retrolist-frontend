import { useEffect, useRef, useState } from "react";
import { Project } from "../../types/Project";

const tabs = [
  "About",
  "Impact Garden",
  "Impact statement",
  "Funding sources",
  "Contract Address",
  "Links",
];
const links = [
  "about",
  "impact-garden",
  "impact-statement",
  "funding-sources",
  "contract-address",
  "links",
];

interface TabNavigateProps {
  project: Project;
}

const TabNavigation = ({ project }: TabNavigateProps) => {
  const [activeTab, setActiveTab] = useState("About");
  const [tabPosition, setTabPosition] = useState({ left: 0, width: 0 });

  // Use a ref to store an array of button elements or null
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const activeTabIndex = tabs.indexOf(activeTab);
    const activeTabElement = tabRefs.current[activeTabIndex];
    if (activeTabElement) {
      const { offsetLeft, offsetWidth } = activeTabElement;
      setTabPosition({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab]);

  const shouldRenderTab = (index: number): boolean => {
    switch (index) {
      case 2:
        return Boolean(project?.application);
      case 3:
        return project?.fundingSources?.length > 0;
      case 4:
        return project?.contributionLinks?.length > 0;
      case 5:
        return Boolean(project?.attestationBody?.links);
      default:
        return true;
    }
  };

  return (
    <div className="w-full overflow-x-auto relative">
      <div className="flex border-b border-gray-200 space-x-8 whitespace-nowrap px-1 pb-3">
        {tabs.map((tab, index) =>
          shouldRenderTab(index) ? (
            <a
              href={`#${links[index]}`}
              key={tab}
              ref={(el) => (tabRefs.current[index] = el)}
              onClick={() => setActiveTab(tab)}
              className={`text-md ${
                activeTab === tab
                  ? "text-[#FA280A] font-semibold"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </a>
          ) : null
        )}
      </div>

      <div
        className="border-b-2 border-[#FA280A] absolute bottom-0 transition-all duration-300"
        style={{
          left: `${tabPosition.left}px`,
          width: `${tabPosition.width}px`,
        }}
      />
    </div>
  );
};

export default TabNavigation;
