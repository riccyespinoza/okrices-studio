'use client'

import React from "react";
import { motion } from "framer-motion";

export default function TextReveal({ text, className = "" }) {
  if (!text) return null;

  // Parsea las marcas de asteriscos conservando la estructura bilingüe
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  let globalWordIndex = 0;

  return (
    <h1 className={className}>
      {parts.map((part, partIndex) => {
        const isHighlighted = partIndex % 2 === 1;
        const words = part.split(" ");

        return words.map((word, wordIndex) => {
          if (word === "" && wordIndex > 0) return null;
          globalWordIndex++;

          return (
            <motion.span
              key={`${partIndex}-${wordIndex}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: globalWordIndex * 0.02,
                ease: [0.215, 0.610, 0.355, 1.0] // Easing cúbico ultra fluido
              }}
              className={`inline-block mr-[0.25em] ${
                isHighlighted ? "text-studio-copper font-medium" : "text-white"
              }`}
            >
              {word}
            </motion.span>
          );
        });
      })}
    </h1>
  );
}