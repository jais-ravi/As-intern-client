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

// components/ProductCard.js
export default function ProductCard({ product, isLoading }) {
  if (isLoading) {
    return (
      <Card className="animate-pulse bg-gray-200 p-4 rounded-lg w-64 h-[22.1rem]">
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

  return (
    <Card className="bg-white rounded-xl shadow-lg w-64 ">
      <CardHeader className="p-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className=" pb-1">
        <CardTitle className="text-base font-semibold text-gray-800 mb-1">
          {product.name}
        </CardTitle>
        <CardDescription className="text-xs text-gray-500 mb-1.5 line-clamp-2">
          {product.description}
        </CardDescription>
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-2">
            <p className="text-lg font-bold flex items-center">
              <IndianRupee size="15" strokeWidth={3} />
              {product.discountedPrice}
            </p>
            <p className="text-gray-500 text-sm line-through flex items-center">
              <IndianRupee size="15" strokeWidth={3} />
              {product.price}
            </p>
          </div>
          {product.discountPercentage > 0 && (
            <Badge className="">{product.discountPercentage}% OFF</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="text-white">
          <ShoppingCart />
        </Button>
        <Button variant="outline">Buy Now</Button>
      </CardFooter>
    </Card>
  );
}
