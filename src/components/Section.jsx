import React from "react";

export default function Section({ className = "", children, ...props }) {
  return (
    <section 
      // py-16 a py-24 da ese efecto de "mucho espacio" premium sin ser aburrido
      className={`w-full py-16 md:py-24 lg:py-32 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 max-w-[1920px] mx-auto ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}