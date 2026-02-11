import Link from "next/link";
import React from "react";
import Image from "next/image";
import Mobilenav from "./Mobilenav";
import { SignedIn, UserButton } from "@clerk/nextjs";
const Navbar = () => {
  return (
    <nav className="flex-between  fixed z-50 w-full px-6  py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image src="/icons/logo.svg" alt="hamburger" width={32} height={32} />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Zoom{" "}
        </p>
      </Link>

      <div className="flex-between gap-5">
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>
      </div>
      <Mobilenav />
    </nav>
  );
};

export default Navbar;
