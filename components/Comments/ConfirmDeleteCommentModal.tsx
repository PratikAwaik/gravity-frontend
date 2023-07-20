import Modal from "../Utils/Modal";
import { useMutation } from "@apollo/client";
import { DELETE_COMMENT } from "../../graphql/comments/mutation";
import { IComment } from "../../models/comment";
import { TypeNames } from "../../models/utils";
import { ButtonVariant } from "../Common/Button";

interface ConfirmDeleteCommentModalProps {
  onClose: () => void;
  comment: IComment;
}

export default function ConfirmDeleteCommentModal({
  onClose,
  comment,
}: ConfirmDeleteCommentModalProps) {
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    update: (cache, { data: { deleteComment } }) => {
      cache.modify({
        id: cache.identify(deleteComment),
        fields: {
          deleted() {
            return true;
          },
        },
      });

      cache.modify({
        id: cache.identify({
          __typename: TypeNames.POST,
          id: deleteComment?.postId,
        }),
        fields: {
          commentsCount(existingCommentsCount = 0) {
            return existingCommentsCount - 1;
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

  const handleDeleteComment = () => {
    deleteComment({
      variables: { commentId: comment?.id, postId: comment?.postId },
    });
  };

  return (
    <Modal
      onClose={onClose}
      onSubmit={handleDeleteComment}
      headerTitle="Delete Comment"
      submitBtnText="Delete"
      cancelBtnText="Keep"
      size="sm"
      submitBtnVariant={ButtonVariant.DANGER}
    >
      <div className="w-full">
        <p className="leading-5 my-2.5 whitespace-pre-wrap text-sm">
          Are you sure you want to delete your comment?
        </p>
      </div>
    </Modal>
  );
}
