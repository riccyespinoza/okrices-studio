"use client";

import React, { useEffect, useState } from "react";

export default function CookieBanner({ locale }) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Leemos las cookies del documento perimetral buscando nuestra bandera
    const cookies = document.cookie.split("; ");
    const consentCookie = cookies.find(row => row.startsWith("cookie_consent_okrices="));
    
    if (!consentCookie) {
      setIsVisible(true);
    }
  }, []);

  const handleAction = (status) => {
    // Alerta de depuración senior: Confirmamos la interactividad en caliente
    alert(`Elegiste: ${status}. Programando cookie corporativa en localhost...`);

    // Inyectamos una cookie nativa física real con vencimiento a 1 año
    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `cookie_consent_okrices=${status}; expires=${expires}; path=/; SameSite=Lax`;
    
    // También lo guardamos en localStorage por si acaso para el inyector de analíticas
    localStorage.setItem("cookie_consent_okrices", status);
    
    // Gatillamos el evento global reactivo
    window.dispatchEvent(new Event("cookieConsentUpdated"));
    
    setIsVisible(false);
  };

  if (!mounted || !isVisible) {
    return null;
  }

  const content = {
    es: {
      text: "Utilizamos cookies de analítica para comprender cómo interactúas con nuestro estudio y optimizar tu experiencia digital. Puedes aceptar su uso o rechazarlas.",
      accept: "Aceptar",
      decline: "Rechazar",
    },
    en: {
      text: "We use analytical cookies to understand how you interact with our studio and optimize your digital experience. You can accept or decline their use.",
      accept: "Accept",
      decline: "Decline",
    },
  };

  const currentText = content[locale] || content.es;

  return (
    <div className="fixed bottom-6 left-5 right-5 z-50 mx-auto max-w-2xl md:bottom-8 md:right-8 md:left-auto md:mx-0 antialiased font-sans">
      <div className="bg-[#0D1419] border border-white/[0.06] rounded-2xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-6">
        <p className="text-[#EDE7E2]/80 text-sm md:text-base font-light leading-relaxed tracking-wide">
          {currentText.text}
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:space-x-4">
          <button
            onClick={() => handleAction("denied")}
            className="rounded-xl uppercase text-xs md:text-sm tracking-[0.2em] font-medium text-white/50 hover:text-white px-6 py-3 transition-colors duration-300 text-center cursor-pointer"
          >
            {currentText.decline}
          </button>
          <button
            onClick={() => handleAction("granted")}
            className="bg-[#A55130] hover:bg-[#A55130]/90 text-[#EDE7E2] rounded-xl uppercase text-xs md:text-sm tracking-[0.2em] font-medium px-8 py-3.5 transition-all duration-300 transform active:scale-95 text-center cursor-pointer shadow-lg shadow-[#A55130]/10"
          >
            {currentText.accept}
          </button>
        </div>
      </div>
    </div>
  );
}