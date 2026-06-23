import React from "react";

export function Heading({ level = 1, className = "", children, ...props }) {
  // Escala tipográfica adaptativa (mobile-first) inspirada en tus gráficos
  const baseStyles = "font-sans font-semibold tracking-tight text-white antialiased";
  
  const sizes = {
    1: "text-3xl md:text-5xl lg:text-6xl leading-tight", // Títulos de Hero / Grandes mensajes
    2: "text-2xl md:text-4xl leading-snug",             // Subtítulos de secciones
    3: "text-xl md:text-2xl leading-normal",            // Títulos de tarjetas o bloques
  };

  const Tag = `h${level}`;

  return (
    <Tag className={`${baseStyles} ${sizes[level] || sizes[1]} ${className}`} {...props}>
      {children}
    </Tag>
  );
}

export function Text({ className = "", children, ...props }) {
  // Texto corporativo sutil, elegante y con aire
  return (
    <p 
      className={`font-sans font-light text-base md:text-lg lg:text-xl text-white/80 leading-relaxed tracking-wide antialiased ${className}`} 
      {...props}
    >
      {children}
    </p>
  );
}