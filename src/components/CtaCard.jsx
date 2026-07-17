'use client';

import React from "react";
import FadeIn from "./FadeIn";

export default function CtaCard({ children, variant = "primary", className = "" }) {
  // Configuración de atmósfera de color según la variante
  const backgroundStyles = {
    // Variante Cobre Principal (Alta Visibilidad con contorno y sombra profunda)
    primary: "bg-studio-copper border border-studio-white/10 shadow-2xl",
    
    // Variante Azul Profundo (Bloque sólido puro, sin bordes y sombra minimizada)
    secondary: "bg-[var(--color-studio-blue)] border-none shadow-sm"
  };

  // Ajuste cromático del destello interno para la variante que lo requiera
  const glowStyles = {
    primary: "bg-studio-white/10",
    secondary: "bg-transparent"
  };

  const selectBg = backgroundStyles[variant] || backgroundStyles.primary;
  const selectGlow = glowStyles[variant] || glowStyles.primary;

  return (
    <FadeIn direction="up" delay={0.1} className="w-full">
      <div 
        /* AJUSTE SENIOR: Se remueve la clase estática 'border' global para permitir 
           que la variante 'secondary' sea un bloque 100% sólido y limpio. */
        className={`w-full rounded-studio p-8 md:p-16 relative overflow-hidden tracking-normal ${selectBg} ${className}`}
      >
        {/* Capa de textura orgánica de grano sutil: Omitida en secundaria para evitar falsos degradados por contraste */}
        {variant !== "secondary" && (
          <div 
            className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />
        )}

        {/* Destello de luz interna premium: Se omite por completo en la variante secundaria */}
        {variant !== "secondary" && (
          <div 
            className={`absolute -top-12 -left-12 w-64 h-64 rounded-full blur-3xl pointer-events-none ${selectGlow}`}
          />
        )}

        {/* Bloque vertical puro (flex-col items-start) */}
        <div className="relative z-10 w-full flex flex-col items-start text-left">
          {children}
        </div>
      </div>
    </FadeIn>
  );
}