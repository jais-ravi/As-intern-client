import React from "react";
import AdBanner from "@/components/Users/Ad/Banner";
import Footer from "@/components/Users/Footer/Footer";
import CatNav from "@/components/Users/Header/CatNav";
import Navbar from "@/components/Users/Header/Navbar";
import Product from "@/components/Users/Product/Product";
import ProductPage from "@/components/Users/Product/ProductPage";

const page = () => {
  return (
    <div className=" min-h-screen w-full ">
      <Navbar />
      <CatNav />
      <AdBanner />
      <Product />
      <ProductPage />
      <Footer />
    </div>
  );
};

export default page;
