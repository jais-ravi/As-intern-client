"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import useSWR from "swr"; // Import SWR
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
  const { data: cartProducts, error, mutate } = useSWR("/api/cart-products", fetchCartData);

  const handleRemove = async (productId) => {
    try {
      const response = await axios.delete("/api/cart-update", {
        data: { productId },
      });
      if (response.data.success) {
        // Mutate the cache to update cartProducts without refetching
        mutate((prevCart) => prevCart.filter((product) => product._id !== productId), false);
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
        mutate((prevCart) =>
          prevCart.map((product) =>
            product._id === productId ? { ...product, quantity: newQuantity } : product
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

  if (error) {
    return <p>Error loading cart data. Please try again later.</p>;
  }

  if (!cartProducts) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="container section">
        <Card>
          <CardHeader>
            <CardTitle>Your Cart</CardTitle>
            <CardDescription>Review your selected products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                {cartProducts.length > 0 ? (
                  cartProducts.map((product) => (
                    <CartProductCard
                      key={product._id}
                      product={product}
                      onRemove={handleRemove}
                      onUpdateQuantity={handleUpdateQuantity}
                    />
                  ))
                ) : (
                  <p>Your cart is empty.</p>
                )}
              </div>
            </div>
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
