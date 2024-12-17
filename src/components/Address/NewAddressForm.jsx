"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { newAddressSchema } from "@/schemas/newAddressSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "../ui/use-toast";

const NewAddressForm = ({ onNewAddress }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const form = useForm({
    resolver: zodResolver(newAddressSchema),
    defaultValues: {
      name: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      mobileNumber: "",
      landmark: "",
    },
  });

  const states = [
    { id: "AP", name: "Andhra Pradesh" },
    { id: "AR", name: "Arunachal Pradesh" },
    { id: "AS", name: "Assam" },
    { id: "BR", name: "Bihar" },
    { id: "CG", name: "Chhattisgarh" },
    { id: "GA", name: "Goa" },
    { id: "GJ", name: "Gujarat" },
    { id: "HR", name: "Haryana" },
    { id: "HP", name: "Himachal Pradesh" },
    { id: "JH", name: "Jharkhand" },
    { id: "KA", name: "Karnataka" },
    { id: "KL", name: "Kerala" },
    { id: "MP", name: "Madhya Pradesh" },
    { id: "MH", name: "Maharashtra" },
    { id: "MN", name: "Manipur" },
    { id: "ML", name: "Meghalaya" },
    { id: "MZ", name: "Mizoram" },
    { id: "NL", name: "Nagaland" },
    { id: "OD", name: "Odisha" },
    { id: "PB", name: "Punjab" },
    { id: "RJ", name: "Rajasthan" },
    { id: "SK", name: "Sikkim" },
    { id: "TN", name: "Tamil Nadu" },
    { id: "TG", name: "Telangana" },
    { id: "TR", name: "Tripura" },
    { id: "UP", name: "Uttar Pradesh" },
    { id: "UK", name: "Uttarakhand" },
    { id: "WB", name: "West Bengal" },
  ];

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/address/add-address", data);

      if (response.data.success) {
        toast({
          title: "Success",
          description: response.data.message,
        });

        // Pass the new address to the parent component
        onNewAddress(data);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error", error);

      if (axios.isAxiosError(error)) {
        let errorMessage =
          error.response?.data.message || "Something went wrong!";
        toast({
          title: "Failed",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Failed",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }

      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Address</Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Address</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="mobileNumber"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Mobile Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full"
                type="button" 
                onClick={() => {
                  // Handle current location logic here
                  console.log("Using current location");
                }}
              >
                Use current location
              </Button>

              <FormField
                name="addressLine1"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 1</FormLabel>
                    <FormControl>
                      <Input placeholder="Flat, House no., Building, Company, Apartment" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="addressLine2"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 2 (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Area, Street, Sector, Village" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="landmark"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Landmark (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Landmark" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="city"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Town/City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="postalCode"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Postal Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                  name="state"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                      <div {...field}>
                        <Select >
                          <SelectTrigger id="state">
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectGroup>
                              <SelectLabel>State</SelectLabel>
                              {states.map((state) => (
                                <SelectItem key={state.id} value={state.name}>
                                  {state.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>

            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

            <Button className="w-full mt-4" type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Add Address"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewAddressForm;
