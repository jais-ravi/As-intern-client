"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { ChevronLeft, IndianRupee } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProductData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/products/product-details`, {
        params: { productId: params.id },
      });
      setProduct(response.data.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
      toast({
        title: "Error fetching product",
        description: "Could not load product details. Try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="container">
        <div className="flex justify-between">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-14" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
          <div className="flex justify-center">
            <Skeleton className="h-80 w-80" />
          </div>
          <div>
            <Skeleton className="h-10 w-60" />
            <div className="mt-2 space-y-1">
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="h-5 w-[80%]" />
              ))}
            </div>
            <div className="flex gap-5 my-3">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-20" />
            </div>
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-60 my-5" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center text-red-500">
        Product details not available. Please try again later.
      </div>
    );
  }
  const handleCart = async () => {
    try {
      const response = await axios.post(`/api/cart`, {
        productId: product._id,
      });
      if (response.data.success) {
        toast({ title: "Success", description: "Product added to cart!" });
      } else {
        throw new Error("Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "Could not add to cart.",
        variant: "destructive",
      });
    }
  };
  const images = product.productImages || [];
  const fallbackImage = "/placeholder-image.png";

  return (
    <div className="container space-y-5">
      <div className="py-2 flex justify-between items-center">
        <Button size="icon" variant="outline" onClick={handleBack}>
          <ChevronLeft />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="m-auto my-0">
          <Carousel className=" max-w-96">
            <CarouselContent>
              {images.length > 0 ? (
                images.map((image, index) => (
                  <CarouselItem key={index}>
                    <Card className="overflow-hidden">
                      <CardContent className="flex aspect-square items-center justify-center p-0">
                        <Image
                          src={`data:image/png;base64,${image.data}`}
                          alt={`Product Image ${index + 1}`}
                          className="w-full h-full object-cover"
                          width={100}
                          height={100}
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <Image
                          src={fallbackImage}
                          alt="Fallback Product Image"
                          className="w-full h-full object-cover"
                          width={100}
                          height={100}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            <CarouselPrevious className="-left-0 lg:-left-5 " />
            <CarouselNext className="-right-0 lg:-right-5" />
          </Carousel>
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">
            {product.productName || "Unnamed Product"}
          </h1>
          <p className="text-base font-semibold text-zinc-700">
            {product.productDes || "No description available"}
          </p>
          <div className="flex gap-2">
            <h1 className="text-3xl font-bold flex items-center">
              <IndianRupee size="25" strokeWidth={3} />
              {product.sellingPrice || 0}
            </h1>
            {product.discount && (
              <h1 className="text-xl font-bold text-zinc-500 line-through flex items-center">
                <IndianRupee size="20" strokeWidth={3} />
                {product.productPrice}
              </h1>
            )}
          </div>
          {product.discount && (
            <Badge className="text-sm">{product.discount}% OFF</Badge>
          )}
          <div className="space-x-5">
            <Button
              variant="secondary"
              className="border-2 border-zinc-600 text-lg"
              onClick={handleCart}
            >
              Add to Cart
            </Button>
            <Button
              variant="secondary"
              className="border-2 border-zinc-600 text-lg"
            >
              Buy Now
            </Button>
          </div>
          <Card>
            <CardContent className="pt-6 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <h1>Brand: {product.productBrand}</h1>
                <h1>Tag: {product.tags.join(", ")}</h1>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <h1>
                  Delivery Charge: <IndianRupee size="15" strokeWidth={3} />
                  {product.deliveryCharge}
                </h1>
                <h1>Free Delivery: {product.freeDelivery ? "Yes" : "No"}</h1>
              </div>
              <h1>Out of Stock: {product.outOfStocks ? "Yes" : "No"}</h1>
              <h1>
                Created on:{" "}
                {new Date(product.createdAt).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </h1>
            </CardContent>
          </Card>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Product Image Gallery</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4 justify-center">
          {images.length > 0 ? (
            images.map((image, index) => (
              <div
                key={index}
                className="w-full sm:w-[28rem] md:w-[24rem] lg:w-[20rem] xl:w-[18rem]"
              >
                <Image
                  src={`data:image/png;base64,${image.data}`}
                  alt={`Product Image ${index + 1}`}
                  className="w-full h-auto object-cover border-2 border-zinc-500"
                  width={400}
                  height={400}
                />
              </div>
            ))
          ) : (
            <div className="w-full sm:w-[28rem] md:w-[24rem] lg:w-[20rem] xl:w-[18rem]">
              <Image
                src={fallbackImage}
                alt="Fallback Product Image"
                className="w-full h-auto object-cover border-2 border-zinc-500"
                width={400}
                height={400}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetailsPage;
