"use client";

import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { RiShoppingCart2Line } from "react-icons/ri";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Profilebtn from "@/components/Profile/Profilebtn";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronDown, Loader2, Search } from "lucide-react";
import { Separator } from "../ui/separator";
import { useRouter, useSearchParams } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(""); // State to store the search query
  const [loading, setLoading] = useState(false); // Loading state for search

  useEffect(() => {
    // Initialize query from the URL search parameters
    const initialQuery = searchParams.get("query") || ""; // Default to empty if no query
    setQuery(initialQuery);
  }, [searchParams]);

  const handleLinkClick = (link) => {
    if (!session) {
      toast({
        title: "Please Login",
        description: "You have to Login first to access it",
        variant: "destructive",
      });
      setTimeout(() => {
        router.push("/sign-in");
      }, 1000);
    } else {
      router.push(link);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Update the URL with the search query
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div>
      <div className="container flex justify-between items-center py-3">
        {/* Logo */}
        <div>
          <h1 className="text-lg font-bold">Logo</h1>
        </div>

        {/* Search Bar */}
        <div className="hidden sm:block w-96 px-2">
          <form className="flex relative" onSubmit={handleSearch}>
            <Input
              type="search"
              placeholder="Search items..."
              value={query}
              onChange={(e) => setQuery(e.target.value)} // Update query on input change
              className=" border-zinc-900 "
            />
            <Button
              type="submit"
              className=" rounded-md rounded-l-none  absolute right-0 bg-background hover:bg-background  border border-zinc-900"
              size="icon"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin text-black" />
              ) : (
                <Search className="text-black" />
              )}
            </Button>
          </form>
        </div>

        {/* Right Section: Avatar & Cart */}
        <div className="flex gap-2 items-center">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="space-x-2">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback className="rounded-lg capitalize">
                      {`${user.username[0]}`}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline truncate font-semibold capitalize">
                    {user.username}
                  </span>
                  <ChevronDown className="sm:inline size-4" />
                </Button>
              </DropdownMenuTrigger>
              <Profilebtn user={user} />
            </DropdownMenu>
          ) : (
            <Link
              href="/sign-in"
              className="gap-3 flex items-center justify-center"
            >
              <Button variant="ghost" className="space-x-2">
                <CgProfile size={20} />
                <h1 className="hidden sm:inline text-sm">Login/Sign-up</h1>
              </Button>
            </Link>
          )}

          <Button
            variant="ghost"
            onClick={() => handleLinkClick("/cart")}
            className="space-x-1"
          >
            <RiShoppingCart2Line size={20} />
            <h1 className="hidden sm:inline text-sm">Cart</h1>
          </Button>
        </div>
      </div>

      {/* Search Bar Below for Small Screens */}
      <div className="sm:hidden px-4 py-2">
        <form className="flex relative" onSubmit={handleSearch}>
          <Input
            type="search"
            placeholder="Search items..."
            value={query}
            onChange={(e) => setQuery(e.target.value)} // Update query on input change
            className=" border-zinc-900 "
          />
          <Button
            type="submit"
            className=" rounded-md rounded-l-none  absolute right-0  bg-background hover:bg-background  border border-zinc-900"
            size="icon"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-black" />
            ) : (
              <Search className="text-black" />
            )}
          </Button>
        </form>
      </div>
      <Separator />
    </div>
  );
};

export default Navbar;
