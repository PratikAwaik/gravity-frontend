import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { setSearchPostsDispatcher } from "../../dispatchers/forums";
import { setSearchSubredditsDispatcher } from "../../dispatchers/subreddit";
import LoadingWrapper from "../Utils/LoadingWrapper";
import Tabs from "../Utils/Tabs";
import PostsPanel from "../Utils/PostsPanel";
import SubredditsPanel from "../Utils/SubredditsPanel";

const parseLocation = (location) => {
  return location.search.slice(0).split("=")[1].trim();
};

const SearchResults = () => {
  const [loading, setLoading] = useState(true);
  const { forums, subreddits } = useSelector((state) => state);
  const location = useLocation();
  const searchString = useRef("");
  const [categories] = useState({
    Posts: forums.results,
    Communities: subreddits,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (
        forums.searchPage === 1 ||
        searchString.current !== parseLocation(location)
      ) {
        searchString.current = parseLocation(location);
        await setSearchPostsDispatcher(dispatch, {
          searchString: searchString.current,
          page: 1,
          limit: forums.limit,
        });
        await setSearchSubredditsDispatcher(dispatch, {
          searchString: searchString.current,
        });
        setLoading(false);
      }
    })();
  }, [dispatch, forums.searchPage, forums.limit, location]);

  return (
    <LoadingWrapper loading={loading}>
      <div className="search-results">
        <div className="search-results-header p-3 bg-theme-white">
          <h3 className="font-bold text-center">
            Showing Results for "{searchString.current}"
          </h3>
        </div>

        <div className="my-5 max-w-4xl mx-auto">
          <Tabs categories={categories}>
            <PostsPanel
              pageName="searchPage"
              baseUrl={`${process.env.REACT_APP_API_URL}/api/forums/search`}
              searchString={searchString.current}
            />
            <SubredditsPanel subreddits={subreddits} />
          </Tabs>
        </div>
      </div>
    </LoadingWrapper>
  );
};

export default SearchResults;
