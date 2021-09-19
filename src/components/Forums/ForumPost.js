import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { handleDownvotesAction, handleUpvotesAction } from "../../actions/forums";
import { useDispatch } from "react-redux";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "dompurify";
import MDEditor from "@uiw/react-md-editor";
import { 
  hasDownvotedAlreadyHelper, 
  hasUpvotedAlreadyHelper,
  handleUpvoteHelper,
  handleDownvoteHelper
} from "../../helpers";

const ForumPost = ({ post, currentUser }) => {
  const dispatch = useDispatch();

  const hasUpvotedAlready = hasUpvotedAlreadyHelper(currentUser, post.id);
  const hasDownvotedAlready = hasDownvotedAlreadyHelper(currentUser, post.id);

  const handleUpvoteClick = () => {
    handleUpvoteHelper(dispatch, currentUser, post, hasUpvotedAlready, hasDownvotedAlready, handleUpvotesAction);
  }

  const handleDownvoteClick = () => {
    handleDownvoteHelper(dispatch, currentUser, post, hasUpvotedAlready, hasDownvotedAlready, handleDownvotesAction);
  }

  return (
    <div className="forum-post-container bg-theme-white border-4 border-theme-orange text-theme-black p-2 rounded-md mb-4 relative">
      <div className="forum-post-header text-sm text-theme-gray mb-2 flex items-center">
        Posted by 
        {
          post.user && post.user.username ? 
          <Link to={`/user/${post.user.username}`} className="ml-1 underline z-10">{ post.user.username }</Link> :
          <span className="ml-1 underline z-10">{'[deleted]'}</span>
        }
        <i className="ri-checkbox-blank-circle-fill mx-1 text-xs" style={{fontSize: '0.5rem'}}></i> 
        { moment(post.createdAt).fromNow() }
      </div>
      <div className="forum-post-body max-h-60 overflow-hidden mb-2">
        <Link to={`/forums/${post.id}`} className="forum-post-body-title">
          <h3 className="text-xl font-bold mb-1">{post.title}</h3>
        </Link>
        
        { post.type === 'editor' ?
          <div 
            className="text-base forum-post-body-content" 
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(draftToHtml(JSON.parse(post.content))) }} 
          /> :
          <div className="text-base forum-post-content">
            <MDEditor.Markdown source={post.content} />
          </div>
        }
        
      </div>
      <div className="forum-post-footer flex items-center">
        { currentUser.username ?
          <div className="mr-2 flex items-center">
            <i 
              className={`ri-rocket-2-line cursor-pointer text-xl z-10 ${hasUpvotedAlready ? 'text-theme-purple' : ''}`}
              onClick={handleUpvoteClick}
            ></i>
            {post.upvotes}
          </div> :
          <div>
            <Link to="/login" className="mr-2 flex items-center">
              <i 
                className="ri-rocket-2-line cursor-pointer text-xl z-10"
              ></i>
              {post.upvotes}
            </Link>
          </div>
        }

        { currentUser.username ?
          <div className="mr-4 flex items-center">
            <i 
              className={`ri-rocket-2-line transform rotate-180 cursor-pointer text-xl z-10 ${hasDownvotedAlready ? 'text-theme-red' : ''}`}
              onClick={handleDownvoteClick}
            ></i>
            {post.downvotes}
          </div> :
          <Link to="/login" className="mr-4 flex items-center">
            <i 
              className="ri-rocket-2-line transform rotate-180 cursor-pointer text-xl z-10"
            ></i> 
            {post.downvotes}
          </Link>
        }
        
        <div className="flex items-center cursor-pointer z-10">
          <i className="ri-chat-1-line mr-1 text-xl"></i>
          comments
        </div>
      </div>
    </div>
  );
}

export default ForumPost;