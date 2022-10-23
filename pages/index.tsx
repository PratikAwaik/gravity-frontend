import Head from "next/head";
import Forum from "../components/Home/Forum";
import { GET_ALL_POSTS } from "../graphql/posts/query";
import client from "../utils/client";

export default function Home({ posts }: { posts: any }) {
  return (
    <>
      <Head>
        <title>Gravity</title>
      </Head>
      <div className="w-full h-full mt-16">
        <div className="py-5 px-6 flex items-center justify-center">
          <div className="forum max-w-3xl">
            <Forum posts={posts} />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await client.query({ query: GET_ALL_POSTS });
  return {
    props: {
      posts: data,
    },
  };
}
