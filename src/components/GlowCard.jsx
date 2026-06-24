'use client'

import React from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

export default function GlowCard({ children, className = "" }) {
  // Motion Values actualizan la pantalla a 120fps sin causar re-renders en el componente
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`studio-card group relative ${className}`}
    >
      {/* Destello cobre radial que sigue al mouse (Glow Tracking) */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(165, 81, 48, 0.15),
              transparent 80%
            )
          `
        }}
      />
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}