import { useMutation } from "@apollo/client";
import { DELETE_COMMENT } from "../../graphql/comments/mutation";
import { IComment } from "../../models/comment";
import { usePostCommentsStore } from "../../stores/postComments";
import { updateChildInTrees } from "../../utils/helpers/comments";
import Modal from "../Utils/Modal";

interface ConfirmDeleteCommentModalProps {
  onClose: () => void;
  comment: IComment;
}

export default function ConfirmDeleteCommentModal({
  onClose,
  comment,
}: ConfirmDeleteCommentModalProps) {
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

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    onError(error, clientOptions) {
      // set error
    },
    onCompleted(data) {
      // set success
      const newComments = JSON.parse(JSON.stringify(postComments));
      updateChildInTrees(newComments, data.deleteComment, true, false);
      setPostComments(newComments);
      setPostCommentsCount(postCommentsCount - 1);
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
      submitBtnHoverClassName="hover:bg-theme-red-light"
    >
      <div className="w-full">
        <p className="leading-5 my-2.5 whitespace-pre-wrap text-sm">
          Are you sure you want to delete your comment?
        </p>
      </div>
    </Modal>
  );
}
