import Image from "next/image";

function AstronautAnimation() {
  return (
    <div className="astronaut-animation animate-bounce flex items-center justify-center w-96 h-full rounded-tl-lg rounded-bl-lg">
      <Image
        src="/images/logo.svg"
        alt="An astronaut floating in space"
        width={120}
        height={120}
      />
    </div>
  );
}

export default AstronautAnimation;
