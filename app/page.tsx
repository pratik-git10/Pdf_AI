"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconFileText,
  IconBrain,
  IconArrowRight,
  IconSearch,
  IconRobot,
  IconLock,
} from "@tabler/icons-react";
import { FeatureCard } from "@/components/featurecard";

export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

  const checkUser = async () => {
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress || "",
      imageUrl: user?.imageUrl || " ",
      userName: user?.fullName || " ",
    });
    console.log("result", result);
  };

  const features = [
    {
      title: "AI-Powered Search",
      description:
        "Quickly find relevant information within your PDFs using advanced AI algorithms.",
      icon: IconSearch,
    },
    {
      title: "Intelligent Summaries",
      description:
        "Get concise summaries of your PDFs, saving you time and effort.",
      icon: IconRobot,
    },
    {
      title: "Secure Document Handling",
      description:
        "Your PDFs are processed securely, ensuring your data remains private and protected.",
      icon: IconLock,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800">
      <div className="fixed inset-x-0 top-0 z-50 bg-white bg-opacity-80 backdrop-blur-md dark:bg-gray-900 dark:bg-opacity-80 m-4">
        <Navbar showLinkOnSmallDevices={true} />
      </div>
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="mb-8 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="relative">
              <IconBrain className="h-20 w-20 text-indigo-600 dark:text-indigo-400" />
            </motion.div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              PdfAI
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-8 text-xl text-gray-700 dark:text-gray-300">
            Unlock the power of your PDFs with AI-driven insights and answers.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-3 text-lg font-semibold text-white transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg">
                <span className="relative z-10">Go to Dashboard</span>
                <motion.span
                  className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                  initial={false}
                  animate={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                <motion.span
                  className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100"
                  initial={false}
                  animate={{ x: 0, opacity: 0 }}
                  whileHover={{ x: 4, opacity: 1 }}>
                  <IconArrowRight className="h-5 w-5" />
                </motion.span>
              </Button>
            </Link>

            {/* Button for features */}
            {/* <Button
              variant="outline"
              size="lg"
              onClick={() => setShowFeatures(!showFeatures)}
              className="rounded-full px-8 py-3 text-lg font-semibold transition-all duration-300 ease-out hover:bg-gray-100 dark:hover:bg-gray-800">
              {showFeatures ? "Hide Features" : "Show Features"}
            </Button> */}
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {/* {showFeatures && ( */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </motion.div>
          {/* )} */}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2023 PdfAI. All rights reserved. Powered by AI technology.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
