import React from "react";

export default function Button({ variant = "primary", className = "", children, ...props }) {
  const baseStyles = "inline-flex items-center justify-center font-sans font-medium text-sm md:text-base tracking-wide px-6 py-3.5 rounded-lg transition-all duration-300 ease-out focus:outline-none antialiased active:scale-[0.98]";

  const variants = {
    // Botón de acción principal en Cobre con hover suave
    primary: "bg-studio-copper text-white hover:bg-studio-copper/90 hover:shadow-lg hover:shadow-studio-copper/20",
    // Botón secundario elegante que se adapta sobre fondos oscuros
    secondary: "border border-white/20 text-white bg-white/5 hover:bg-white/10 hover:border-white/40",
  };

  return (
    <button className={`${baseStyles} ${variants[variant] || variants[primary]} ${className}`} {...props}>
      {children}
    </button>
  );
}