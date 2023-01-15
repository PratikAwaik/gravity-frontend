import Head from "next/head";
import client from "../../utils/client";
import Avatar from "../../components/Utils/Avatar";
import { GET_COMMUNITY_DETAILS } from "../../graphql/community/query";
import { ICommunity } from "../../models/community";
import { useAuth } from "../../utils/Auth";
import { useMemo } from "react";
import Link from "next/link";
import { getUserDetailPath } from "../../utils/constants";
import CustomTooltip from "../../components/Utils/CustomTooltip";
import { getFromNow, getHumanReadableDate } from "../../utils/helpers/date";

interface CommunityDetailProps {
  communityDetails: ICommunity;
}

export default function CommunityDetail({
  communityDetails,
}: CommunityDetailProps) {
  const { currentUser } = useAuth();
  const hasJoinedCommunity = useMemo(
    () => communityDetails?.members?.[0]?.id === currentUser?.id,
    [communityDetails?.members]
  );

  return (
    <>
      <Head>
        <title>{communityDetails?.name}</title>
      </Head>
      {/* page container */}
      <div className="w-full -mt-3">
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
                    {currentUser?.id && !hasJoinedCommunity && (
                      <div className="w-24">
                        <button
                          type="button"
                          className="px-4 py-1 rounded-3xl text-sm bg-theme-blue text-white font-bold hover:brightness-110 min-w-[2rem] min-h-[2rem] w-full font-theme-font-family-noto"
                        >
                          Join
                        </button>
                      </div>
                    )}
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
                    className="rounded text-theme-gray-action-icon flex items-center justify-center w-10 h-10 text-sm hover:bg-[#ededed] mr-0.5"
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
          </div>
          {/* community details */}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const {
    data: { getCommunityDetails },
  } = await client.query({
    query: GET_COMMUNITY_DETAILS,
    variables: { name: context.params.name },
  });

  return {
    props: {
      communityDetails: getCommunityDetails,
    },
  };
}
