'use client'

import React from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

export default function GlowCard({ children, className = "" }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      /* AJUSTE SENIOR: Substitución de rounded-2xl por el token unificado rounded-studio.
         Fondo ajustado a 3% de opacidad y sombra suavizada a 15% para una apariencia etérea, 
         limpia y profundamente integrada. */
      className={`group relative h-full w-full rounded-studio overflow-hidden bg-white/[0.03] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] ${className}`}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {/* Glow effect: Se hereda rounded-studio para emparejar el recorte matemático del degradado cobre */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-studio opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(165, 81, 48, 0.12),
              transparent 80%
            )
          `
        }}
      />
      
      {/* Contenedor de contenido */}
      <div className="relative z-10 h-full w-full flex flex-col justify-between p-8 md:p-10">
        {children}
      </div>
    </motion.div>
  );
}