export default function CommunityDetail({
  communityId,
}: {
  communityId: string;
}) {
  console.log(communityId);
  return <></>;
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      communityId: context.params.communityId,
    },
  };
}
