"use client";
import React from "react";
import axios from "axios";
import useSWR from "swr";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CartProductCard from "@/components/Product/CartProductCard";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { IndianRupee } from "lucide-react";

const fetchCartData = async () => {
  const response = await axios.get("/api/cart-products");
  const cart = response.data.cart;

  const productDetails = await Promise.all(
    cart.map(async (item) => {
      const productResponse = await axios.get("/api/products/product-details", {
        params: { productId: item.productId },
      });
      return { ...productResponse.data.data, quantity: item.quantity };
    })
  );
  return productDetails;
};

const CartPage = () => {
  // Use SWR to fetch and cache cart data
  const {
    data: cartProducts,
    error,
    mutate,
    isLoading, // Check if data is loading
  } = useSWR("/api/cart-products", fetchCartData);

  const handleRemove = async (productId) => {
    try {
      const response = await axios.delete("/api/cart-update", {
        data: { productId },
      });
      if (response.data.success) {
        // Mutate the cache to update cartProducts without refetching
        mutate(
          (prevCart) => prevCart.filter((product) => product._id !== productId),
          false
        );
        toast({
          title: "Product removed",
          description: "The product was removed from your cart.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast({
        title: "Error removing product",
        description: "Could not remove product. Try again later.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      const response = await axios.patch("/api/cart-update", {
        productId,
        quantity: newQuantity,
      });

      if (response.data.success) {
        // Mutate the cache to update quantity without refetching
        mutate(
          (prevCart) =>
            prevCart.map((product) =>
              product._id === productId
                ? { ...product, quantity: newQuantity }
                : product
            ),
          false
        );
        toast({
          title: "Quantity updated",
          description: `The quantity for the product was updated to ${newQuantity}.`,
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast({
        title: "Error updating quantity",
        description: "Could not update product quantity. Try again later.",
        variant: "destructive",
      });
    }
  };

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return (
      <div className=" container">
        <Card className="mt-7">
          <CardHeader>
            <CardTitle>Your Cart</CardTitle>
            <CardDescription>Review your selected products</CardDescription>
          </CardHeader>
          <CardContent className="min-h-96">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-96">
              <div className="space-y-3">
                <Skeleton className="w-full h-32" />
                <Skeleton className="w-full h-32" />
                <Skeleton className="w-full h-32" />
              </div>
              <div>
                <Skeleton className="w-full h-full" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <p>Total Products: 0</p>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className=" w-full h-full min-h-96 flex justify-center items-center">
        <p className=" text-2xl font-semibold text-red-500">
          Error loading cart data. Please try again later.
        </p>
      </div>
    );
  }

  // Calculate the total price of all products in the cart
  const totalPrice = cartProducts.reduce((total, product) => {
    return total + product.quantity * product.sellingPrice;
  }, 0);

  // Handle empty cart or loaded cart products
  return (
    <div>
      <div className="container section">
        <Card>
          <CardHeader>
            <CardTitle>Your Cart</CardTitle>
            <CardDescription>Review your selected products</CardDescription>
          </CardHeader>
          <CardContent>
            {cartProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-96">
                <div className="space-y-3">
                  {cartProducts.map((product) => (
                    <CartProductCard
                      key={product._id}
                      product={product}
                      onRemove={handleRemove}
                      onUpdateQuantity={handleUpdateQuantity}
                    />
                  ))}
                </div>
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Summary</CardTitle>
                      <CardDescription>
                        Buy all items in your cart.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-1 font-bold text-2xl">
                        Subtotal :{" "}
                        <h1 className="flex items-center">
                          {" "}
                          <IndianRupee size={25} strokeWidth={3} /> {totalPrice}
                        </h1>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline">
                        Place order ({cartProducts.length} items)
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            ) : (
              <div className=" w-full h-full min-h-96 flex justify-center items-center">
                <p className=" text-2xl font-semibold">Your cart is empty.</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <p>Total Products: {cartProducts.length}</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CartPage;
