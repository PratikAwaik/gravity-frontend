import Head from "next/head";
import Avatar from "../../components/Utils/Avatar";
import UserTabs from "../../components/User/UserTabs";
import UserPosts from "../../components/User/UserPosts";
import UserComments from "../../components/User/UserComments";
import CustomTooltip from "../../components/Utils/CustomTooltip";
import FromNow from "../../components/Utils/FromNow";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { GET_USER_DETAILS } from "../../graphql/users/query";
import { UserTabsTypes } from "../../models/user";
import { getFromNow, getHumanReadableDate } from "../../utils/helpers/date";

export default function UserDetails() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<UserTabsTypes>(
    UserTabsTypes.POSTS
  );

  const { data } = useQuery(GET_USER_DETAILS, {
    variables: {
      username: router.query.username,
    },
    skip: !router.query.username,
  });

  const userDetails = useMemo(() => data?.getUserDetails, [data]);

  return (
    <>
      <Head>
        <title>{`${userDetails?.username} (${userDetails?.prefixedName})`}</title>
      </Head>

      {/* tabs */}
      <div className="bg-white h-10 w-full">
        <div className="w-full flex items-center justify-center h-full mx-auto">
          <div className="w-[40rem] max-w-[40rem] h-full">
            <UserTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
          </div>
          <div className="w-[19.5rem] max-w-[19.5rem]"></div>
        </div>
      </div>

      <div className="w-full py-5 px-6 flex items-start justify-center">
        <div className="w-[40rem] max-w-[40rem]">
          {currentTab === UserTabsTypes.POSTS && (
            <UserPosts userId={userDetails?.id} />
          )}
          {currentTab === UserTabsTypes.COMMENTS && (
            <UserComments userId={userDetails?.id} />
          )}
        </div>
        <div className="w-[19.5rem] max-w-[19.5rem] ml-6">
          <div className="w-full bg-white border border-theme-post-line rounded">
            <div className="w-full p-3">
              <div className="mx-auto flex items-center justify-center w-32 h-32 overflow-hidden rounded">
                <Avatar user={userDetails} size={129} square />
              </div>
              <h1 className="mt-3 text-center text-2xl font-medium">
                {userDetails?.username}
              </h1>
              <div className="w-full mt-1 mb-3 flex items-center justify-center">
                <span className="text-xs font-medium text-theme-meta-text flex items-center justify-center">
                  <span>{userDetails?.prefixedName}</span>
                  <span className="mini-dot"></span>
                  <FromNow date={userDetails?.createdAt} />
                </span>
              </div>
              <div className="flex items-center">
                <div>
                  <h5 className="text-sm font-medium">Cake day</h5>
                  <div className="flex items-center mt-0.5" id="user-created">
                    <i className="ri-cake-line text-xs text-theme-blue"></i>
                    <span className="ml-1 text-xs text-theme-meta-text">
                      {getHumanReadableDate(userDetails?.createdAt)}
                    </span>
                    <CustomTooltip
                      anchorId="user-created"
                      content={getFromNow(userDetails?.createdAt)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
