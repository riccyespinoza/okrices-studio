import React from "react";

export default function Section({ 
  className = "", 
  noVerticalPadding = false, 
  children, 
  ...props 
}) {
  // Determinamos dinámicamente si la sección respira verticalmente por defecto
  const verticalPadding = noVerticalPadding ? "" : "py-14 md:py-20 lg:py-28";

  return (
    <section 
      className={`w-full ${verticalPadding} px-5 sm:px-10 md:px-14 lg:px-20 xl:px-28 max-w-[1920px] mx-auto ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}