'use client'

import React from "react";
import { motion } from "framer-motion";

export default function Magnetic({ children }) {
  return (
    <motion.div
      // Elevación sutil al pasar el mouse (escala un 2% y sube 2px)
      whileHover={{ scale: 1.02, y: -2 }}
      // Hundimiento táctil al hacer clic (escala al 97%)
      whileTap={{ scale: 0.97 }}
      // Físicas de resorte premium para que se sienta sólido y no rebotón
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      // Clases para mantener el comportamiento responsivo de tus botones
      className="w-full sm:w-auto inline-block relative"
    >
      {children}
    </motion.div>
  );
}