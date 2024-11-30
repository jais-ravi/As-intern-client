import React from "react";

import CatNav from "@/components/HeaderFooter/CatNav";


import Products from "@/components/Product/Product";
import Banner from "@/components/Ad/Banner";


const page = () => {
  return (
    <div className=" min-h-screen w-full ">
      <CatNav />
      <Banner/>
      <Products />
    </div>
  );
};

export default page;
