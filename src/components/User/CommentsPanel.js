import React from "react";
import { Tab } from "@headlessui/react";
import { HashLink } from "react-router-hash-link";
import CommentBody from "../Comments/CommentBody";
import moment from "moment";
import CommentFooter from "../Comments/CommentFooter";
import PropTypes from "prop-types";
import { scrollWithOffset } from "../../helpers";

const CommentsPanel = ({ comments, classNames }) => {
  return (
    <Tab.Panel
      className={classNames(
        "bg-white rounded-xl py-3",
        "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
      )}
    >
      <ul className="list-none pl-0">
        {comments.length > 0 ? (
          comments.map(
            (comment) =>
              comment.user && (
                <div
                  key={comment.id}
                  className="w-full h-full sm:rounded-md hover:bg-coolGray-100 bg-transparent p-2 sm:p-4 border-2 mb-3 sm:mb-6 shadow-md"
                >
                  <HashLink
                    smooth
                    to={`/forums/${comment.post}#${comment.id}`}
                    scroll={(el) => scrollWithOffset(el, "smooth")}
                  >
                    {/* Comment Header */}
                    <div className="flex items-center text-sm text-theme-gray mb-2 z-10 comment-header">
                      <img
                        className="w-6 h-6 rounded-full mr-2"
                        src={comment.user.profilePic}
                        alt="User Profile Pic"
                      />
                      <span
                        to={`/user/${comment.user.id}`}
                        className="mr-2 underline comment-user"
                      >
                        {comment.user.username}
                      </span>
                      <span className="comment-time">
                        {moment(comment.createdAt).fromNow()}
                      </span>
                    </div>

                    {/* Comment Body */}
                    <CommentBody comment={comment} />

                    {/* Comment Footer  */}
                    <CommentFooter comment={comment} />
                  </HashLink>
                </div>
              )
          )
        ) : (
          <span className="block text-center text-2xl">
            Nothing here yet...
          </span>
        )}
      </ul>
    </Tab.Panel>
  );
};

CommentsPanel.propTypes = {
  comments: PropTypes.array.isRequired,
  classNames: PropTypes.func.isRequired,
};

export default CommentsPanel;
