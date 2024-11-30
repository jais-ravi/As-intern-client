"use client"; // Ensure this is a client component
import React, { useRef } from "react";
import axios from "axios";
import useSWR from "swr"; // Import SWR
import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"; // Ensure correct import from shadcn
import Autoplay from "embla-carousel-autoplay";
import { Card } from "@/components/ui/card";
import ProductCard from "./ProductCard"; // Import your ProductCard component

// Function to fetch data
const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export default function Products() {
  const { data, error } = useSWR("/api/products/get-products", fetcher, {
    revalidateOnFocus: false, // Optional: Disable revalidation on focus
    refreshInterval: 60000, // Optional: Periodic revalidation every 60 seconds
  });

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  if (error) {
    return <div>Error loading products</div>;
  }

  const isLoading = !data;

  return (
    <div className="container section">
      <h1 className="text-2xl font-bold mx-3 mt-3">BestSellers</h1>
      <Carousel
        className="w-full py-2 px-5"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="-ml-1">
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <Card key={index} className="pl-1">
                  <div className="p-1">
                    <ProductCard isLoading={true} />
                  </div>
                </Card>
              ))
            : data.map((product) => (
                <div key={product._id} className="pl-1">
                  <div className="p-1">
                    <ProductCard product={product} isLoading={false} /> {/* Pass the correct product data */}
                  </div>
                </div>
              ))}
        </CarouselContent>
        <CarouselPrevious className="ml-12" />
        <CarouselNext className="mr-12" />
      </Carousel>
    </div>
  );
}
