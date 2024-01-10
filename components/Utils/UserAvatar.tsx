import BoringAvatar from "boring-avatars";
import {IUser} from "../../models/user";

interface UserAvatarProps {
  size?: number;
  user: IUser;
  square?: boolean;
}

export default function UserAvatar({
  size = 28,
  user,
  square = false,
}: UserAvatarProps) {
  return user?.icon ? (
    <img
      width={size}
      height={size}
      src={user?.icon.url}
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

export const BoringUserAvatar = ({
  user,
  square = false,
  size = 28,
}: {
  user: IUser;
  square?: boolean;
  size?: number;
}) => (
  <div className="group-hover:opacity-25">
    <BoringAvatar
      size={size}
      name={user?.username}
      variant="beam"
      colors={colors}
      square={square}
    />
  </div>
);

const colors = ["#FFAD08", "#EDD75A", "#73B06F", "#0C8F8F", "#405059"];
