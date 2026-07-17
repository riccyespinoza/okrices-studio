'use client'

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import LocalizedLink from "./LocalizedLink";
import Logo from "./Logo"; 

export default function Header({ currentLocale }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);

    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  const navigationLinks = [
    { nameEs: "INICIO", nameEn: "HOME", path: "/" },
    { nameEs: "SERVICIOS", nameEn: "SERVICES", path: "/services" },
    { nameEs: "PORTAFOLIO", nameEn: "WORK", path: "/work" },
    { nameEs: "CONTACTO", nameEn: "CONTACT", path: "/contact" },
  ];

  const getTargetLanguageUrl = (targetLocale) => {
    if (!pathname) return `/${targetLocale}`;
    const segments = pathname.split("/");
    segments[1] = targetLocale;
    return segments.join("/");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out antialiased ${
        isScrolled 
          ? "bg-white/[0.05] backdrop-blur-xl" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 py-6 flex items-center justify-between relative z-50">
        
        {/* LOGO (Extremo izquierdo) */}
        <LocalizedLink href="/" onClick={closeMobileMenu} className="hover:opacity-90 transition-opacity flex-shrink-0">
          <Logo className="hidden md:block w-32 h-auto text-white hover:text-[#A55130] transition-colors duration-300" />
          <Logo isIconOnly={true} className="md:hidden w-10 h-auto text-white hover:text-[#A55130] transition-colors duration-300" />
        </LocalizedLink>

        {/* BLOQUE DE ESCRITORIO ALINEADO A LA DERECHA */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12 ml-auto">
          <nav className="flex items-center gap-8 lg:gap-12">
            {navigationLinks.map((link, index) => (
              <LocalizedLink
                key={index}
                href={link.path}
                className="font-sans font-light text-support tracking-wide text-white/70 hover:text-white transition-colors duration-200"
              >
                {currentLocale === "en" ? link.nameEn : link.nameEs}
              </LocalizedLink>
            ))}
          </nav>

          {/* Selector Idioma Desktop */}
          <div className="flex items-center font-sans font-light text-support tracking-widest border border-white/10 bg-white/5 rounded-full px-4 py-1.5 backdrop-blur-sm">
            <a
              href={getTargetLanguageUrl("es")}
              className={`transition-colors duration-200 pr-2 border-r border-white/10 ${
                currentLocale === "es" ? "text-[#A55130]" : "text-white/40 hover:text-white"
              }`}
            >
              ES
            </a>
            <a
              href={getTargetLanguageUrl("en")}
              className={`transition-colors duration-200 pl-2 ${
                currentLocale === "en" ? "text-[#A55130]" : "text-white/40 hover:text-white"
              }`}
            >
              EN
            </a>
          </div>
        </div>

        {/* Menú Móvil Botón */}
        <button 
          className="md:hidden text-white p-2 focus:outline-none transition-transform duration-200 ml-auto"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <svg className="w-7 h-7 font-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 7h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Overlay Móvil */}
      <div 
        className={`fixed inset-0 bg-[#0D1419]/95 backdrop-blur-xl transition-all duration-500 ease-in-out md:hidden z-40 flex flex-col items-center justify-center ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Navegación Móvil */}
        <nav className="flex flex-col items-center gap-10">
          {navigationLinks.map((link, index) => (
            <LocalizedLink
              key={index}
              href={link.path}
              onClick={closeMobileMenu}
              className="font-sans font-light text-subtitle tracking-widest text-white/80 hover:text-[#A55130] transition-colors duration-200"
            >
              {currentLocale === "en" ? link.nameEn : link.nameEs}
            </LocalizedLink>
          ))}
        </nav>

        {/* Selector Idioma Móvil (Agregado abajo con holgura visual) */}
        <div className="mt-12 flex items-center font-sans font-light text-subtitle tracking-widest border border-white/10 bg-white/5 rounded-full px-6 py-2.5 backdrop-blur-sm">
          <a
            href={getTargetLanguageUrl("es")}
            onClick={closeMobileMenu}
            className={`transition-colors duration-200 pr-4 border-r border-white/10 ${
              currentLocale === "es" ? "text-[#A55130]" : "text-white/40 hover:text-white"
            }`}
          >
            ES
          </a>
          <a
            href={getTargetLanguageUrl("en")}
            onClick={closeMobileMenu}
            className={`transition-colors duration-200 pl-4 ${
              currentLocale === "en" ? "text-[#A55130]" : "text-white/40 hover:text-white"
            }`}
          >
            EN
          </a>
        </div>
      </div>
    </motion.header>
  );
}