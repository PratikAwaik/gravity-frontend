import * as React from "react";
import { useRouter } from "next/router";
import Navbar from "./Navbar/Navbar";

export default function Layout({ children }) {
  const router = useRouter();
  const [showHeader, setShowHeader] = React.useState(true);

  React.useEffect(() => {
    if (router.pathname === "/login" || router.pathname === "/register") {
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