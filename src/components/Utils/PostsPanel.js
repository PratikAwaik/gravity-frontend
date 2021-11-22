import React from "react";
import { Tab } from "@headlessui/react";
import Forums from "../Forums/Forums";
import PropTypes from "prop-types";
import InfiniteScrollWrapper from "../Utils/InfiniteScrollWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setNextPostsDispatcher } from "../../dispatchers/forums";
import { classNames } from "../../helpers";

const PostsPanel = ({ pageName, baseUrl, searchString }) => {
  const forums = useSelector((state) => state.forums);
  const dispatch = useDispatch();

  return (
    <Tab.Panel
      className={classNames(
        "bg-white rounded-xl py-3",
        "focus:outline-none focus:ring-2 ring-offset-2 ring-white ring-opacity-60"
      )}
    >
      <InfiniteScrollWrapper
        dataLength={forums.results.length}
        nextFunc={() =>
          setNextPostsDispatcher(
            dispatch,
            pageName,
            {
              page: forums[pageName],
              limit: forums.limit,
              searchString,
            },
            baseUrl
          )
        }
        hasMore={forums.hasMore}
      >
        <Forums posts={forums.results} />
      </InfiniteScrollWrapper>
    </Tab.Panel>
  );
};

PostsPanel.propTypes = {
  pageName: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  searchString: PropTypes.string,
};

export default PostsPanel;
