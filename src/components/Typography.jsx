import React from "react";

export function Heading({ level = 1, className = "", children, ...props }) {
  // Base estructural limpia y tipografía sans oficial (Outfit) sin colisiones de color o interlineado
  const baseStyles = "font-sans antialiased tracking-tight";
  
  // Mapeo directo y exclusivo a los tokens de fluid-typography declarados en globals.css
  const structuralDefaults = {
    1: "text-hero font-semibold leading-none",                  // 70px - Hero Título Principal
    2: "text-section font-semibold leading-illustrator",        // 65px - Títulos de Sección / Números Proceso
    3: "text-card-title font-medium leading-illustrator",       // 40px - Títulos de Cards (Servicios, Proceso, Work)
  };

  const Tag = `h${level}`;

  return (
    <Tag 
      className={`${baseStyles} ${structuralDefaults[level] || structuralDefaults[1]} ${className}`} 
      {...props}
    >
      {children}
    </Tag>
  );
}

export function Text({ className = "", children, ...props }) {
  // Componente de texto atómico libre de opacidades duras y viewports fijos
  return (
    <p 
      className={`font-sans antialiased ${className}`} 
      {...props}
    >
      {children}
    </p>
  );
}