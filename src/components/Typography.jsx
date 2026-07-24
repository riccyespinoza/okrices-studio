import React from "react";

export function Heading({
  level = 1,
  className = "",
  children,
  ...props
}) {
  const baseStyles = "font-sans antialiased tracking-tight";

  const structuralDefaults = {
    1: "text-hero font-semibold leading-none",
    2: "text-section font-semibold leading-illustrator",
    3: "text-card-title font-medium leading-illustrator",
    4: "text-support font-medium leading-illustrator",
  };

  const Tag = `h${level}`;

  /*
   * Si se utiliza un nivel todavía no definido, aplicamos el estilo
   * secundario de level 4 en lugar de convertirlo accidentalmente
   * en un título Hero.
   */
  const headingStyles =
    structuralDefaults[level] || structuralDefaults[4];

  return (
    <Tag
      className={`${baseStyles} ${headingStyles} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function Text({
  className = "",
  children,
  ...props
}) {
  return (
    <p
      className={`font-sans antialiased ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}