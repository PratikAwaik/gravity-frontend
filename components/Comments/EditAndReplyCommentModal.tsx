import * as React from "react";
import Link from "next/link";
import Modal from "../Utils/Modal";
import DOMPurify from "isomorphic-dompurify";
import FancyEditor from "../Utils/FancyEditor";
import { IComment } from "../../models/comment";
import { useAuth } from "../../utils/Auth";
import { useMutation } from "@apollo/client";
import {
  CREATE_COMMENT,
  UPDATE_COMMENT,
} from "../../graphql/comments/mutation";
import { usePostCommentsStore } from "../../stores/postComments";
import { getUserDetailPath } from "../../utils/constants";
import {
  insertChildInTrees,
  updateChildInTrees,
} from "../../utils/helpers/comments";

interface ReplyCommentModalProps {
  onClose: () => void;
  commentToReply: IComment;
  commentToEdit: IComment;
  toEditComment: boolean;
}

export default function EditAndReplyCommentModal({
  onClose,
  commentToReply,
  commentToEdit,
  toEditComment,
}: ReplyCommentModalProps) {
  const [editorContent, setEditorContent] = React.useState("");
  const { currentUser } = useAuth();
  const {
    postComments,
    setPostComments,
    postCommentsCount,
    setPostCommentsCount,
  } = usePostCommentsStore((s) => ({
    postComments: s.postComments,
    setPostComments: s.setPostComments,
    postCommentsCount: s.postCommentsCount,
    setPostCommentsCount: s.setPostCommentsCount,
  }));

  const [createComment] = useMutation(CREATE_COMMENT, {
    onError(error, clientOptions) {
      // set error
    },
    onCompleted(data) {
      const commentsCopy = JSON.parse(JSON.stringify(postComments));
      insertChildInTrees(commentsCopy, commentToReply.id, data.createComment);
      setPostComments(commentsCopy);
      setPostCommentsCount(postCommentsCount + 1);
      onClose();
    },
  });

  const [updateComment] = useMutation(UPDATE_COMMENT, {
    onError(error, clientOptions) {
      // set error
    },
    onCompleted(data) {
      const commentsCopy = JSON.parse(JSON.stringify(postComments));
      updateChildInTrees(commentsCopy, data?.updateComment, false, true);
      setPostComments(commentsCopy);
      onClose();
    },
  });

  React.useEffect(() => {
    if (toEditComment) {
      setEditorContent(commentToEdit?.content);
    }
  }, []);

  const handleCommentSubmit = () => {
    if (!editorContent) return;
    createComment({
      variables: {
        parentId: commentToReply.id,
        content: editorContent,
        postId: commentToReply.postId,
      },
    });
  };

  const handleCommentUpdate = () => {
    if (!editorContent) return;
    updateComment({
      variables: {
        commentId: commentToEdit.id,
        content: editorContent,
      },
    });
  };

  return (
    <Modal
      onClose={onClose}
      onSubmit={toEditComment ? handleCommentUpdate : handleCommentSubmit}
      size="lg"
      showHeader={toEditComment}
      headerTitle="Update Comment"
      submitBtnText={toEditComment ? "Update" : "Submit"}
    >
      <div className="w-full">
        {!toEditComment && (
          <div className="w-full">
            <p className="font-semibold text-sm mb-1">Replying to:</p>
            <div className="overflow-y-auto max-h-56">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(commentToReply?.content),
                }}
              />
            </div>
          </div>
        )}
        <div className="my-2.5">
          {!toEditComment && (
            <p className="text-sm mb-2">
              Reply as{" "}
              <Link href={getUserDetailPath(currentUser?.username)}>
                <a className="text-theme-link-text-color hover:underline">
                  {currentUser.username}
                </a>
              </Link>
            </p>
          )}
          <FancyEditor
            editorContent={editorContent}
            setEditorContent={setEditorContent}
            isPost={false}
          />
        </div>
      </div>
    </Modal>
  );
}
