"use client";
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

  return (
    <Card className="bg-white rounded-xl shadow-lg w-60">
      <CardHeader className="p-0 pb-2">
        {/* Product Image */}
        <Image
          src={imageUrl}
          alt={productName}
          className="w-full h-60 object-cover rounded-t-lg"
          width={200}
          height={200}
        />
      </CardHeader>
      <CardContent className="pb-0 px-3">
        <CardTitle className="text-base font-semibold text-gray-800 ">
          {productName}
        </CardTitle>
        <CardDescription className="text-xs text-gray-500 line-clamp-2">
          {productDescription}
        </CardDescription>
        <div className="mb-1 flex gap-1">
          {/* Price Information */}
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
            {discount > 0 && (
              <Badge className="text-xs">{roundedDiscount}% OFF</Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between px-3 pb-3">
        <Button className="text-white" size="icon">
          <ShoppingCart size={20} />
        </Button>
        <Button variant="outline" className="text-gray-800" >
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
}
