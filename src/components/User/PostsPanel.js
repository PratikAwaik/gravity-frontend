import React from "react";
import { Tab } from "@headlessui/react";
import Forums from "../Forums/Forums";
import PropTypes from "prop-types";
import InfiniteScrollWrapper from "../Utils/InfiniteScrollWrapper";
import { getUserPostsDispatcher } from "../../dispatchers/userProfile";
import { useDispatch, useSelector } from "react-redux";

const PostsPanel = ({ posts, classNames }) => {
  const userProfile = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();

  return (
    <Tab.Panel
      className={classNames(
        "bg-white rounded-xl py-3",
        "focus:outline-none focus:ring-2 ring-offset-2 ring-white ring-opacity-60"
      )}
    >
      <InfiniteScrollWrapper
        dataLength={posts.length}
        nextFunc={() =>
          getUserPostsDispatcher(dispatch, userProfile.user.id, {
            page: userProfile.posts.page,
            limit: userProfile.posts.limit,
          })
        }
        hasMore={posts.length % userProfile.posts.limit === 0}
      >
        <Forums posts={posts} />
      </InfiniteScrollWrapper>
    </Tab.Panel>
  );
};

PostsPanel.propTypes = {
  posts: PropTypes.array.isRequired,
  classNames: PropTypes.func.isRequired,
};

export default PostsPanel;
