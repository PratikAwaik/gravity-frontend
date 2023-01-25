import Link from "next/link";
import FromNow from "../Utils/FromNow";
import { IPost } from "../../models/post";
import {
  getCommunityDetailPath,
  getUserDetailPath,
} from "../../utils/constants";
import { useMemo } from "react";
import { useAuth } from "../../utils/Auth";
import { useMutation } from "@apollo/client";
import { JOIN_COMMUNITY } from "../../graphql/community/mutations";
import { storeScrollPosition } from "../../utils/helpers/posts";

interface PostHeaderProps {
  post: IPost;
  isPostDetail?: boolean;
  isCommunityPosts?: boolean;
  isUserPosts?: boolean;
}

export default function PostHeader({
  post,
  isPostDetail = false,
  isCommunityPosts = false,
  isUserPosts = false,
}: PostHeaderProps) {
  const auth = useAuth();
  const hasJoinedCommunity = useMemo(
    () => post?.community?.members?.[0]?.id === auth?.currentUser?.id,
    [post?.community?.members]
  );
  const [joinCommunity] = useMutation(JOIN_COMMUNITY, {
    update: (cache, { data: { joinCommunity } }) => {
      cache.modify({
        id: cache.identify(joinCommunity),
        fields: {
          members() {
            return joinCommunity?.members;
          },
        },
      });
    },
    onError(error, clientOptions) {},
  });

  const handleJoinCommunity = () => {
    joinCommunity({
      variables: {
        communityId: post?.community?.id,
      },
    });
  };

  return (
    <div className="forum-post-header text-xs mb-2 flex sm:flex-row sm:items-center">
      <div className="w-full flex items-center justify-between z-10">
        <div className="w-full flex items-center">
          <Link href={getCommunityDetailPath(post?.community?.name)}>
            <a
              className="flex items-center hover:underline flex-shrink-0"
              onClick={() =>
                storeScrollPosition(isPostDetail, isCommunityPosts, isUserPosts)
              }
            >
              <img
                className="w-5 h-5 rounded-full mr-1"
                src={post?.community?.icon}
                alt="Community Icon"
              />
              <span className="font-bold hidden sm:inline-block">
                {post?.community?.prefixedName}
              </span>
            </a>
          </Link>

          <span className="mini-dot"></span>

          <div className="flex flex-col">
            <Link href={getCommunityDetailPath(post?.community?.name)}>
              <a
                className="font-bold sm:hidden text-theme-font-black"
                onClick={() =>
                  storeScrollPosition(
                    isPostDetail,
                    isCommunityPosts,
                    isUserPosts
                  )
                }
              >
                {post?.community?.prefixedName}
              </a>
            </Link>
            <div className="flex flex-wrap items-center text-xs text-theme-font-black">
              Posted by
              <Link href={getUserDetailPath(post?.author?.username)}>
                <a
                  className="ml-1 hover:underline mr-2"
                  onClick={() =>
                    storeScrollPosition(
                      isPostDetail,
                      isCommunityPosts,
                      isUserPosts
                    )
                  }
                >
                  {post?.author?.prefixedName}
                </a>
              </Link>
              <FromNow date={post?.createdAt} />
              {post?.updatedAt && (
                <>
                  <span className="mini-dot"></span>
                  <span className="italic text-xs text-theme-meta-text">
                    edited <FromNow date={post?.updatedAt} />
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        {auth?.currentUser?.id !== post?.community?.admin?.id &&
          !isCommunityPosts &&
          !hasJoinedCommunity && (
            <button
              type="button"
              className="bg-theme-blue border-none text-white text-xs font-bold py-1 px-4 rounded-3xl hover:brightness-110"
              onClick={handleJoinCommunity}
            >
              Join
            </button>
          )}
      </div>
    </div>
  );
}
