import React, { useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { handleDownvotesAction, handleUpvotesAction } from "../../actions/forums";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserDetailsAction } from "../../actions/currentUser";
import forumsServices from '../../services/forums';

const ForumPost = ({ post }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser);

  const postedRelativeTime = moment(post.createdAt).fromNow();

  useEffect(() => {
    dispatch(getCurrentUserDetailsAction(currentUser.id));
  }, [dispatch, post, currentUser.id]);

  const handleUpvote = () => {
    forumsServices.setToken(currentUser.token);
    dispatch(handleUpvotesAction(post.id));
  }

  const handleDownvote = () => {
    forumsServices.setToken(currentUser.token);
    dispatch(handleDownvotesAction(post.id));
  }

  // user cannot upvote if he isnt signed in

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
        { postedRelativeTime }
      </div>
      <div className="forum-post-body mb-2">
        <Link to={`/forums/${post.id}`} className="forum-post-body-heading">
          <h3 className="text-xl font-bold mb-1">{post.title}</h3>
        </Link>
        
        <p className="text-base">{post.content}</p>
      </div>
      <div className="forum-post-footer flex items-center">
        <div className="mr-2 flex items-center">
          <i 
            className={`ri-rocket-2-line cursor-pointer text-xl z-10 ${currentUser.postsUpvoted && currentUser.postsUpvoted.find(postId => postId.toString() === post.id.toString()) ? 'text-theme-purple' : ''}`}
            onClick={handleUpvote}
          ></i>
          {post.upvotes}
        </div>
        <div className="mr-4 flex items-center">
          <i 
            className={`ri-rocket-2-line transform rotate-180 cursor-pointer text-xl z-10 ${currentUser.postsDownvoted && currentUser.postsDownvoted.find(postId => postId.toString() === post.id.toString()) ? 'text-theme-red' : ''}`}
            onClick={handleDownvote}
          ></i>
          {post.downvotes}
        </div>
        
        <div className="flex items-center cursor-pointer z-10">
          <i className="ri-chat-1-line mr-1 text-xl"></i>
          comments
        </div>
      </div>
    </div>
  );
}

export default ForumPost;