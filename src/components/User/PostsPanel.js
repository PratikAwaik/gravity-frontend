import React from "react";
import { Tab } from "@headlessui/react";
import PostBody from "../Forums/PostBody";
import PostHeader from "../Forums/PostHeader";

const PostsPanel = ({ posts, classNames }) => {
  return (
    <Tab.Panel
      className={classNames(
        "bg-white rounded-xl p-3",
        "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
      )}
    >
      <ul className="list-none">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="w-full h-full relative rounded-md hover:bg-coolGray-100 bg-transparent p-4 border-2 mb-6 shadow-md"
            >
              <PostHeader post={post} />
              <PostBody post={post} isPostDetail={false} />

              <div className="flex items-center">
                <div className="mr-2 flex items-center">
                  <i className="ri-rocket-2-line cursor-pointer text-xl z-10"></i>
                  <span className="text-xl">{post.upvotes}</span>
                </div>
                <div className="mr-4 flex items-center">
                  <i className="ri-rocket-2-line transform rotate-180 cursor-pointer text-xl z-10"></i>
                  <span className="text-xl">{post.downvotes}</span>
                </div>
                <div className="flex items-center cursor-pointer z-10">
                  <i className="ri-chat-1-line mr-1 text-xl"></i>
                  <span className="mr-1">{post.comments.length}</span>
                  comments
                </div>
              </div>
            </div>
          ))
        ) : (
          <span className="block text-center text-2xl">
            Nothing here yet...
          </span>
        )}
      </ul>
    </Tab.Panel>
  );
};

export default PostsPanel;
