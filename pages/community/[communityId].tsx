interface CommunityDetailProps {
  communityId: string;
}

export default function CommunityDetail({ communityId }: CommunityDetailProps) {
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
