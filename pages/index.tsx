import Head from "next/head";
import Forum from "../components/Home/Forum";

export default function Home() {
  return (
    <>
      <Head>
        <title>Gravity</title>
      </Head>
      <div className="w-full h-full mt-16">
        <div className="py-5 px-6 flex items-center justify-center">
          <div className="forum max-w-full">
            <Forum />
          </div>
        </div>
      </div>
    </>
  );
}
