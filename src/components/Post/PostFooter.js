import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import {
  errorPopup,
  handleDownvoteHelper,
  handleUpvoteHelper,
  hasDownvotedAlreadyHelper,
  hasUpvotedAlreadyHelper,
} from "../../helpers";
import { deletePostDispatcher } from "../../dispatchers/forums";

const PostFooter = ({ post, isPostDetail, setToEdit }) => {
  const { currentUser, comments } = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();

  const hasUpvotedAlready = hasUpvotedAlreadyHelper(
    currentUser,
    post.id,
    "postsUpvoted"
  );
  const hasDownvotedAlready = hasDownvotedAlreadyHelper(
    currentUser,
    post.id,
    "postsDownvoted"
  );

  const handleUpvoteClick = () => {
    handleUpvoteHelper(
      dispatch,
      currentUser,
      post,
      hasUpvotedAlready,
      hasDownvotedAlready
    );
  };

  const handleDownvoteClick = () => {
    handleDownvoteHelper(
      dispatch,
      currentUser,
      post,
      hasUpvotedAlready,
      hasDownvotedAlready
    );
  };

  const toggleEdit = () => {
    setToEdit(true);
  };

  const handleDeletePost = async () => {
    const swalObject = {
      title: "Are you sure?",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, go back!",
      position: "center",
      icon: "warning",
      customClass: {
        confirmButton:
          "bg-theme-green text-theme-white border border-theme-green rounded-md",
        cancelButton: "bg-theme-gray, border border-theme-gray rounded-md",
      },
    };

    const result = await Swal.fire(swalObject);
    if (result.isConfirmed) {
      try {
        await deletePostDispatcher(dispatch, post.id, currentUser.token);
        history.goBack();
        Swal.fire({
          icon: "success",
          title: "Post deleted Successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
      } catch (err) {
        errorPopup(err);
      }
    }
  };

  return (
    <div
      className={`forum-post-footer flex items-center justify-between ${
        isPostDetail ? "mb-5" : ""
      }`}
    >
      <div className="flex items-center">
        {currentUser.username ? (
          <div
            className={`mr-2 flex items-center ${
              hasUpvotedAlready ? "text-theme-green" : ""
            }`}
          >
            <i
              className={`ri-rocket-2-${
                hasUpvotedAlready ? "fill" : "line"
              } cursor-pointer text-lg sm:text-xl z-10`}
              onClick={handleUpvoteClick}
            ></i>
            <span className="text-xl">{post.upvotes}</span>
          </div>
        ) : (
          <Link to="/login" className="mr-2 flex items-center">
            <i className="ri-rocket-2-line cursor-pointer text-lg sm:text-xl z-10"></i>
            <span className="text-xl">{post.upvotes}</span>
          </Link>
        )}

        {currentUser.username ? (
          <div
            className={`mr-4 flex items-center ${
              hasDownvotedAlready ? "text-theme-red" : ""
            }`}
          >
            <i
              className={`ri-rocket-2-${
                hasDownvotedAlready ? "fill" : "line"
              } transform rotate-180 cursor-pointer text-lg sm:text-xl z-10`}
              onClick={handleDownvoteClick}
            ></i>
            <span className="text-xl">{post.downvotes}</span>
          </div>
        ) : (
          <Link to="/login" className="mr-4 flex items-center">
            <i className="ri-rocket-2-line transform rotate-180 cursor-pointer text-lg sm:text-xl z-10"></i>
            <span className="text-xl">{post.downvotes}</span>
          </Link>
        )}

        <div className="flex items-center cursor-pointer z-10">
          <i className="ri-chat-1-line mr-1 text-lg sm:text-xl"></i>
          <span className="mr-1">
            {isPostDetail ? comments.length : post.comments.length}
          </span>
          comments
        </div>
      </div>

      {post.user && post.user.id === currentUser.id && isPostDetail && (
        <div className="flex items-center mr-5">
          <button
            to={`/forums/${post.id}/edit`}
            onClick={toggleEdit}
            className="mr-3"
          >
            <i className="ri-edit-2-line cursor-pointer text-xl z-10 text-theme-blue"></i>
          </button>
          <button onClick={handleDeletePost}>
            <i className="ri-delete-bin-5-line cursor-pointer text-xl z-10 text-theme-red"></i>
          </button>
        </div>
      )}
    </div>
  );
};

PostFooter.propTypes = {
  post: PropTypes.object.isRequired,
  isPostDetail: PropTypes.bool.isRequired,
  setToEdit: PropTypes.func,
};

export default PostFooter;
