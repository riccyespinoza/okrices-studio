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
  // Configuración de direcciones para el desplazamiento sutil de entrada
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      className={className}
      // Estado inicial antes de que el usuario haga scroll
      initial={{
        opacity: 0,
        ...directions[direction]
      }}
      // Estado final animado cuando el elemento entra en la pantalla
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0
      }}
      // Evita que la animación se repita cada vez que el usuario sube y baja, mejorando el confort visual
      viewport={{ once: true, margin: "-100px" }}
      // Físicas de movimiento tipo "Spring" (Amortiguadas), el secreto de la fluidez de Framer
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 15,
        duration: duration,
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
}