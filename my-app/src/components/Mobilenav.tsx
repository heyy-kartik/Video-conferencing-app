"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarlinks } from "@/constants/index";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";
const Mobilenav = () => {
  const pathname = usePathname();
  return (
    <section className="flex items-center gap-4">
      <Sheet>
        <SheetTrigger asChild className="bg-(--dark-1) p-2 rounded-md">
          <Image
            src="/icons/hamburger.svg"
            alt="menu"
            width={35}
            height={35}
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-(--dark-1)">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/icons/logo.svg"
              alt="hamburger"
              width={32}
              height={32}
            />
            <p className="text-[26px] font-extrabold text-white max-sm:hidden">
              Zoom{" "}
            </p>
          </Link>
          <div className=" flex h-[calc(100vh-72vh)] flex-col justify-between overflow-y-auto ">
            <SheetClose asChild>
              <section className=" flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarlinks.map((item) => {
                  const isActive = pathname === item.route;

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className={cn(
                          "flex gap-4 items-center p-4 rounded-lg w-full max-w-60",
                          {
                            "bg-blue-1": isActive,
                          },
                        )}
                      >
                        <Image
                          src={item.imgurl}
                          alt={item.label}
                          width={20}
                          height={20}
                        />
                        <p className="font-semibold">{item.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>{" "}
    </section>
  );
};

export default Mobilenav;
