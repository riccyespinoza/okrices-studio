'use client'

import React from "react";
import { motion } from "framer-motion";

export default function TextReveal({ text, className = "" }) {
  if (!text) return null;

  // Separamos el texto por bloques destacados usando los asteriscos
  const parts = text.split(/\*\*([^*]+)\*\*/g);

  return (
    // Agregamos un leve padding vertical al contenedor principal para dar espacio a los rasgos tipográficos
    <h1 className={`${className} py-2 overflow-hidden`}>
      <motion.span
        initial={{ y: "40%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1] // Easing cúbico ultra fluido estilo Framer Studio
        }}
        className="block"
      >
        {parts.map((part, partIndex) => {
          const isHighlighted = partIndex % 2 === 1;
          return (
            <span
              key={partIndex}
              className={isHighlighted ? "text-studio-copper font-medium" : "text-white"}
            >
              {part}
            </span>
          );
        })}
      </motion.span>
    </h1>
  );
}