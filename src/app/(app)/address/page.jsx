"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddressCard from "@/components/Address/AddressCard";
import NewAddressForm from "@/components/Address/NewAddressForm";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Page = () => {
  const [addresses, setAddresses] = useState([]);
  const { data, error, isLoading, mutate } = useSWR("/api/address/get-address", fetcher);

  useEffect(() => {
    if (data) setAddresses(data);
  }, [data]);

  const handleRemove = async (addressId) => {
    try {
      const response = await axios.delete("/api/address/address-update", {
        data: { addressId },
      });

      if (response.data.success) {
        mutate(
          (currentAddresses) =>
            currentAddresses.filter((address) => address._id !== addressId),
          false
        );
        toast({
          title: "Address Deleted",
          description: "The address has been successfully removed.",
        });
      }
    } catch (error) {
      console.error("Error removing address:", error);
      toast({
        title: "Error removing address",
        description: "Could not remove the address. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleNewAddress = (newAddress) => {
    setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
  };

  return (
    <div className="container py-5">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Your Addresses</CardTitle>
        </CardHeader>
        <CardContent className="min-h-96">
          {isLoading ? (
            // Show skeletons while data is loading
            <div className="flex gap-5 flex-wrap">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-64 w-[21.5rem] rounded-lg" />
              ))}
            </div>
          ) : error ? (
            // Show error message if data fetching fails
            <div className="text-red-600 w-full min-h-[22rem] flex justify-center items-center p-4 border border-red-600 rounded-lg">
              <span className="font-bold">Error:</span> {error.message || "Failed to load addresses"}
            </div>
          ) : addresses.length === 0 ? (
            // Show "No addresses found" message if there are no addresses
            <div className="flex flex-col items-center justify-center w-full min-h-[22rem]">
              <p className="text-lg text-gray-600">No address found. Create a new address.</p>
            </div>
          ) : (
            // Show addresses when data is available
            <div className="flex gap-5 flex-wrap">
              {addresses.map((address, index) => {
                const addressKey = address.id || address._id || index;
                return (
                  <AddressCard
                    key={addressKey}
                    address={address}
                    onRemove={handleRemove}
                  />
                );
              })}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <NewAddressForm onNewAddress={handleNewAddress} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
