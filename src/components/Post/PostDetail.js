import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { createCommentDispatcher } from "../../dispatchers/comments";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";
import FancyEditor from "../Utils/FancyEditor";
import Comments from "../Comments/Comments";
import { currentUserDetailsDispatcher } from "../../dispatchers/currentUser";
import { getPostDispatcher, unsetPostDispatcher } from "../../dispatchers/post";
import LoadingWrapper from "../Utils/LoadingWrapper";
import Swal from "sweetalert2";
import { successPopup } from "../../helpers";

const PostDetail = () => {
  const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [toEdit, setToEdit] = useState(false);
  const { id } = useParams();
  const { currentUser, post } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    (async function () {
      await getPostDispatcher(dispatch, id, history);
      setLoading(false);
      window.scrollTo(0, 0);
    })();

    return () => unsetPostDispatcher(dispatch);
  }, [dispatch, id, history]);

  useEffect(() => {
    if (currentUser.id) currentUserDetailsDispatcher(dispatch);
  }, [dispatch, currentUser.id]);

  const handleCreateComment = async () => {
    const commentData = {
      content: editorContent,
      level: 0,
    };
    Swal.showLoading();
    await createCommentDispatcher(
      dispatch,
      post.id,
      currentUser.token,
      commentData
    );
    await successPopup("Commented Successfully!");
    setEditorContent("");
  };

  return (
    <LoadingWrapper loading={loading} width="w-screen" height="h-screen">
      <div className="mt-20 sm:mt-24 mb-16 mx-auto max-w-4xl bg-transparent border-2 sm:rounded-md shadow-md post-detail-container">
        <div className="p-2 sm:p-4 post-detail-wrapper">
          <PostHeader post={post} />
          <PostBody
            post={post}
            isPostDetail={true}
            toEdit={toEdit}
            setToEdit={setToEdit}
          />
          <PostFooter
            post={post}
            isPostDetail={true}
            toEdit={toEdit}
            setToEdit={setToEdit}
          />

          {currentUser.username && (
            <div className="post-detail-add-comment mb-5">
              <span className="block text-sm mb-3 text-theme-gray">
                Comment as
                <Link className="ml-1 underline" to={`/user/${currentUser.id}`}>
                  {currentUser.username}
                </Link>
              </span>

              <FancyEditor
                editorContent={editorContent}
                setEditorContent={setEditorContent}
                isPost={false}
              />

              <button
                type="button"
                className="mt-2 px-4 py-1 border-2 border-theme-green text-sm sm:text-base rounded-md hover:bg-theme-green hover:text-theme-white"
                onClick={handleCreateComment}
              >
                Comment
              </button>
            </div>
          )}

          <hr />
          <div className="my-4 post-detail-comments">
            <Comments post={post} />
          </div>
        </div>
      </div>
    </LoadingWrapper>
  );
};

export default PostDetail;
