"use client";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { RiShoppingCart2Line } from "react-icons/ri";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Profilebtn from "@/components/Profile/Profilebtn";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronDown } from "lucide-react";
import { Separator } from "../ui/separator";


const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const { toast } = useToast();
  const router = useRouter();

  const handleLinkClick = (link) => {
    if (!session) {
      toast({
        title: "Please Login",
        description: "You have to Login first to access it",
        variant: "destructive",
      });
      setTimeout(() => {
        router.replace("/sign-in");
      }, 1000);
    } else {
      router.replace(link);
    }
  };

  const navbtn = [
    {
      icon: <RiShoppingCart2Line size={20} />,
      text: "Cart",
      link: "",
    },
  ];

  return (
    <div>
      <div className="container flex justify-between items-center py-3">
        {/* Logo */}
        <div>
          <h1 className="text-lg font-bold">Logo</h1>
        </div>

        {/* Search Bar */}
        <div className="hidden sm:block">
          <form className="flex">
            <Input type="search" placeholder="Search items" />
            {/* Add a search button if needed */}
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
                    <AvatarFallback className="rounded-lg">
                      {`${user.username[0]}`}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline truncate font-semibold">
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

          {navbtn.map((item, index) => (
            <Button
              variant="ghost"
              key={index}
              onClick={() => handleLinkClick(item.link)}
              className="space-x-1"
            >
              {item.icon}
              <h1 className="hidden sm:inline text-sm">{item.text}</h1>
            </Button>
          ))}
        </div>
      </div>

      {/* Search Bar Below for Small Screens */}
      <div className="sm:hidden px-4 py-2">
        <form>
          <Input type="search" placeholder="Search items" />
        </form>
      </div>
      <Separator />
    </div>
  );
};

export default Navbar;
