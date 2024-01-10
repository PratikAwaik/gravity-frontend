import BoringAvatar from "boring-avatars";
import {IUser} from "../../models/user";
import {combineStrings} from "../../utils/helpers/string";

interface UserAvatarProps {
  size?: number;
  user: Partial<IUser>;
  square?: boolean;
}

export default function UserAvatar({
  size = 28,
  user,
  square = false,
}: UserAvatarProps) {
  return user?.icon ? (
    <div className="shrink-0 w-fit h-fit rounded-full flex items-center justify-center overflow-hidden">
      <img
        width={size}
        height={size}
        src={user?.icon.url}
        alt={`${user?.username}'s profile pic`}
        className={combineStrings("object-cover", !square && "rounded-full")}
        style={{height: size, width: size}}
      />
    </div>
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
  className,
}: {
  user: IUser;
  square?: boolean;
  size?: number;
  className?: string;
}) => (
  <div className={combineStrings(className)}>
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
