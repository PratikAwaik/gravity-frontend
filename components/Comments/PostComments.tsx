import * as React from "react";
import Link from "next/link";
import FancyEditor from "../Utils/FancyEditor";
import CommentsContainer from "./CommentsContainer";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  CREATE_COMMENT,
  CREATE_COMMENT_FRAGMENT,
} from "../../graphql/comments/mutation";
import { GET_ALL_POST_COMMENTS } from "../../graphql/comments/query";
import { useAuth } from "../../utils/Auth";
import { getUserDetailPath } from "../../utils/constants";
import { TypeNames } from "../../models/utils";
import Button from "../Common/Button";

export default function PostComments() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [editorContent, setEditorContent] = useState("");

  const { loading, data } = useQuery(GET_ALL_POST_COMMENTS, {
    variables: {
      postId: router.query.postId,
      parentId: null,
    },
    skip: !router.query.postId,
  });

  const [createComment, { loading: creatingComment }] = useMutation(
    CREATE_COMMENT,
    {
      update: (cache, { data: { createComment } }) => {
        cache.modify({
          fields: {
            allComments(existingComments = []) {
              const newCommentRef = cache.writeFragment({
                data: createComment,
                fragment: CREATE_COMMENT_FRAGMENT,
              });
              return [...existingComments, newCommentRef];
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

        if (createComment?.authorId === currentUser?.id) {
          cache.modify({
            id: cache.identify({
              __typename: TypeNames.USER,
              id: currentUser?.id,
            }),
            fields: {
              karma: (existingKarma = 0) => existingKarma + 1,
            },
          });
        }
      },
      onError(error, clientOptions) {
        // set error
      },
    }
  );

  const handleCreateCommentClick = () => {
    if (!editorContent) return;
    createComment({
      variables: {
        content: editorContent,
        postId: router.query.postId ?? "",
        parentId: null,
      },
    });
    setEditorContent("");
  };

  if (loading) return null;

  return (
    <div className="w-full">
      {currentUser?.id && (
        <div className="w-full">
          <p className="text-xs mb-2">
            Comment as{" "}
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
            placeholder="What are your thoughts?"
          />
          <div className="w-full flex items-center justify-end">
            <Button
              disabled={creatingComment}
              onClick={handleCreateCommentClick}
            >
              {creatingComment ? "Posting..." : "Comment"}
            </Button>
          </div>
        </div>
      )}
      <div className="w-full h-0.5 border-b border-b-theme-gray-line my-4"></div>
      <CommentsContainer allComments={data?.allComments} />
    </div>
  );
}
