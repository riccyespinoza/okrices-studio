'use client';

import React from "react";
import { motion } from "framer-motion";

export default function Button({ children, variant = "primary", className = "", ...props }) {
  /* AJUSTE SENIOR: Se inyecta 'rounded-studio' de forma explícita en los baseStyles.
     Esto previene desalineaciones visuales en el desbordamiento (overflow-hidden) 
     y blinda el radio ante la sobreescritura de clases personalizadas. */
  const baseStyles = "relative studio-button text-button font-sans text-center rounded-studio overflow-hidden group";

  // Diccionario de variantes que consumen los tokens globales oficiales
  const variants = {
    // Estilo Principal: Cobre Corporativo
    primary: "bg-studio-copper text-studio-white border border-transparent hover:bg-studio-copper/90 shadow-lg",
    
    // Estilo Secundario: Transparente con borde refinado
    secondary: "bg-transparent text-studio-white/80 border border-studio-white/20 hover:text-studio-white hover:border-studio-white",
    
    // Tercer Estilo: Invertido Premium de alta conversión para CTAs destacados
    tertiary: "bg-studio-beige text-studio-blue border border-transparent hover:bg-studio-white shadow-2xl"
  };

  const variantStyles = variants[variant] || variants.primary;

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {/* Efecto Shimmer dinámico: Solo se activa en la variante 'tertiary' */}
      {variant === "tertiary" && (
        <motion.span
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-studio-white/40 to-transparent pointer-events-none"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 2,
            ease: "linear",
          }}
          style={{ mixBlendMode: "overlay" }}
        />
      )}

      {/* Texto del botón con z-index alto para quedar siempre por encima del destello */}
      <span className="relative z-10">{children}</span>
    </button>
  );
}