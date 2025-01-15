import { UserButton } from "@clerk/nextjs";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-end items-center rounded-md border p-2 shadow-sm shadow-black ">
      <UserButton />
    </div>
  );
};

export default Navbar;
