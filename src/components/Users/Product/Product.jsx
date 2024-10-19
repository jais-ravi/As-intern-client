"use client"; // Ensure this is a client component
import React from "react";

import { useState, useEffect } from "react";
ProductCard
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"; // Ensure correct import from shadcn

import Autoplay from "embla-carousel-autoplay";
import ProductCard from "@/components/Users/Product/ProductCard";
import { Card } from "@/components/ui/card";



export default function Product() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  useEffect(() => {
    // Simulate an API call to fetch products
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          name: "Github",
          image: "download.png",
          price: 100,
          discountedPrice: 75,
          discountPercentage: 12,
          description:
            "No problem have been detected in the workspace No problem have been detected in the workspace ",
        },
        {
          id: 1,
          name: "Product 1",
          image: "download.png",
          price: 100,
          discountedPrice: 75,
          discountPercentage: 0,
          description: "No problem have been detected in the workspace",
        },
        {
          id: 1,
          name: "Product 1",
          image: "download.png",
          price: 100,
          discountedPrice: 75,
          discountPercentage: 12,
          description: "No problem have been detected in the workspace",
        },
        {
          id: 1,
          name: "Product 1",
          image: "download.png",
          price: 100,
          discountedPrice: 75,
          discountPercentage: 0,
          description: "No problem have been detected in the workspace",
        },
        {
          id: 1,
          name: "Product 1",
          image: "download.png",
          price: 100,
          discountedPrice: 75,
          discountPercentage: 12,
          description: "No problem have been detected in the workspace",
        },
        {
          id: 1,
          name: "Product 1",
          image: "download.png",
          price: 100,
          discountedPrice: 75,
          discountPercentage: 12,
          description: "No problem have been detected in the workspace",
        },
        {
          id: 1,
          name: "Product 1",
          image: "download.png",
          price: 100,
          discountedPrice: 75,
          discountPercentage: 12,
          description: "No problem have been detected in the workspace",
        },
        {
          id: 1,
          name: "Product 1",
          image: "download.png",
          price: 100,
          discountedPrice: 75,
          discountPercentage: 12,
          description: "No problem have been detected in the workspace",
        },

        // Add more products as needed
      ]);
      setIsLoading(false);
    }, 2000); // Simulating a delay of 2 seconds
  }, []);

  return (
    <div className="container section mx-auto ">
      <Card>
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
                  <Card key={index} className="pl-1 ">
                    <div className="p-1">
                      <ProductCard isLoading={true} />
                    </div>
                  </Card>
                ))
              : products.map((product) => (
                  <div key={product.id} className="pl-1 ">
                    <div className="p-1">
                      <ProductCard product={product} isLoading={false} />
                    </div>
                  </div>
                ))}
          </CarouselContent>
          <CarouselPrevious className="ml-12" />
          <CarouselNext className="mr-12" />
        </Carousel>
      </Card>
    </div>
  );
}
