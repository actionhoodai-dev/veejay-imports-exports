"use client";
import { motion } from "framer-motion";
import React from "react";
import ShipAnimationLoader from "./components/ShipAnimationLoader";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <ShipAnimationLoader overlay={true} /> */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeInOut", duration: 0.6 }}
      >
        {children}
      </motion.div>
    </>
  );
}
