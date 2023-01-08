import Head from "next/head";
import Feed from "../components/Home/Feed";
import LoadingWrapper from "../components/Utils/LoadingWrapper";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GET_ALL_POSTS } from "../graphql/posts/query";
import { PAGES } from "../utils/constants";
import { scrollToPreviousPosition } from "../utils/helpers/posts";

export default function Home() {
  const { loading, data, fetchMore } = useQuery(GET_ALL_POSTS, {
    variables: {
      pageNo: 0,
    },
  });
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === PAGES.INDEX) {
      scrollToPreviousPosition();
    }
  }, [router.pathname]);

  return (
    <>
      <Head>
        <title>Gravity</title>
      </Head>
      <div className="w-full h-full">
        <div className="py-5 px-6 flex items-center justify-center">
          <div className="forum max-w-3xl h-full">
            <LoadingWrapper isLoading={loading}>
              <Feed serverPosts={data?.allPosts ?? []} fetchMore={fetchMore} />
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
//   console.log(data);
//   return {
//     props: {
//       posts: data,
//     },
//   };
// }
