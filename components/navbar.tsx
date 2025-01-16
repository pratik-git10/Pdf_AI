import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface NavbarProps {
  showLinkOnSmallDevices: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showLinkOnSmallDevices }) => {
  return (
    <div className="flex justify-between items-center rounded-md border p-2 shadow-md shadow-slate-500">
      <Link href="/">
        <h2
          className={`text-2xl font-extrabold text-red-400 ${showLinkOnSmallDevices ? "block" : "md:hidden"}`}>
          PdfAI
        </h2>
      </Link>

      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Button>Login</Button>
        </Link>
      </SignedOut>
    </div>
  );
};

export default Navbar;
