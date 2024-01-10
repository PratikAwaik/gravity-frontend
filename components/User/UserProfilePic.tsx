import {useMemo, useRef, useState} from "react";
import {useAuth} from "../../utils/Auth";
import {useMutation} from "@apollo/client";
import {UDPATE_COMMUNITY} from "../../graphql/community/mutations";
import {TypeNames} from "../../models/utils";
import {IUser} from "../../models/user";
import {UPDATE_LOGGED_IN_USER} from "../../graphql/users/mutations";
import {BoringUserAvatar} from "../Utils/UserAvatar";

interface UserProfilePicProps {
  user: IUser;
  square?: boolean;
}

export default function UserProfilePic({
  user,
  square = false,
}: UserProfilePicProps) {
  const {currentUser} = useAuth();
  const isCurrentUser = useMemo(() => user?.id === currentUser?.id, [user?.id]);
  const fileInputRef = useRef<any>();

  const [updatedLoggedInUser, {loading}] = useMutation(UPDATE_LOGGED_IN_USER, {
    update: (cache, {data: {updatedLoggedInUser}}) => {
      cache.modify({
        id: cache.identify({
          __typename: TypeNames.USER,
          id: user?.id,
        }),
        fields: {
          icon() {
            return updatedLoggedInUser?.icon;
          },
        },
      });
    },
    onError(error, clientOptions?) {},
    onCompleted(data, clientOptions) {},
  });

  const handleImageOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files?.length > 0) {
      handleUpdateUserProfilePic(files[0]);
      fileInputRef.current.value = "";
    }
  };

  const handleUpdateUserProfilePic = (uploadedFile: File) => {
    if (uploadedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(uploadedFile);
      reader.onloadend = async () => {
        if (reader.result && isCurrentUser) {
          await updatedLoggedInUser({
            variables: {
              payload: {
                userId: user?.id,
                icon: {
                  content: reader.result,
                  publicId: user?.icon?.publicId,
                },
              },
            },
          });
        }
      };
    }
  };

  return (
    <div className="group w-32 h-32 rounded-full bg-white flex items-center justify-center relative">
      {isCurrentUser && (
        <>
          <label
            className="group-hover:flex hidden w-full h-full items-center justify-center absolute top-0 left-0 bg-slate-600-800 rounded-full cursor-pointer z-10"
            htmlFor="upload-community-icon"
          >
            {loading ? (
              <i className="ri-loader-4-line text-4xl text-slate-500 animate-spin"></i>
            ) : (
              <i className="ri-camera-line text-4xl text-slate-500"></i>
            )}
          </label>
          <input
            type="file"
            className="hidden"
            id="upload-community-icon"
            onChange={handleImageOnChange}
            accept="image/png, image/jpeg, image/webp, image/jpg"
            ref={fileInputRef}
            onClick={() => !loading && fileInputRef.current.click()}
          />
        </>
      )}
      {user?.icon?.url ? (
        <img
          src={user?.icon.url ?? ""}
          alt={user?.name}
          className={`object-cover ${
            !square && "rounded-full"
          } w-full h-full  ${isCurrentUser && "group-hover:opacity-25"}`}
        />
      ) : (
        <BoringUserAvatar user={user} size={129} />
      )}
    </div>
  );
}
