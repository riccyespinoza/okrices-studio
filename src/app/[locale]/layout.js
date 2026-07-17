import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/layout/Footer"; // Importamos tu nuevo componente

export default async function LocaleLayout({ children, params }) {
  // Capturamos el locale dinámico asignado por el enrutador de Next.js
  const { locale } = await params;

  return (
    /* Eliminamos el bg sólido para que herede del global y permita la transparencia */
    <div className="min-h-full text-white selection:bg-studio-copper/30 flex flex-col relative">
      {/* Encabezado global interactivo inyectado en el servidor */}
      <Header currentLocale={locale} />
      
      {/* Eliminamos el pt-20. El FluidHero debe arrancar desde el pixel 0. 
          No te preocupes por los textos, tu page.js ya tiene un pt-40 para empujarlos. */}
      <div className="flex-grow w-full">
        {children}
      </div>

      {/* Pie de página premium global inyectado al final del contenedor flex */}
      <Footer currentLocale={locale} />
    </div>
  );
}