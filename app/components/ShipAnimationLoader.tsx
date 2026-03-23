"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function ShipAnimationLoader({ overlay = false }: { overlay?: boolean }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (overlay) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = 'auto';
      }, 2500); // Overlay stays for 2.5s
      return () => { clearTimeout(timer); document.body.style.overflow = 'auto'; };
    }
  }, [overlay]);

  const containerStyle: React.CSSProperties = {
    position: overlay ? "fixed" : "static",
    top: 0, left: 0, 
    width: "100%", height: "100vh",
    backgroundColor: "#0f172a", // Solid Navy Blue always!
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    pointerEvents: "none"
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          style={containerStyle}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: "100vw" }}
            transition={{ duration: 3.5, ease: "linear", repeat: overlay ? 0 : Infinity }}
            style={{ position: "relative", display: 'flex', alignItems: 'flex-end', filter: "drop-shadow(0 15px 20px rgba(0,0,0,0.8))" }}
          >
            {/* Highly Detailed, Smaller Side-Profile Container Ship SVG */}
            <svg viewBox="0 0 400 150" width="220" height="82" style={{ zIndex: 2 }}>
              
              {/* Waterline & Waves */}
              <path d="M 0,130 Q 20,120 40,130 T 80,130 T 120,130 T 160,130 T 200,130 T 240,130 T 280,130 T 320,130 T 360,130 T 400,130 L 400,150 L 0,150 Z" fill="#1e3a8a" opacity="0.6" />
              <path d="M -20,135 Q 0,125 20,135 T 60,135 T 100,135 T 140,135 T 180,135 T 220,135 T 260,135 T 300,135 T 340,135 T 380,135 T 420,135 L 420,150 L -20,150 Z" fill="#172554" />

              {/* Hull */}
              <path d="M 20,135 L 20,95 L 350,95 C 380,95 390,115 400,135 Z" fill="#334155" />
              <path d="M 20,125 L 392,125 L 398,135 L 20,135 Z" fill="#991b1b" /> {/* Red bottom hull */}
              <text x="310" y="115" fill="#94a3b8" fontSize="12" fontFamily="sans-serif" letterSpacing="2">VEEJAY</text>

              {/* Deckhouse & Details */}
              <path d="M 40,95 L 40,35 L 90,35 L 90,95 Z" fill="#e2e8f0" />
              <path d="M 90,55 L 105,55 L 105,65 L 90,65 Z" fill="#cbd5e1" /> {/* Extended bridge */}
              <rect x="45" y="40" width="8" height="8" fill="#475569" />
              <rect x="55" y="40" width="8" height="8" fill="#475569" />
              <rect x="65" y="40" width="8" height="8" fill="#475569" />
              <rect x="75" y="40" width="8" height="8" fill="#475569" />
              <rect x="45" y="55" width="8" height="8" fill="#475569" />
              <rect x="55" y="55" width="8" height="8" fill="#475569" />

              {/* Radar & Antenna */}
              <line x1="65" y1="35" x2="65" y2="10" stroke="#94a3b8" strokeWidth="2" />
              <line x1="55" y1="15" x2="75" y2="15" stroke="#94a3b8" strokeWidth="2" />
              <circle cx="65" cy="10" r="3" fill="#ef4444" /> {/* Blinking light vibe */}

              {/* Funnel */}
              <path d="M 65,35 L 65,15 L 85,15 L 85,35 Z" fill="#eab308" />
              <rect x="65" y="15" width="20" height="5" fill="#1e293b" />

              {/* Deck Container Stack Grid Generator */}
              <g transform="translate(110, 35)">
                 {/* 5 blocks of containers */}
                 {[0, 45, 90, 135, 180].map((xOffset, i) => (
                    <g key={i} transform={`translate(${xOffset}, 0)`}>
                      <rect x="0" y="40" width="40" height="20" fill={i % 2 === 0 ? "#1d4ed8" : "#b91c1c"} />
                      <rect x="0" y="20" width="40" height="20" fill={i % 3 === 0 ? "#15803d" : "#c2410c"} />
                      <rect x="0" y="0" width="40" height="20" fill={i % 2 !== 0 ? "#6d28d9" : "#eab308"} />
                      {/* Container Ribs/Grids */}
                      {[4, 12, 20, 28, 36].map(lx => (
                        <React.Fragment key={lx}>
                           <line x1={lx} y1="0" x2={lx} y2="60" stroke="#000000" strokeWidth="1" strokeOpacity="0.3" />
                        </React.Fragment>
                      ))}
                      <line x1="0" y1="20" x2="40" y2="20" stroke="#000000" strokeWidth="1.5" strokeOpacity="0.5" />
                      <line x1="0" y1="40" x2="40" y2="40" stroke="#000000" strokeWidth="1.5" strokeOpacity="0.5" />
                    </g>
                 ))}
              </g>

            </svg>
            
            {/* Realistic Smoke Particles from Funnel */}
            <motion.div style={{ position: "absolute", top: "10px", left: "40px", display: "flex", flexDirection: "column-reverse", alignItems: "center", zIndex: 1 }}>
               {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.8, scale: 0.5, y: 0, x: 0 }}
                    animate={{ opacity: 0, scale: 3, y: -40, x: -60 }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3, ease: "easeOut" }}
                    style={{
                      width: "15px",
                      height: "15px",
                      backgroundColor: "rgba(180, 180, 180, 0.5)",
                      borderRadius: "50%",
                      marginBottom: "-5px",
                      filter: "blur(3px)"
                    }}
                  />
               ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
