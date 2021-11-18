import React from "react";
import { Tab } from "@headlessui/react";
import Forums from "../Forums/Forums";
import PropTypes from "prop-types";
import InfiniteScrollWrapper from "../Utils/InfiniteScrollWrapper";
import { useDispatch } from "react-redux";
import { setNextPostsDispatcher } from "../../dispatchers/forums";

const PostsPanel = ({ forums, classNames, baseUrl }) => {
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
            "userPage",
            {
              page: forums.userPage,
              limit: forums.limit,
            },
            `${baseUrl}/posts`
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
  forums: PropTypes.object.isRequired,
  classNames: PropTypes.func.isRequired,
  baseUrl: PropTypes.string.isRequired,
};

export default PostsPanel;
