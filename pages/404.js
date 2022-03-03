import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

function Custom404() {
  const router = useRouter();

  return (
    <div className="w-screen h-screen relative z-50 overflow-hidden">
      <Image
        className="w-full h-full object-cover absolute top-0 left-0 overflow-hidden"
        src="/images/404.jpg"
        alt="404 Not Found"
        layout="fill"
      />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-max">
        <span className="text-4xl sm:text-7xl font-light tracking-wider">
          404
        </span>
        <span className="text-4xl sm:text-7xl font-bold tracking-wider block">
          Lost in Space
        </span>
        <div className="w-48 h-1 mt-2 mb-5"></div>
        <span className="block text-md sm:text-lg">
          You have reached the edge of the universe.
        </span>
        <span className="block text-md sm:text-lg">
          The page you requested could not be found.
        </span>
        <span className="block text-md sm:text-lg">
          Don&apos;t worry and return to the previous page.
        </span>

        <div className="flex items-center my-8">
          <Link href="/">
            <a className="uppercase tracking-wide px-5 py-2 flex items-center justify-center text-sm sm:text-lg mr-5 bg-theme-blue rounded-2xl border-2 border-theme-blue">
              go home
            </a>
          </Link>
          <button
            className="uppercase tracking-wide px-5 py-2 flex items-center justify-center text-sm sm:text-lg border-2 border-theme-white-400 rounded-2xl hover:bg-theme-red hover:border-theme-red"
            type="button"
            onClick={() => router.back()}
          >
            back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Custom404;
