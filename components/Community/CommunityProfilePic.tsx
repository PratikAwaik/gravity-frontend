import {useMemo, useRef, useState} from "react";
import {ICommunity} from "../../models/community";
import {useAuth} from "../../utils/Auth";
import {useMutation} from "@apollo/client";
import {UDPATE_COMMUNITY} from "../../graphql/community/mutations";
import {TypeNames} from "../../models/utils";

interface CommunityProfilePicProps {
  communityDetails: ICommunity;
  square?: boolean;
}

export default function CommunityProfilePic({
  communityDetails,
  square = false,
}: CommunityProfilePicProps) {
  const {currentUser} = useAuth();
  const isCommunityAdmin = useMemo(
    () => communityDetails?.admin?.id === currentUser?.id,
    [communityDetails?.members]
  );
  const fileInputRef = useRef<any>();

  const [updateCommunity] = useMutation(UDPATE_COMMUNITY, {
    update: (cache, {data: {updateCommunity}}) => {
      cache.modify({
        id: cache.identify({
          __typename: TypeNames.COMMUNITY,
          id: communityDetails?.id,
        }),
        fields: {
          icon() {
            return updateCommunity?.icon;
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
      handleUpdateCommunityProfilePic(files[0]);
      fileInputRef.current.value = "";
    }
  };

  const handleUpdateCommunityProfilePic = (uploadedFile: File) => {
    if (uploadedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(uploadedFile);
      reader.onloadend = async () => {
        if (reader.result) {
          await updateCommunity({
            variables: {
              communityId: communityDetails?.id,
              icon: {
                content: reader.result,
                publicId: communityDetails?.icon?.publicId,
              },
            },
          });
        }
      };
    }
  };

  return (
    <div className="group w-20 h-20 rounded-full bg-white flex items-center justify-center relative">
      {isCommunityAdmin && (
        <>
          <label
            className="group-hover:flex hidden w-full h-full items-center justify-center absolute top-0 left-0 bg-slate-600-800 rounded-full cursor-pointer z-10"
            htmlFor="upload-community-icon"
          >
            <i className="ri-camera-line text-2xl text-slate-500"></i>
          </label>
          <input
            type="file"
            className="hidden"
            id="upload-community-icon"
            onChange={handleImageOnChange}
            accept="image/png, image/jpeg, image/webp, image/jpg"
            ref={fileInputRef}
          />
        </>
      )}
      {communityDetails?.icon?.url ? (
        <img
          src={communityDetails?.icon.url ?? ""}
          alt={communityDetails?.name}
          className={`object-cover ${
            !square && "rounded-full"
          } w-[4.5rem] h-[4.5rem]  ${
            isCommunityAdmin && "group-hover:opacity-25"
          }`}
        />
      ) : (
        <div
          className={`${
            !square && "rounded-full"
          } w-[4.5rem] h-[4.5rem] bg-theme-blue flex items-center justify-center  ${
            isCommunityAdmin && "group-hover:opacity-25"
          }`}
        >
          <span className={`font-bold text-4xl text-white`}>c/</span>
        </div>
      )}
    </div>
  );
}
