import Navbar from "./Navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Layout({ children }) {
  const router = useRouter();
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
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

export default Layout;
