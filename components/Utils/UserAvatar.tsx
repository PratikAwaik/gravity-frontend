import BoringAvatar from "boring-avatars";

interface UserAvatarProps {
  size?: number;
  user: any;
  square?: boolean;
}

export default function UserAvatar({
  size = 28,
  user,
  square = false,
}: UserAvatarProps) {
  console.log(square);
  return user?.profilePic ? (
    <img
      width={size}
      height={size}
      src={user?.profilePic}
      alt={`${user?.username}'s profile pic`}
    />
  ) : (
    <BoringAvatar
      size={size}
      name={user?.username}
      variant="beam"
      colors={colors}
      square={square}
    />
  );
}

const colors = ["#FFAD08", "#EDD75A", "#73B06F", "#0C8F8F", "#405059"];
