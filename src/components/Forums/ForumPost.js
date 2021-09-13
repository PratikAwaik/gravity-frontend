import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const ForumPost = ({ post }) => {
  const postedRelativeTime = moment(post.createdAt).fromNow();

  return (
    <div className="forum-post-container bg-theme-white border-4 border-theme-orange text-theme-black p-2 rounded-md mb-4">
      <div className="forum-post-header text-sm text-theme-gray mb-2 flex items-center">
        Posted by 
        <Link to={`/user/${post.user.username}`} className="ml-1 underline">{ post.user.username }</Link>
        <i className="ri-checkbox-blank-circle-fill mx-1 text-xs" style={{fontSize: '0.5rem'}}></i> 
        { postedRelativeTime }
      </div>
      <div className="forum-post-body mb-2">
        <h3 className="text-xl font-bold mb-1">{post.title}</h3>
        <p className="text-base">{post.content}</p>
      </div>
      <div className="forum-post-footer flex items-center">
        <i className="ri-rocket-2-line mr-2 cursor-pointer text-xl"></i>
        <i className="ri-rocket-2-line transform rotate-180 mr-4 cursor-pointer text-xl"></i>
        <div className="flex items-center cursor-pointer">
          <i className="ri-chat-1-line mr-1 text-xl"></i>
          comments
        </div>
      </div>
    </div>
  );
}

export default ForumPost;