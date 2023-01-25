import { UserTabsTypes } from "../../models/user";

interface UserTabsProps {
  currentTab: UserTabsTypes;
  setCurrentTab: (tab: UserTabsTypes) => void;
}

export default function UserTabs({ currentTab, setCurrentTab }: UserTabsProps) {
  return (
    <div className="w-full h-full">
      <div className="flex items-end h-full">
        <button
          className={`h-full text-sm font-medium flex items-center justify-center whitespace-nowrap py-0 px-2 mr-2 uppercase ${
            currentTab === UserTabsTypes.POSTS
              ? "text-theme-blue border-b-2 border-b-theme-blue"
              : "text-theme-gray-400 border-b-2 border-b-white"
          }`}
          onClick={() => setCurrentTab(UserTabsTypes.POSTS)}
        >
          posts
        </button>
        <button
          className={`h-full text-sm font-medium flex items-center justify-center whitespace-nowrap py-0 px-2 mr-1 uppercase ${
            currentTab === UserTabsTypes.COMMENTS
              ? "text-theme-blue border-b-2 border-b-theme-blue"
              : "text-theme-gray-400 border-b-2 border-b-white"
          }`}
          onClick={() => setCurrentTab(UserTabsTypes.COMMENTS)}
        >
          comments
        </button>
      </div>
    </div>
  );
}
