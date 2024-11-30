"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/HeaderFooter/Navbar";
import Footer from "@/components/HeaderFooter/Footer";
import { Toaster } from "@/components/ui/toaster";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const noHeaderFooterRoutes = ["/sign-in", "/sign-up", "/forgot-password"];
  const showHeaderFooter = !noHeaderFooterRoutes.includes(pathname);

  return (
    <>
      {showHeaderFooter && <Navbar />}
      {children}
      <Toaster />
      {showHeaderFooter && <Footer />}
    </>
  );
}
