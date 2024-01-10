import {useMemo, useRef, useState} from "react";
import {ICommunity} from "../../models/community";
import {useAuth} from "../../utils/Auth";
import {useMutation} from "@apollo/client";
import {UDPATE_COMMUNITY} from "../../graphql/community/mutations";
import {TypeNames} from "../../models/utils";
import {combineStrings} from "../../utils/helpers/string";

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

  const [updateCommunity, {loading}] = useMutation(UDPATE_COMMUNITY, {
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
        if (reader.result && isCommunityAdmin) {
          await updateCommunity({
            variables: {
              payload: {
                communityId: communityDetails?.id,
                icon: {
                  content: reader.result,
                  publicId: communityDetails?.icon?.publicId,
                },
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
            className={combineStrings(
              "group-hover:flex hidden w-full h-full items-center justify-center absolute top-0 left-0 bg-slate-600-800 rounded-full cursor-pointer z-10"
            )}
            htmlFor="upload-community-icon"
          >
            {!loading && (
              <i className="ri-camera-line text-2xl text-slate-500"></i>
            )}
          </label>
          {loading && (
            <div className="w-full h-full flex items-center justify-center absolute top-0 left-0">
              <i className="ri-loader-4-line text-2xl text-slate-500 animate-spin"></i>
            </div>
          )}
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
      {communityDetails?.icon?.url ? (
        <img
          src={communityDetails?.icon.url ?? ""}
          alt={communityDetails?.name}
          className={combineStrings(
            "object-cover w-[90%] h-[90%]",
            !square && "rounded-full",
            isCommunityAdmin && "group-hover:opacity-25",
            loading && "opacity-25"
          )}
        />
      ) : (
        <div
          className={combineStrings(
            "w-[90%] h-[90%] bg-theme-blue flex items-center justify-center",
            !square && "rounded-full",
            isCommunityAdmin && "group-hover:opacity-25",
            loading && "opacity-25"
          )}
        >
          <span className={`font-bold text-4xl text-white`}>c/</span>
        </div>
      )}
    </div>
  );
}
