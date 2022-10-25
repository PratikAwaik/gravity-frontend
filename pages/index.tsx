import { useQuery } from "@apollo/client";
import Head from "next/head";
import Image from "next/image";
import Forum from "../components/Home/Forum";
import LoadingWrapper from "../components/Utils/LoadingWrapper";
import { GET_ALL_POSTS } from "../graphql/posts/query";

export default function Home() {
  const { loading, data } = useQuery(GET_ALL_POSTS);
  return (
    <>
      <Head>
        <title>Gravity</title>
      </Head>
      <div className="w-full h-full">
        <div className="py-5 px-6 flex items-center justify-center">
          <div className="forum max-w-3xl h-full">
            <LoadingWrapper isLoading={loading}>
              <Forum posts={data} />
            </LoadingWrapper>
          </div>
        </div>
      </div>
    </>
  );
}

// * try server side rendering
// export async function getServerSideProps() {
//   const { data } = await client.query({ query: GET_ALL_POSTS });
//   return {
//     props: {
//       posts: data,
//     },
//   };
// }
