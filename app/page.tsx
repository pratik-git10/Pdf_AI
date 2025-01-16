"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if (user) {
      CheckUser();
    }
  }, [user]);

  const CheckUser = async () => {
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress || "",
      imageUrl: user?.imageUrl || " ",
      userName: user?.fullName || " ",
    });
    console.log("result", result);
  };
  return (
    <div className="">
      <div className="my-2 mx-10 fixed inset-x-1 bg--500">
        <Navbar showLinkOnSmallDevices={true} />
        <div className="flex justify-center items-center bg--400 mt-20 px-2 flex-col text-center">
          <h1 className="text-xl md:text-4xl">
            Welcome to{" "}
            <span className="font-extrabold text-xl md:text-4xl text-red-400">
              PdfAI
            </span>
          </h1>
          <p className="text-md md:text-xl text-center">
            Perfect Solution to Study with Long Pdf.
          </p>
          <Link href="/dashboard">
            <Button className="mt-10">Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
