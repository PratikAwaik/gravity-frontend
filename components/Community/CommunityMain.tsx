import CommunityCreatePostCard from "./CommunityCreatePostCard";
import CommunityPosts from "./CommunityPosts";
import { ICommunity } from "../../models/community";
import CommunityDetails from "./CommunityDetails";

interface CommunityMainProps {
  communityDetails: ICommunity;
}

export default function CommunityMain({
  communityDetails,
}: CommunityMainProps) {
  return (
    <div className="py-5 px-6 flex items-start justify-center">
      {/* community posts */}
      <div className="max-w-[40rem] w-[40rem]">
        <CommunityCreatePostCard communityDetails={communityDetails} />
        <CommunityPosts communityId={communityDetails?.id} />
      </div>
      <CommunityDetails communityDetails={communityDetails} />
    </div>
  );
}
