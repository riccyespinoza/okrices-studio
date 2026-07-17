'use client'

import React from "react";
import { motion } from "framer-motion";

export default function FadeIn({ 
  children, 
  delay = 0, 
  direction = "up", 
  duration = 0.8,
  className = "" 
}) {
  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        ...directions[direction]
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0
      }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        type: "spring",
        stiffness: 45,   // Resistencia sutil
        damping: 18,     // Absorción del golpe refinada
        duration: duration,
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
}