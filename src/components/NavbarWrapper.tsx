"use client";

import { usePathname } from "next/navigation";
import Navbar from "./NavBar";

function NavbarWrapper() {
  const pathname = usePathname();

  const hiddenRoutes =
    pathname.startsWith("/dashboard") ||
    pathname === "/login" ||
    pathname === "/register";

  if (hiddenRoutes) {
    return null;
  }

  return <Navbar />;
}

export default NavbarWrapper;
