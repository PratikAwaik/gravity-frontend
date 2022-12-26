import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { CREATE_COMMENT } from "../../graphql/comments/mutation";
import { GET_ALL_POST_COMMENTS } from "../../graphql/comments/query";
import { useAuth } from "../../utils/Auth";
import FancyEditor from "../Utils/FancyEditor";

export default function PostComments() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [editorContent, setEditorContent] = useState("");
  const [parentId, setParentId] = useState(null);
  const [submittingComment, setSubmittingComment] = useState(false);

  const { loading, data } = useQuery(GET_ALL_POST_COMMENTS, {
    variables: {
      postId: router.query.postId ?? "",
      parentId: parentId,
    },
  });

  const [createComment] = useMutation(CREATE_COMMENT, {
    refetchQueries: [
      {
        query: GET_ALL_POST_COMMENTS,
        variables: { postId: router.query.postId ?? "", parentId: parentId },
      },
    ],
    onError(error, clientOptions) {
      // set error
    },
    onCompleted(data, clientOptions) {
      // set on completed
    },
  });
  console.log(data);
  const handleCreateCommentClick = () => {
    if (!editorContent) return;
    setSubmittingComment(true);
    createComment({
      variables: {
        content: editorContent,
        postId: router.query.postId ?? "",
        parentId: parentId,
      },
    });
    setSubmittingComment(false);
    setEditorContent("");
  };

  return (
    <div className="w-full">
      {currentUser?.id && (
        <div className="w-full">
          <p className="text-xs mb-2">
            Comment as{" "}
            <Link href={`/user/${currentUser.username}`}>
              <a className="text-theme-link-text-color hover:underline">
                {currentUser.username}
              </a>
            </Link>
          </p>
          <FancyEditor
            editorContent={editorContent}
            setEditorContent={setEditorContent}
            isPost={false}
            placeholder="What are your thoughts?"
          />
          <div className="w-full flex items-center justify-end">
            <button
              type="button"
              className={`px-4 py-1.5 rounded-3xl text-sm bg-theme-blue text-white font-medium hover:brightness-110 ${
                submittingComment ? "grayscale cursor-not-allowed" : ""
              }`}
              disabled={submittingComment}
              onClick={handleCreateCommentClick}
            >
              Comment
            </button>
          </div>
        </div>
      )}
      <div className="w-full h-0.5 border-b border-b-theme-gray-line my-4"></div>
    </div>
  );
}
