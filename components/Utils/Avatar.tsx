import BoringAvatar from "boring-avatars";

interface AvatarProps {
  size?: number;
  user: any;
}

export default function Avatar({ size = 28, user }: AvatarProps) {
  return user?.profilePic ? (
    <img
      width={size}
      height={36}
      src={user?.profilePic}
      alt={`${user?.username}'s profile pic`}
    />
  ) : (
    <BoringAvatar
      size={size}
      name={user?.username}
      variant="beam"
      colors={colors}
    />
  );
}

const colors = ["#FFAD08", "#EDD75A", "#73B06F", "#0C8F8F", "#405059"];
