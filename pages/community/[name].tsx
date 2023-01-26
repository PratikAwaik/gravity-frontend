import Head from "next/head";
import CommunityMetaInfo from "../../components/Community/CommunityMetaInfo";
import CommunityMain from "../../components/Community/CommunityMain";
import LoadingWrapper from "../../components/Utils/LoadingWrapper";
import { GET_COMMUNITY_DETAILS } from "../../graphql/community/query";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export default function CommunityDetail() {
  const router = useRouter();

  const { data, loading } = useQuery(GET_COMMUNITY_DETAILS, {
    variables: {
      name: router.query.name,
    },
    skip: !router.query.name,
  });

  return (
    <>
      <Head>
        <title>{data?.getCommunityDetails?.name}</title>
      </Head>
      <LoadingWrapper isLoading={loading}>
        {/* page container */}
        <div className="w-full">
          {/* top side */}
          <CommunityMetaInfo communityDetails={data?.getCommunityDetails} />
          {/* bottom side */}
          <CommunityMain communityDetails={data?.getCommunityDetails} />
        </div>
      </LoadingWrapper>
    </>
  );
}
