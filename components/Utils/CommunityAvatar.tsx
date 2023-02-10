import Image from "next/image";
import { ICommunity } from "../../models/community";

interface CommunityAvatarProps {
  community: ICommunity;
  square?: boolean;
  className?: string;
}

export default function CommunityAvatar({
  community,
  square = false,
  className,
}: CommunityAvatarProps) {
  return (
    <div
      className={`relative ${
        !square && "rounded-full"
      } flex items-center justify-center ${className}`}
    >
      {community?.icon ? (
        <img
          src={community?.icon ?? ""}
          alt={community?.name}
          className={`object-cover ${!square && "rounded-full"} w-full h-full`}
        />
      ) : (
        <div
          className={`${
            !square && "rounded-full"
          } w-full h-full bg-theme-blue flex items-center justify-center`}
        >
          <span className={`font-bold`}>c/</span>
        </div>
      )}
    </div>
  );
}
