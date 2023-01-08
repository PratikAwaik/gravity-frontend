import Modal from "../Utils/Modal";
import FancyEditor from "../Utils/FancyEditor";
import { IPost } from "../../models/post";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_POST } from "../../graphql/posts/mutations";
import { TypeNames } from "../../models/utils";

interface EditPostModalProps {
  onClose: () => void;
  post: IPost;
}

export default function EditPostModal({ onClose, post }: EditPostModalProps) {
  const [editorContent, setEditorContent] = useState<string>("");
  const [updatePost] = useMutation(UPDATE_POST, {
    update: (cache, { data: { updatePost } }) => {
      cache.modify({
        id: cache.identify({
          __typename: TypeNames.POST,
          id: post?.id,
        }),
        fields: {
          content() {
            return updatePost?.content;
          },
          editedAt() {
            return updatePost?.updatedAt;
          },
        },
      });
    },
    onError(error, clientOptions?) {},
    onCompleted(data, clientOptions) {
      onClose();
    },
  });

  useEffect(() => {
    setEditorContent(post?.content);
  }, []);

  const handleUpdatePost = () => {
    updatePost({
      variables: {
        postId: post?.id,
        content: editorContent,
      },
    });
  };

  return (
    <Modal
      onClose={onClose}
      onSubmit={handleUpdatePost}
      showHeader
      headerTitle="Update Post"
      size="lg"
      submitBtnText="Update"
    >
      <div className="w-full my-2.5">
        <FancyEditor
          editorContent={editorContent}
          setEditorContent={setEditorContent}
          isPost
        />
      </div>
    </Modal>
  );
}
