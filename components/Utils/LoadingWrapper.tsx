import Image from "next/image";

interface LoadingWrapperProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export default function LoadingWrapper({
  isLoading,
  children,
}: LoadingWrapperProps) {
  return (
    <div className="w-full h-full">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Image
            src="/images/loading.svg"
            className="bg-transparent text-theme-gray-200"
            width={35}
            height={35}
          />
        </div>
      ) : (
        children
      )}
    </div>
  );
}
