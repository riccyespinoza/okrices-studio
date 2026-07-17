import React from "react";

export default function LogoTicker({ logos }) {
  if (!logos || logos.length === 0) return null;

  const tickerItems = [...logos, ...logos];

 return (
    <div className="relative w-full overflow-hidden flex items-center py-16 md:py-20 select-none">
      
      {/* 
          CAMBIO: Usamos #0A0F12 que es el color exacto de tu studio-main-container.
          He usado la sintaxis de Tailwind para el color bg-[#0A0F12].
      */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-56 bg-gradient-to-r from-[#0A0F12] via-[#0A0F12]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-56 bg-gradient-to-l from-[#0A0F12] via-[#0A0F12]/80 to-transparent z-10 pointer-events-none" />
      {/* Contenedor del carrusel */}
      <div className="flex w-max animate-marquee items-center">
        {tickerItems.map((item, index) => (
          /* Ajustamos el padding horizontal a px-8 md:px-16 para que estén menos comprimidos */
          <div key={index} className="flex items-center justify-center px-8 md:px-16">
            <img
              src={item.imageUrl}
              alt={item.altText || "Logo de cliente Okrices Studio"}
              /* 
                 Ajustes realizados:
                 - Altura: Subimos a h-28 / md:h-40 / lg:h-48.
                 - Ancho: Subimos a max-w-[300px] / md:max-w-[500px].
                 - Al quitar restricciones excesivas, los logos llenarán más espacio.
              */
              className="h-28 md:h-40 lg:h-48 w-auto max-w-[300px] md:max-w-[500px] object-contain opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500 ease-out"
            />
          </div>
        ))}
      </div>
      
    </div>
  );
}