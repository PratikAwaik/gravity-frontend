import { useMutation } from "@apollo/client";
import { useMemo } from "react";
import {
  JOIN_COMMUNITY,
  LEAVE_COMMUNITY,
} from "../../graphql/community/mutations";
import { ICommunity } from "../../models/community";
import { useAuth } from "../../utils/Auth";

interface CommunityMetaInfoProps {
  communityDetails: ICommunity;
}

export default function CommunityMetaInfo({
  communityDetails,
}: CommunityMetaInfoProps) {
  const { currentUser } = useAuth();
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

  return (
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
                        <span className="block group-hover:hidden">Joined</span>
                        <span className="hidden group-hover:block">Leave</span>
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
