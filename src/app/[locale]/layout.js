import React from "react";

export default function LocaleLayout({ children }) {
  return (
    /* * Un contenedor limpio que hereda la fuente global y aplica 
     * el Beige cálido (#EDE7E2) y Texto Azul Profundo (#0D1419) de tu marca.
     */
    <div className="min-h-full bg-[#EDE7E2] text-[#0D1419] selection:bg-studio-copper/30">
      {children}
    </div>
  );
}