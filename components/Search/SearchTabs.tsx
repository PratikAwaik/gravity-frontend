import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SearchTabsTypes } from "../../models/utils";

interface SearchTabsProps {
  currentTab: SearchTabsTypes | null;
  setCurrentTab: React.Dispatch<React.SetStateAction<SearchTabsTypes | null>>;
}

export default function SearchTabs({
  currentTab,
  setCurrentTab,
}: SearchTabsProps) {
  const router = useRouter();
  const { q, tab } = router.query;

  useEffect(() => {
    if (tab) {
      setCurrentTab(tab as SearchTabsTypes);
    } else setCurrentTab(SearchTabsTypes.POSTS);
  }, [router.query.tab]);

  return (
    <div className="flex items-center font-theme-font-family-noto">
      <Link href={`/search?q=${q}&tab=${SearchTabsTypes.POSTS}`}>
        <a className="mr-1">
          <button
            type="button"
            className={`py-3 px-5 flex items-center justify-center font-bold rounded-full hover:bg-theme-gray-field text-sm ${
              currentTab === SearchTabsTypes.POSTS && "bg-theme-gray-field"
            }`}
            onClick={() => setCurrentTab(SearchTabsTypes.POSTS)}
          >
            Posts
          </button>
        </a>
      </Link>
      <Link href={`/search?q=${q}&tab=${SearchTabsTypes.COMMENTS}`}>
        <a className="mr-1">
          <button
            type="button"
            className={`py-3 px-5 flex items-center justify-center font-bold rounded-full hover:bg-theme-gray-field text-sm ${
              currentTab === SearchTabsTypes.COMMENTS && "bg-theme-gray-field"
            }`}
            onClick={() => setCurrentTab(SearchTabsTypes.COMMENTS)}
          >
            Comments
          </button>
        </a>
      </Link>
      <Link href={`/search?q=${q}&tab=${SearchTabsTypes.COMMUNITIES}`}>
        <a className="mr-1">
          <button
            type="button"
            className={`py-3 px-5 flex items-center justify-center font-bold rounded-full hover:bg-theme-gray-field text-sm ${
              currentTab === SearchTabsTypes.COMMUNITIES &&
              "bg-theme-gray-field"
            }`}
            onClick={() => setCurrentTab(SearchTabsTypes.COMMUNITIES)}
          >
            Communities
          </button>
        </a>
      </Link>
      <Link href={`/search?q=${q}&tab=${SearchTabsTypes.PEOPLE}`}>
        <a className="mr-1">
          <button
            type="button"
            className={`py-3 px-5 flex items-center justify-center font-bold rounded-full hover:bg-theme-gray-field text-sm ${
              currentTab === SearchTabsTypes.PEOPLE && "bg-theme-gray-field"
            }`}
            onClick={() => setCurrentTab(SearchTabsTypes.PEOPLE)}
          >
            People
          </button>
        </a>
      </Link>
    </div>
  );
}
