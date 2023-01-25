import Head from "next/head";
import PostComments from "../../components/Comments/PostComments";
import PostBody from "../../components/Post/PostBody";
import PostFooter from "../../components/Post/PostFooter";
import PostHeader from "../../components/Post/PostHeader";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { GET_POST_BY_ID } from "../../graphql/posts/query";

export default function PostDetails() {
  const router = useRouter();
  const { loading, data } = useQuery(GET_POST_BY_ID, {
    variables: {
      postId: router.query.postId,
    },
  });
  const post = data?.getPostById;

  if (loading) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{post?.title}</title>
      </Head>
      <div
        id="post-detail"
        className="mx-auto max-w-4xl bg-white relative rounded my-16"
      >
        <div className="w-full p-3">
          <PostHeader post={post} isPostDetail />
          <PostBody post={post} isPostDetail />
          <PostFooter post={post} isPostDetail />
          <PostComments />
        </div>
      </div>
    </>
  );
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const response = await client.query({
//     query: GET_POST_BY_ID,
//     variables: {
//       postId: context.params?.postId,
//     },
//   });
//   return {
//     props: {
//       postDetailResponse: response,
//     },
//   };
// }
