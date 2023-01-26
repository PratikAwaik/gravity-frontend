import Link from "next/link";
import numberFormatter from "../../utils/helpers/numberFormatter";
import CustomTooltip from "../Utils/CustomTooltip";
import { ICommunity } from "../../models/community";
import { getFromNow, getHumanReadableDate } from "../../utils/helpers/date";

interface CommunityDetailsProps {
  communityDetails: ICommunity;
}

export default function CommunityDetails({
  communityDetails,
}: CommunityDetailsProps) {
  return (
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
            <Link href={`/create/post?community=${communityDetails?.name}`}>
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
                <a className="text-theme-blue hover:underline">
                  {communityDetails?.admin?.prefixedName}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
