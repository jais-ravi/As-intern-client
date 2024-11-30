import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CatNav = () => {
  const CatData = [
    {
      name: "Category 1",
      links: [
        { name: "Link 1.1", url: "/link1-1" },
        { name: "Link 1.2", url: "/link1-2" },
        { name: "Link 1.3", url: "/link1-3" },
      ],
    },
    {
      name: "Category 2",
      links: [
        { name: "Link 2.1", url: "/link2-1" },
        { name: "Link 2.2", url: "/link2-2" },
      ],
    },
    {
      name: "Category 3",
      links: [
        { name: "Link 3.1", url: "/link3-1" },
        { name: "Link 3.2", url: "/link3-2" },
        { name: "Link 3.3", url: "/link3-3" },
        { name: "Link 3.4", url: "/link3-4" },
      ],
    },
    {
      name: "Category 4",
      links: [
        { name: "Link 4.1", url: "/link4-1" },
        { name: "Link 4.2", url: "/link4-2" },
      ],
    },
    {
      name: "Category 5",
      links: [
        { name: "Link 5.1", url: "/link5-1" },
        { name: "Link 5.2", url: "/link5-2" },
      ],
    },
    {
      name: "Category 6",
      links: [
        { name: "Link 6.1", url: "/link6-1" },
        { name: "Link 6.2", url: "/link6-2" },
        { name: "Link 6.3", url: "/link6-3" },
      ],
    },
    {
      name: "Category 7",
      links: [
        { name: "Link 7.1", url: "/link7-1" },
        { name: "Link 7.2", url: "/link7-2" },
        { name: "Link 7.3", url: "/link7-3" },
      ],
    },
    {
      name: "Category 8",
      links: [
        { name: "Link 8.1", url: "/link8-1" },
        { name: "Link 8.2", url: "/link8-2" },
      ],
    },
  ];

  return (
    <div>
      <div className="container flex justify-center">
        <div className=" flex  flex-wrap  gap-2 ">
          {CatData.map((category) => (
            <NavigationMenu key={category.name} className="flex-1">
              <NavigationMenuList>
                <NavigationMenuItem> 
                  <NavigationMenuTrigger className="w-full text-center ">
                    {category.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className=" z-">
                    {/* <Card className="bg-zinc-100">
                      <CardContent className="pt-6 flex flex-col gap-4 min-w-52"> */}
                        {category.links.map((link) => (
                          <NavigationMenuLink asChild key={link.url} >
                            <Link
                              href={link.url}
                              className="text-sm  hover:underline"
                            >
                              {link.name}
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      {/* </CardContent>
                    </Card> */}
                  </NavigationMenuContent>
                 </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ))}
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default CatNav;
