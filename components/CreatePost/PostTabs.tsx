import * as React from "react";

interface PostTabsProps {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}

export default function PostTabs({ currentTab, setCurrentTab }: PostTabsProps) {
  return (
    <div className="flex items-center mb-2">
      <TabButton
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        type="TEXT"
        label="Post"
        iconClassName="ri-file-text-line"
      />
      <TabButton
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        type="MEDIA"
        label="Image/Video"
        iconClassName="ri-image-line"
      />
      <TabButton
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        type="LINK"
        label="Link"
        className="border-r-0"
        iconClassName="ri-links-line"
      />
    </div>
  );
}

interface TabButtonProps {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
  type: string;
  label: string;
  iconClassName: string;
  className?: string;
}

const TabButton = ({
  currentTab,
  setCurrentTab,
  className,
  type,
  label,
  iconClassName,
}: TabButtonProps) => {
  return (
    <button
      type="button"
      className={`w-1/3 text-sm font-bold p-4 py-3 z-10 text-center border border-t-0 border-l-0 border-theme-gray-line flex items-center justify-center text-theme-gray-action-icon whitespace-nowrap hover:bg-theme-blue-50 ${
        currentTab === type
          ? "bg-theme-blue-50 text-theme-blue border-b-2 border-b-theme-blue"
          : ""
      } ${className}`}
      onClick={() => setCurrentTab(type)}
    >
      <i className={`${iconClassName} text-xl font-normal`}></i>
      <span className="ml-2">{label}</span>
    </button>
  );
};
