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

export default function ProductCard({ product, isLoading }) {
  if (isLoading) {
    return (
      <Card className="animate-pulse bg-gray-200 p-4 rounded-lg w-60 h-[22.1rem]">
        <CardContent className="space-y-4">
          <Skeleton className="h-40 rounded" />
          <Skeleton className="h-4 rounded w-1/2" />
          <Skeleton className="h-4 rounded" />
          <div>
            <Skeleton className="h-4 rounded" />
            <Skeleton className="h-4 rounded" />
            <Skeleton className="h-4 rounded" />
          </div>
        </CardContent>
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
    console.log("Buying Now");
  };

  return (
    <Card className="bg-white rounded-xl shadow-lg w-60 hover:cursor-pointer">
      <Link href={`/product/${product._id}`} passHref>
        <div className="cursor-pointer">
          <CardHeader className="p-0 pb-2">
            <Image
              src={imageUrl}
              alt={productName}
              className="w-60 h-60 object-cover rounded-t-lg"
              width={200}
              height={200}
            />
          </CardHeader>
          <CardContent className="pb-0 px-3 space-y-1">
            <CardTitle className="text-base font-semibold text-gray-800 ">
              {productName}
            </CardTitle>
            <CardDescription className="text-xs text-gray-500 line-clamp-2">
              {productDescription}
            </CardDescription>
            <div className="mb-1 flex gap-1">
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
          </CardContent>
        </div>
      </Link>
      <CardFooter className="flex justify-between px-3 py-2">
        <Button className="text-white" size="icon" onClick={handleCart}>
          <ShoppingCart size={20} />
        </Button>
        <Button variant="outline" className="text-gray-800" onClick={handleBuy}>
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
}
