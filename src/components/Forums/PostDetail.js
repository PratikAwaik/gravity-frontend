import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllPostsDispatcher } from "../../dispatchers/forums";
import { createCommentDispatcher } from "../../dispatchers/comments";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";
import FancyEditor from "../Editors/FancyEditor";
import { currentUserDetailsDispatcher } from "../../dispatchers/user";

const Comments = React.lazy(() => import("../Comments/Comments"));

const PostDetail = () => {
  const [editorContent, setEditorContent] = useState("");
  const [post, setPost] = useState({});
  const [toEdit, setToEdit] = useState(false);
  const { id } = useParams();
  const { currentUser, forums } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      if (forums.length === 0 || !forums.find((post) => post.id === id)) {
        await getAllPostsDispatcher(dispatch);
        setPost(forums.find((post) => post.id === id));
      } else {
        setPost(forums.find((post) => post.id === id));
      }
    })();
  }, [dispatch, forums, id]);

  useEffect(() => {
    if (currentUser.id) currentUserDetailsDispatcher(dispatch);
  }, [dispatch, currentUser.id]);

  const handleCreateComment = async () => {
    const commentData = {
      content: editorContent,
      level: 0,
    };
    await createCommentDispatcher(
      dispatch,
      post.id,
      currentUser.token,
      commentData
    );
    setEditorContent("");
  };

  return post && post.id ? (
    <div className="mt-24 mb-16 mx-auto max-w-4xl bg-transparent border-2 rounded-md shadow-md post-detail-container">
      <div className="p-4 post-detail-wrapper">
        <PostHeader post={post} />
        <PostBody
          post={post}
          isPostDetail={true}
          toEdit={toEdit}
          setToEdit={setToEdit}
        />
        <PostFooter
          currentUser={currentUser}
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
              className="mt-2 px-4 py-1 border-2 border-theme-green rounded-md hover:bg-theme-green hover:text-theme-white"
              onClick={handleCreateComment}
            >
              Comment
            </button>
          </div>
        )}

        <hr />
        <div className="my-4 post-detail-comments">
          <React.Suspense>
            <Comments post={post} />
          </React.Suspense>
        </div>
      </div>
    </div>
  ) : null;
};

export default PostDetail;
