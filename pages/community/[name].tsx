import Head from "next/head";
import Link from "next/link";
import Avatar from "../../components/Utils/Avatar";
import CustomTooltip from "../../components/Utils/CustomTooltip";
import Feed from "../../components/Home/Feed";
import numberFormatter from "../../utils/helpers/numberFormatter";
import { GET_COMMUNITY_DETAILS } from "../../graphql/community/query";
import { useAuth } from "../../utils/Auth";
import { useEffect, useMemo } from "react";
import { getUserDetailPath, LOCAL_STORAGE_KEYS } from "../../utils/constants";
import { getFromNow, getHumanReadableDate } from "../../utils/helpers/date";
import { useMutation, useQuery } from "@apollo/client";
import {
  JOIN_COMMUNITY,
  LEAVE_COMMUNITY,
} from "../../graphql/community/mutations";
import { useRouter } from "next/router";
import { GET_ALL_POSTS } from "../../graphql/posts/query";
import { usePostsStore } from "../../stores/posts";
import { scrollToPreviousPosition } from "../../utils/helpers/posts";

export default function CommunityDetail() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const { pageNo, setPageNo, hasMore, setHasMore } = usePostsStore((state) => ({
    pageNo: state.communityPageNo,
    setPageNo: state.setCommunityPageNo,
    hasMore: state.communityHasMore,
    setHasMore: state.setCommunityHasMore,
  }));

  const { data, loading } = useQuery(GET_COMMUNITY_DETAILS, {
    variables: {
      name: router.query.name,
    },
    skip: !router.query.name,
  });

  const communityDetails = useMemo(() => data?.getCommunityDetails, [data]);

  const {
    data: communityPostsData,
    loading: communityPostsLoading,
    fetchMore: fetchMoreCommunityPosts,
  } = useQuery(GET_ALL_POSTS, {
    variables: {
      communityId: communityDetails?.id,
      pageNo: 0,
    },
    skip: !communityDetails?.id,
  });

  const communityPosts = useMemo(
    () => communityPostsData?.allPosts,
    [communityPostsData]
  );

  const hasJoinedCommunity = useMemo(
    () => communityDetails?.members?.[0]?.id === currentUser?.id,
    [communityDetails?.members]
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

  const [leaveCommunity] = useMutation(LEAVE_COMMUNITY, {
    update: (cache, { data: { leaveCommunity } }) => {
      cache.modify({
        id: cache.identify(leaveCommunity),
        fields: {
          members() {
            return leaveCommunity?.members;
          },
        },
      });
    },
    onError(error, clientOptions) {},
  });

  useEffect(() => {
    setPageNo(0);
    setHasMore(false);
    scrollToPreviousPosition(LOCAL_STORAGE_KEYS.COMMUNITY_SCROLL_POSITION);
  }, []);

  const handleJoinCommunity = () => {
    joinCommunity({
      variables: {
        communityId: communityDetails?.id,
      },
    });
  };

  const handleLeaveCommunity = () => {
    leaveCommunity({
      variables: {
        communityId: communityDetails?.id,
      },
    });
  };

  if (loading || communityPostsLoading) return null;

  return (
    <>
      <Head>
        <title>{communityDetails?.name}</title>
      </Head>
      {/* page container */}
      <div className="w-full">
        {/* top side */}
        <div className="w-full">
          {/* top side container */}
          <div className="w-full min-h-[5rem] relative flex flex-col">
            {/* blue background */}
            <div className="h-20 w-full bg-theme-community-banner py-2 px-4"></div>
            {/* community details */}
            <div className="w-full z-10 bg-white">
              <div className="max-w-[61.5rem] px-4 mx-auto">
                <div className="-mt-[0.875rem] mb-3 flex items-center">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                    <img
                      src={communityDetails?.icon}
                      alt={communityDetails?.name}
                      className="w-[4.5rem] h-[4.5rem] rounded-full"
                    />
                  </div>
                  <div className="mt-6 pl-4 flex items-start">
                    <div className="pr-6">
                      <h1 className="text-[1.75rem] font-bold pr-0.5 pb-1 text-ellipsis leading-8">
                        {communityDetails?.name}
                      </h1>
                      <h2 className="text-sm leading-[1.125rem] font-medium text-theme-meta-text">
                        {communityDetails?.prefixedName}
                      </h2>
                    </div>
                    {currentUser?.id !== communityDetails?.admin?.id &&
                      (!hasJoinedCommunity ? (
                        <div className="w-24">
                          <button
                            type="button"
                            className="px-4 py-1 rounded-3xl text-sm bg-theme-blue text-white font-bold hover:brightness-110 min-w-[2rem] min-h-[2rem] w-full font-theme-font-family-noto"
                            onClick={handleJoinCommunity}
                          >
                            Join
                          </button>
                        </div>
                      ) : (
                        <div className="w-24">
                          <button
                            type="button"
                            className="px-4 py-1 rounded-3xl text-sm border border-theme-blue text-theme-blue font-bold min-w-[2rem] min-h-[2rem] w-full font-theme-font-family-noto hover:bg-theme-blue-50 group"
                            onClick={handleLeaveCommunity}
                          >
                            <span className="block group-hover:hidden">
                              Joined
                            </span>
                            <span className="hidden group-hover:block">
                              Leave
                            </span>
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* bottom side */}
        <div className="py-5 px-6 flex items-start justify-center">
          {/* community posts */}
          <div className="max-w-[40rem] w-[40rem]">
            {currentUser?.id && (
              <div className="bg-white rounded border border-theme-post-line mb-4 flex items-center p-2">
                <Link href={getUserDetailPath(currentUser?.username)}>
                  <a className="mr-2 rounded-full border border-theme-gray-line">
                    <Avatar size={38} user={currentUser} />
                  </a>
                </Link>
                <Link href={`/create/post?community=${communityDetails?.name}`}>
                  <a className="grow">
                    <input
                      type="text"
                      placeholder="Create Post"
                      className="bg-theme-gray-field w-full rounded border border-theme-gray-line block h-[2.375rem] mr-2 outline-none py-0 px-4 text-sm leading-5 font-normal placeholder-theme-gray-action-icon hover:bg-white hover:border-theme-blue"
                    />
                  </a>
                </Link>
                <Link
                  href={`/create/post?tab=media&community=${communityDetails?.name}`}
                >
                  <a
                    className="rounded text-theme-gray-action-icon flex items-center justify-center w-10 h-10 text-sm hover:bg-[#ededed] mx-0.5"
                    id="create-media-post-community-detail"
                  >
                    <i className="ri-image-line text-xl"></i>
                    <CustomTooltip
                      anchorId="create-media-post-community-detail"
                      content="Create Media Post"
                    />
                  </a>
                </Link>
                <Link
                  href={`/create/post?tab=article&community=${communityDetails?.name}`}
                >
                  <a
                    className="rounded text-theme-gray-action-icon flex items-center justify-center w-10 h-10 text-sm hover:bg-[#ededed]"
                    id="create-article-post-community-detail"
                  >
                    <i className="ri-links-line text-xl"></i>
                    <CustomTooltip
                      anchorId="create-article-post-community-detail"
                      content="Create Article Post"
                    />
                  </a>
                </Link>
              </div>
            )}
            <Feed
              serverPosts={communityPosts}
              fetchMore={fetchMoreCommunityPosts}
              pageNo={pageNo}
              setPageNo={setPageNo}
              hasMore={hasMore}
              setHasMore={setHasMore}
              isCommunityPosts
              communityId={communityDetails?.id}
            />
          </div>
          {/* community details */}
          <div>
            <div className="ml-6 max-w-[19.5rem] w-[19.5rem] p-3 bg-white border border-theme-post-line rounded">
              <div className="w-full">
                <h2 className="text-sm font-bold tracking-wider pb-3">
                  About Community
                </h2>
                <p className="mb-2 text-sm font-theme-font-family-noto font-normal break-words">
                  {communityDetails?.description}
                </p>
                <div
                  className="flex items-center mt-3 font-theme-font-family-noto"
                  id="community-created"
                >
                  <i className="ri-cake-line text-xl leading-5 mr-2"></i>
                  <span className="text-sm text-theme-meta-text">
                    Created {getHumanReadableDate(communityDetails?.createdAt)}
                  </span>
                  <CustomTooltip
                    anchorId="community-created"
                    content={getFromNow(communityDetails?.createdAt)}
                  />
                </div>

                <hr className="border-0 h-[1px] my-4 mx-0 bg-theme-gray-nav-icon-faded" />

                <div className="flex items-center">
                  <div>
                    <div className="text-base leading-5 font-medium">
                      {numberFormatter?.format(communityDetails?.membersCount)}
                    </div>
                    <p className="font-normal text-theme-meta-text text-xs leading-4">
                      Members
                    </p>
                  </div>
                </div>

                <hr className="border-0 h-[1px] my-4 mx-0 bg-theme-gray-nav-icon-faded" />

                <div className="w-full flex items-center justify-center mt-3">
                  <Link
                    href={`/create/post?community=${communityDetails?.name}`}
                  >
                    <a className="bg-theme-blue border-none text-white font-theme-font-family-noto text-sm font-bold py-4 px-1 w-full rounded-3xl h-8 flex items-center justify-center hover:brightness-110">
                      Create Post
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="ml-6 mt-4 max-w-[19.5rem] w-[19.5rem] p-3 bg-white border border-theme-post-line rounded">
              <div>
                <h3 className="text-sm font-bold pb-3">Moderators</h3>
                <div>
                  <div className="flex items-center text-xs font-medium leading-4 mb-4 w-full">
                    <Link href={`/user/${communityDetails?.admin?.username}`}>
                      <a className="text-theme-blue">
                        {communityDetails?.admin?.prefixedName}
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
