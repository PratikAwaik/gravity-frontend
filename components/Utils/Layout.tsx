import * as React from "react";
import { useRouter } from "next/router";
import Navbar from "../Navbar/Navbar";
import { PAGES } from "../../utils/pages";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const [showHeader, setShowHeader] = React.useState(true);

  React.useEffect(() => {
    if (router.pathname === PAGES.LOGIN || router.pathname === PAGES.REGISTER) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [router.pathname]);

  return (
    <>
      {showHeader && <Navbar />}
      {children}
    </>
  );
}
