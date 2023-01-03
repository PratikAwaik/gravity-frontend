import Head from "next/head";
import Forum from "../components/Home/Forum";
import LoadingWrapper from "../components/Utils/LoadingWrapper";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GET_ALL_POSTS } from "../graphql/posts/query";
import { PAGES } from "../utils/constants";

export default function Home() {
  const [cursor, setCursor] = useState(null);
  const { loading, data } = useQuery(GET_ALL_POSTS, {
    variables: {
      cursor: cursor,
    },
  });
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === PAGES.INDEX) {
      scrollToPreviousPosition();
    }
  }, [router.pathname]);

  function scrollToPreviousPosition() {
    const yPosition = window.localStorage.getItem("gravityScrollPosition");
    if (yPosition) {
      window.scrollTo(0, parseInt(yPosition) - 50);
      window.localStorage.removeItem("gravityScrollPosition");
    }
  }

  return (
    <>
      <Head>
        <title>Gravity</title>
      </Head>
      <div className="w-full h-full">
        <div className="py-5 px-6 flex items-center justify-center">
          <div className="forum max-w-3xl h-full">
            <LoadingWrapper isLoading={loading}>
              <Forum posts={data?.allPosts ?? []} />
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
