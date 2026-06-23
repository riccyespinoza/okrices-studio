'use client'

import React from "react";
import { usePathname } from "next/navigation";
import LocalizedLink from "./LocalizedLink";

export default function Header({ currentLocale }) {
  const pathname = usePathname();

  // Mapeo ordenado de navegación oficial de Okrices Studio
  const navigationLinks = [
    { nameEs: "Inicio", nameEn: "Home", path: "/" },
    { nameEs: "Servicios", nameEn: "Services", path: "/services" },
    { nameEs: "Portafolio", nameEn: "Work", path: "/work" },
    { nameEs: "Estudio", nameEn: "About", path: "/about" },
    { nameEs: "Contacto", nameEn: "Contact", path: "/contact" },
  ];

  // Función quirúrgica para calcular el cambio de idioma manteniendo la página actual
  const getTargetLanguageUrl = (targetLocale) => {
    if (!pathname) return `/${targetLocale}`;
    const segments = pathname.split("/");
    // segments[1] corresponde al idioma actual de la URL (/es o /en)
    segments[1] = targetLocale;
    return segments.join("/");
  };

  return (
    <header className="w-full absolute top-0 left-0 z-50 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 py-6 max-w-[1920px] mx-auto flex items-center justify-between antialiased">
      
      {/* Logotipo de la Marca */}
      <LocalizedLink href="/" className="text-xl md:text-2xl font-sans font-semibold tracking-tight text-white hover:opacity-90 transition-opacity">
        Okrices<span className="text-studio-copper">.</span>
      </LocalizedLink>

      {/* Menú de Navegación Principal (Desktop) */}
      <nav className="hidden md:flex items-center gap-8 lg:gap-12">
        {navigationLinks.map((link, index) => (
          <LocalizedLink
            key={index}
            href={link.path}
            className="font-sans font-light text-sm tracking-wide text-white/70 hover:text-white transition-colors duration-200"
          >
            {currentLocale === "en" ? link.nameEn : link.nameEs}
          </LocalizedLink>
        ))}
      </nav>

      {/* Selector de Idioma Interactivo Premium */}
      <div className="flex items-center font-sans text-sm tracking-widest font-medium border border-white/10 bg-white/5 rounded-full px-4 py-1.5 backdrop-blur-sm">
        <a
          href={getTargetLanguageUrl("es")}
          className={`transition-colors duration-200 pr-2 border-r border-white/10 ${
            currentLocale === "es" ? "text-studio-copper" : "text-white/40 hover:text-white"
          }`}
        >
          ES
        </a>
        <a
          href={getTargetLanguageUrl("en")}
          className={`transition-colors duration-200 pl-2 ${
            currentLocale === "en" ? "text-studio-copper" : "text-white/40 hover:text-white"
          }`}
        >
          EN
        </a>
      </div>

    </header>
  );
}