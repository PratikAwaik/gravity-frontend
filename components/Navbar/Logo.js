import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <div className="flex items-center justify-center">
      <Link href="/">
        <a className="mr-2 w-9 h-9 sm:mr-5 flex items-center">
          <img
            src="/images/logo.svg"
            alt="Gravity Logo (An astronaut floating in space)"
            width={36}
            height={36}
          />
          <h1 className="text-2xl font-semibold hidden xl:block ml-2">
            Gravity
          </h1>
        </a>
      </Link>
    </div>
  );
}

export default Logo;
