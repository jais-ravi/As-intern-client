import React from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { User, LogOut, MapPinHouse, Truck } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Profilebtn = ({ user }) => {
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      toast({
        title: "Signed Out",
        description: "You have successfully signed out.",
        status: "success",
      });
    } catch (error) {
      console.error("Error during sign out:", error);
      toast({
        title: "Error",
        description: "An error occurred during sign out.",
        status: "error",
      });
    }
  };

  const menuData = [
    {
      name: "Profile",
      icon: <User className="mr-2 h-4 w-4" />,
      url: "/profile",
    },
    {
      name: "Address",
      icon: <MapPinHouse className="mr-2 h-4 w-4" />,
      url: "/address",
    },
    {
      name: "Track Order",
      icon: <Truck className="mr-2 h-4 w-4" />,
      url: "/orders/track",
    },
  ];

  if (!user) {
    return null; // Guard against undefined or null user.
  }

  return (
    <DropdownMenuContent className="min-w-52">
      <DropdownMenuLabel>
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">
              {user.username?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold space-x-2">
              <span>{user.username || "User"}</span>
            </span>
            <span className="truncate text-xs">{user.email || "No email"}</span>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      {menuData.map((data, index) => (
        <Link href={data.url} key={index}>
          <DropdownMenuItem>
            {data.icon}
            <span>{data.name}</span>
          </DropdownMenuItem>
        </Link>
      ))}
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleSignOut}>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default Profilebtn;
