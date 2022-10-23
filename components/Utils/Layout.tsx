import * as React from "react";
import { useRouter } from "next/router";
import Navbar from "../Navbar/Navbar";
import { AUTH } from "../../utils/constants";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [showHeader, setShowHeader] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    if (AUTH.PAGES.includes(router.pathname)) {
      setShowHeader(false);
    } else setShowHeader(true);
  }, [router.pathname]);

  return (
    <>
      {showHeader && <Navbar />}
      {children}
    </>
  );
}
