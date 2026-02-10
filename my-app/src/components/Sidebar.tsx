"use client";

import React from "react";
import { sidebarlinks } from "@/constants";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <React.Fragment>
      <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6  bg-(--dark-1) pt-28 max-sm:hidden lg:w-66">
        <div className=" flex flex-1 flex-col gap-6">
          {sidebarlinks.map((link) => {
            const isActive =
              pathname === link.route || pathname.startsWith(`${link.route}/`);

            return (
              <Link
                href={link.route}
                key={link.label}
                className={cn(
                  "flex gap-4 items-center p-4 rounded-lg justify-start",
                  {
                    "bg-blue-1": isActive,
                  },
                )}
              >
                <Image
                  src={link.imgurl}
                  alt={link.label}
                  width={20}
                  height={20}
                />
                <p className="text-lg font-semibold max-lg:hidden">
                  {link.label}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </React.Fragment>
  );
};

export default Sidebar;
