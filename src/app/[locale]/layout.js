import React from "react";
import Header from "@/components/Header";

export default async function LocaleLayout({ children, params }) {
  // Capturamos el locale dinámico asignado por el enrutador de Next.js
  const { locale } = await params;

  return (
    /* Un contenedor limpio que hereda la fuente global y maneja la estructura vertical */
    <div className="min-h-full bg-[#0D1419] text-white selection:bg-studio-copper/30 flex flex-col relative">
      {/* Encabezado global interactivo inyectado en el servidor */}
      <Header currentLocale={locale} />
      
      {/* Contenedor del contenido de las páginas */}
      <div className="flex-grow pt-20">
        {children}
      </div>
    </div>
  );
}