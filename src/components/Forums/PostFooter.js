import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { 
  handleDownvoteHelper, 
  handleUpvoteHelper, 
  hasDownvotedAlreadyHelper, 
  hasUpvotedAlreadyHelper 
} from "../../helpers";
import { deletePostAction } from '../../actions/forums';
import forumsServices from '../../services/forums';

const PostFooter = ({
  currentUser, 
  post,
  upvoteAction,
  downvoteAction,
  isPostDetail
}) => {
  const dispatch = useDispatch();

  const hasUpvotedAlready = hasUpvotedAlreadyHelper(currentUser, post.id);
  const hasDownvotedAlready = hasDownvotedAlreadyHelper(currentUser, post.id);

  const handleUpvoteClick = () => {
    handleUpvoteHelper(dispatch, currentUser, post, hasUpvotedAlready, hasDownvotedAlready, upvoteAction);
  }

  const handleDownvoteClick = () => {
    handleDownvoteHelper(dispatch, currentUser, post, hasUpvotedAlready, hasDownvotedAlready, downvoteAction);
  }

  const handleDeletePost = () => {
    forumsServices.setToken(currentUser.token);
    dispatch(deletePostAction(post.id));
  }
  
  return (
    <div className={`forum-post-footer flex items-center justify-between ${isPostDetail ? 'mb-5' : ''}`}>
      <div className="flex items-center">
        { currentUser.username ?
          <div className={`mr-2 flex items-center ${hasUpvotedAlready ? 'text-theme-purple' : ''}`}>
            <i 
              className="ri-rocket-2-line cursor-pointer text-xl z-10"
              onClick={handleUpvoteClick}
            ></i>
            <span className="text-xl">{post.upvotes}</span>
          </div> :
          <Link to="/login" className="mr-2 flex items-center">
            <i 
              className="ri-rocket-2-line cursor-pointer text-xl z-10"
            ></i>
            <span className="text-xl">{post.upvotes}</span>
          </Link>
        }

        { currentUser.username ?
          <div className={`mr-4 flex items-center ${hasDownvotedAlready ? 'text-theme-red' : ''}`}>
            <i 
              className="ri-rocket-2-line transform rotate-180 cursor-pointer text-xl z-10"
              onClick={handleDownvoteClick}
            ></i>
            <span className="text-xl">{post.downvotes}</span>
          </div> :
          <Link to="/login" className="mr-4 flex items-center">
            <i 
              className="ri-rocket-2-line transform rotate-180 cursor-pointer text-xl z-10"
            ></i> 
            <span className="text-xl">{post.downvotes}</span>
          </Link>
        }
        
        <div className="flex items-center cursor-pointer z-10">
          <i className="ri-chat-1-line mr-1 text-xl"></i>
          {post.comments}
          comments
        </div>
      </div>

      {
        post.user && post.user.id === currentUser.id &&
        <div className="flex items-center mr-5">
          <div className="mr-3">
            <i className="ri-edit-2-line cursor-pointer text-xl z-10 text-theme-blue"></i>
          </div>
          <div onClick={handleDeletePost}>
            <i className="ri-delete-bin-5-line cursor-pointer text-xl z-10 text-theme-red"></i>
          </div>
        </div>
      }
    </div>
  );
}

PostFooter.propTypes = {
  currentUser: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  upvoteAction: PropTypes.func.isRequired,
  downvoteAction: PropTypes.func.isRequired,
  isPostDetail: PropTypes.bool.isRequired
}

export default PostFooter;