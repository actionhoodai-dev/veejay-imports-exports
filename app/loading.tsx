"use client";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#0f172a" }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        style={{ width: "40px", height: "40px", border: "4px solid rgba(255,255,255,0.1)", borderTop: "4px solid var(--accent)", borderRadius: "50%" }}
      />
    </div>
  );
}
