"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

const CatNav = () => {

  const CatData = [
    {
      name: "Category 1",
      links: [
        { name: "Link 1.1", url: "/sign-in" },
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
      <div className="container">
        <div className=" flex justify-center">
          <Menubar className="flex flex-wrap space-x-0" >
            {CatData.map((category) => (
              <MenubarMenu key={category.name}>
                <MenubarTrigger className="text-sm font-semibold sm:text-base">
                  {category.name} <ChevronDown size={18} className="hidden sm:block" />
                </MenubarTrigger>
                <MenubarContent
                  align="start"
                  sideOffset={0}
                >
                  {category.links.map((link) => (
                    <MenubarItem key={link.url} >
                      <Link href={link.url} className="text-sm hover:underline ">
                        <Button className=" w-40 sm:w-48 flex justify-start text-xs sm:text-base" variant="ghost">{link.name}</Button>
                      </Link>
                    </MenubarItem>
                  ))}
                </MenubarContent>
              </MenubarMenu>
            ))}
          </Menubar>
        </div>
      </div>
      <Separator/>
    </div>
  );
};

export default CatNav;
