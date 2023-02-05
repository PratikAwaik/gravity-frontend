import Head from "next/head";
import SearchTabs from "../components/Search/SearchTabs";
import SearchPosts from "../components/Search/SearchPosts";
import SearchComments from "../components/Search/SearchComments";
import SearchCommunities from "../components/Search/SearchCommunities";
import SearchPeople from "../components/Search/SearchPeople";
import { useRouter } from "next/router";
import { useState } from "react";
import { SearchTabsTypes } from "../models/utils";

export default function SearchResults() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<SearchTabsTypes | null>(null);
  const titleText = `Search Results - ${router.query.q}`;

  return (
    <>
      <Head>
        <title>{titleText}</title>
      </Head>
      <div className="max-w-5xl mx-auto px-6 pt-6 mb-4">
        <div className="w-full">
          <SearchTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
          <div className="pt-2 mt-2">
            {currentTab === SearchTabsTypes.POSTS && <SearchPosts />}
            {currentTab === SearchTabsTypes.COMMENTS && <SearchComments />}
            {currentTab === SearchTabsTypes.COMMUNITIES && (
              <SearchCommunities />
            )}
            {currentTab === SearchTabsTypes.PEOPLE && <SearchPeople />}
          </div>
        </div>
      </div>
    </>
  );
}
