import * as React from "react";
import Link from "next/link";
import Modal from "../Utils/Modal";
import DOMPurify from "isomorphic-dompurify";
import FancyEditor from "../Utils/FancyEditor";
import { IComment } from "../../models/comment";
import { useAuth } from "../../utils/Auth";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "../../graphql/comments/mutation";
import { usePostCommentsStore } from "../../stores/postComments";
import { getUserDetailPath } from "../../utils/constants";

interface ReplyCommentModalProps {
  onClose: () => void;
  commentToReply: IComment;
}

export default function ReplyCommentModal({
  onClose,
  commentToReply,
}: ReplyCommentModalProps) {
  const [editorContent, setEditorContent] = React.useState("");
  const { currentUser } = useAuth();
  const { postComments, setPostComments } = usePostCommentsStore((s) => ({
    postComments: s.postComments,
    setPostComments: s.setPostComments,
  }));
  const [createComment] = useMutation(CREATE_COMMENT, {
    onError(error, clientOptions) {
      // set error
    },
    onCompleted(data, clientOptions) {
      const newComments = JSON.parse(JSON.stringify(postComments));
      insertChildInTrees(newComments, commentToReply.id, data.createComment);
      setPostComments(newComments);
      onClose();
    },
  });

  function insertChildInTrees(
    comments: IComment[],
    parentId: string,
    commentToAdd: IComment
  ) {
    for (const comment of comments) {
      const newChild = insertChild(comment, parentId, commentToAdd);
      if (newChild !== null) {
        return newChild;
      }
    }
    return null;
  }

  function insertChild(
    comment: IComment,
    parentId: string,
    commentToAdd: IComment
  ): IComment | null {
    if (comment.id === parentId) {
      comment.children.push(commentToAdd);
    }
    for (const child of comment.children) {
      insertChild(child, parentId, commentToAdd);
    }
    return null;
  }

  const addCommentToState = (
    comments: IComment[],
    parentId: string,
    commentToAdd: any
  ) => {
    comments.forEach((comment) => {
      if (comment.id === parentId) {
        comment.children.push(commentToAdd);
        return;
      } else addCommentToState(comment.children, parentId, commentToAdd);
    });
  };

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

  return (
    <Modal onClose={onClose} onSubmit={handleCommentSubmit} size="lg">
      <div className="w-full">
        <p className="font-semibold text-sm mb-1">Replying to:</p>
        <div className="overflow-y-auto max-h-56">
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(commentToReply?.content),
            }}
          />
        </div>
        <div className="my-5">
          <p className="text-sm mb-2">
            Reply as{" "}
            <Link href={getUserDetailPath(currentUser?.username)}>
              <a className="text-theme-link-text-color hover:underline">
                {currentUser.username}
              </a>
            </Link>
          </p>
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
