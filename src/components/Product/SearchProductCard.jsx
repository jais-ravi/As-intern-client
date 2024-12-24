"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, IndianRupee } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import axios from "axios";
import { toast } from "../ui/use-toast";

export default function SearchProductCard({ product, isLoading }) {
  if (isLoading) {
    return (
      <Card className="flex flex-col  w-full sm:w-72 overflow-hidden">
        <CardHeader className="p-0 flex justify-center items-center ">
          <div className=" w-48 h-48 sm:w-72 sm:h-72 ">
            <Skeleton className="w-full h-full" />
          </div>
        </CardHeader>
        <div className=" w-full flex flex-col justify-between ">
          <CardContent className="p-4 ">
            <div className="space-y-2 mb-1">
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-full h-5" />

            </div>
            <div className="flex gap-2  flex-wrap">
              <Skeleton className="w-20 h-8" />
              <Skeleton className="w-20 h-8" />
            </div>
          </CardContent>
          <CardFooter className="flex gap-5 px-3 ">
            <Skeleton className="w-10 h-10" />
            <Skeleton className="w-20 h-10" />
          </CardFooter>
        </div>
      </Card>
    );
  }
  
  // Check if the product has images, and use the first image (base64 or URL)
  const images = product.productImages || [];
  const imageUrl =
    images.length > 0 && images[0].data
      ? `data:image/png;base64,${images[0].data}`
      : images.length > 0 && images[0].url
        ? images[0].url
        : "/images/placeholder-image.png"; // Fallback image if no images exist

  // Fallback values if product details are missing
  const productName = product.productName || "Product Name";
  const productDescription = product.productDes || "No description available.";
  const sellingPrice = product.sellingPrice || 0;
  const originalPrice = product.productPrice || 0;
  const discount = product.discount || 0;
  const roundedDiscount = Math.round(discount);

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

  const handleBuy = () => {
    console.log("Buying Now", product._id);
  };
  
  return (
    <Card className="flex flex-col  w-full sm:w-72 overflow-hidden">
      <Link href={`/product/${product._id}`} passHref>
        <CardHeader className="p-0  flex justify-center items-center ">
          <div className=" w-48 h-48 sm:w-72 sm:h-72 ">
            <Image
              src={imageUrl}
              alt={productName}
              className=" w-full h-full object-cover "
              width={200}
              height={200}
            />
          </div>
        </CardHeader>
      </Link>
      <div className=" flex flex-col  ">
        <Link href={`/product/${product._id}`} passHref>
          <CardContent className="p-2 sm:p-4">
            <CardTitle className="text-lg sm:text-xl font-bold capitalize">
              {productName}
            </CardTitle>
            <CardDescription className=" text-xs sm:text-sm text-gray-500 line-clamp-2">
              {productDescription}
            </CardDescription>
            <div className="flex gap-2 my-2 flex-wrap">
              <p className="text-lg font-bold flex items-center">
                <IndianRupee size="15" strokeWidth={3} />
                {sellingPrice}
              </p>
              <div className="flex gap-3">
                {originalPrice > 0 && (
                  <p className="text-gray-500 text-sm font-semibold line-through flex items-center">
                    <IndianRupee size="13" strokeWidth={3} />
                    {originalPrice}
                  </p>
                )}
                {roundedDiscount > 0 && (
                  <Badge className="text-xs">{roundedDiscount}% OFF</Badge>
                )}
              </div>
            </div>
            <div>
              {product.freeDelivery ? (
                <p className=" text-sm">Free Delivery</p>
              ) : (
                <p className=" flex items-center">
                  Delivery Charge : <IndianRupee size="15" strokeWidth={3} />{" "}
                  {product.deliveryCharge}
                </p>
              )}
            </div>
          </CardContent>
        </Link>
        <CardFooter className="flex gap-5  p-2 pt-0">
          <Button className="text-white" size="icon" onClick={handleCart}>
            <ShoppingCart size={20} />
          </Button>
          <Button
            variant="outline"
            className="text-gray-800"
            onClick={handleBuy}
          >
            Buy Now
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
