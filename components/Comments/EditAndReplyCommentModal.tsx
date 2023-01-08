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
  CREATE_COMMENT_FRAGMENT,
  UPDATE_COMMENT,
} from "../../graphql/comments/mutation";
import { getUserDetailPath } from "../../utils/constants";
import { TypeNames } from "../../models/utils";

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

  const [createComment] = useMutation(CREATE_COMMENT, {
    update: (cache, { data: { createComment } }) => {
      cache.modify({
        id: cache.identify({
          __typename: TypeNames.COMMENT,
          id: commentToReply?.id,
        }),
        fields: {
          children(existingChildren = []) {
            const newChildRef = cache.writeFragment({
              data: createComment,
              fragment: CREATE_COMMENT_FRAGMENT,
            });
            return [...existingChildren, newChildRef];
          },
        },
      });

      cache.modify({
        id: cache.identify({
          __typename: TypeNames.POST,
          id: createComment?.postId,
        }),
        fields: {
          commentsCount(existingCommentsCount = 0) {
            return existingCommentsCount + 1;
          },
        },
      });
    },
    onError(error, clientOptions) {
      // set error
    },
    onCompleted() {
      onClose();
    },
  });

  const [updateComment] = useMutation(UPDATE_COMMENT, {
    update: (cache, { data: { updateComment } }) => {
      cache.modify({
        id: cache.identify(updateComment),
        fields: {
          content() {
            return updateComment?.content;
          },
          updatedAt() {
            return updateComment?.updatedAt;
          },
        },
      });
    },
    onError(error, clientOptions) {
      // set error
    },
    onCompleted(data) {
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
