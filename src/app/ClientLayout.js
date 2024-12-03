"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/HeaderFooter/Navbar";
import Footer from "@/components/HeaderFooter/Footer";
import { Toaster } from "@/components/ui/toaster";
import CatNav from "@/components/HeaderFooter/CatNav";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const noHeaderFooterRoutes = ["/sign-in", "/sign-up", "/forgot-password" ,"/verify"];
  const showHeaderFooter = !noHeaderFooterRoutes.some((route) => pathname.startsWith(route));

  return (
    <>
      {showHeaderFooter && <Navbar />}
      {showHeaderFooter && <CatNav />}
      {children}
      <Toaster />
      {showHeaderFooter && <Footer />}
    </>
  );
}
