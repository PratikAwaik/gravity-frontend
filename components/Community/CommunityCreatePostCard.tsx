import Link from "next/link";
import { ICommunity } from "../../models/community";
import { useAuth } from "../../utils/Auth";
import { getUserDetailPath } from "../../utils/constants";
import Avatar from "../Utils/Avatar";
import CustomTooltip from "../Utils/CustomTooltip";

interface CommunityCreatePostCardProps {
  communityDetails: ICommunity;
}

export default function CommunityCreatePostCard({
  communityDetails,
}: CommunityCreatePostCardProps) {
  const { currentUser } = useAuth();

  return (
    currentUser?.id && (
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
    )
  );
}
