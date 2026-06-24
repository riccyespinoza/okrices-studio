'use client'

import React, { useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

export default function HeroGlow({ children, className = "" }) {
  // Valores reactivos del mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Físicas de resorte de Framer (stiffness baja y damping alto para que flote con inercia premium)
  const springX = useSpring(mouseX, { stiffness: 25, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 25, damping: 25 });

  // EFECTO PARALLAX INVERSO: La segunda esfera se desplaza en sentido opuesto para crear profundidad
  const inverseX = useTransform(springX, (value) => value * -0.8);
  const inverseY = useTransform(springY, (value) => value * -0.8);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      
      // Calculamos la posición del cursor del -1 al 1 tomando el centro de la pantalla como punto cero
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      // Rango de desplazamiento de las masas de color (máximo 60 píxeles de holgura)
      mouseX.set(x * 60);
      mouseY.set(y * 60);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Textura matemática de ruido digital premium (Estilo Revista / Galería)
  const grainStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
  };

  return (
    <div className={`relative w-full overflow-hidden bg-[#0A0F12] ${className}`}>
      
      {/* 1. TEXTURA DE RUIDO DIGITAL (Se mezcla con los degradados para dar el acabado mate editorial) */}
      <div 
        style={grainStyle}
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay z-20 select-none"
      />

      {/* 2. ESFERAS LIQUIDAS DE GRADIENTE AMORFO (Reutilizando los colores oficiales de Okrices) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 opacity-40 md:opacity-60 mix-blend-screen">
        
        {/* Esfera A: Cobre Corporativo Destacado (Sigue al mouse de forma amortiguada) */}
        <motion.div 
          style={{ x: springX, y: springY }}
          className="absolute top-[-10%] right-[-5%] w-[650px] h-[650px] rounded-full bg-[#A55130] blur-[130px]"
        />

        {/* Esfera B: Tono Nude Cálido de Balance (Flota en sentido contrario creando volumen) */}
        <motion.div 
          style={{ x: inverseX, y: inverseY }}
          className="absolute bottom-[15%] left-[5%] w-[550px] h-[550px] rounded-full bg-[#D1B7A1] opacity-40 blur-[120px]"
        />

        {/* Esfera C: Destello Violeta Neón sutil (Inyecta la vibra moderna de South Florida de tus referencias) */}
        <motion.div 
          style={{ x: useTransform(springX, (v) => v * 0.4), y: useTransform(springY, (v) => v * 0.4) }}
          className="absolute top-[25%] left-[25%] w-[450px] h-[450px] rounded-full bg-[#3b2254] opacity-30 blur-[110px]"
        />
      </div>

      {/* 3. CAPA DE INTERFAZ (Tu contenido bilingüe flota perfectamente legible encima de la experiencia) */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>

    </div>
  );
}