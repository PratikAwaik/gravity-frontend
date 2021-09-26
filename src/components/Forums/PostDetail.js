import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllPostsDispatcher } from "../../dispatchers/forums";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";
import FancyEditor from "../Editors/FancyEditor";
import EditPost from "./EditPost";
import { currentUserDetailsDispatcher } from "../../dispatchers/user";

const PostDetail = () => {
  const [editorContent, setEditorContent] = useState("");
  const [post, setPost] = useState({});
  const [toEdit, setToEdit] = useState(false);
  const { id } = useParams();
  const { currentUser, forums } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      if (!toEdit) {
        if (forums.length === 0) {
          await getAllPostsDispatcher(dispatch);
          setPost(forums.find((post) => post.id === id));
        } else {
          setPost(forums.find((post) => post.id === id));
        }
      }
    })();
  }, [dispatch, forums, id, toEdit]);

  useEffect(() => {
    if (currentUser.id) currentUserDetailsDispatcher(dispatch);
  }, [dispatch, currentUser.id]);

  return post ? (
    post.id && toEdit ? (
      <EditPost post={post} toEdit={toEdit} setToEdit={setToEdit} />
    ) : (
      <div className="mt-24 mb-16 mx-auto max-w-3xl bg-transparent border-2 rounded-md shadow-md post-detail-container">
        <div className="p-4 post-detail-wrapper">
          <PostHeader post={post} />
          <PostBody post={post} isPostDetail={true} />
          <PostFooter
            currentUser={currentUser}
            post={post}
            isPostDetail={true}
            toEdit={toEdit}
            setToEdit={setToEdit}
          />

          {currentUser.username && (
            <div className="post-detail-add-comment mb-5">
              <span className="text-sm mb-3 text-theme-gray">
                Comment as
                <Link
                  className="ml-1 underline"
                  to={`/user/${currentUser.username}`}
                >
                  {currentUser.username}
                </Link>
              </span>

              <FancyEditor
                editorContent={editorContent}
                setEditorContent={setEditorContent}
              />
            </div>
          )}

          <div className="post-detail-comments"></div>
        </div>
      </div>
    )
  ) : null;
};

export default PostDetail;
