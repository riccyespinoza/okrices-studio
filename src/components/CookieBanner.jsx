"use client";

import React, { useEffect, useState } from "react";

export default function CookieBanner({ locale }) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);

    const cookies = document.cookie.split("; ");
    const consentCookie = cookies.find((row) =>
      row.startsWith("cookie_consent_okrices=")
    );

    if (!consentCookie) {
      setIsVisible(true);
    }
  }, []);

  const handleAction = (status) => {
    const expires = new Date(
      Date.now() + 365 * 24 * 60 * 60 * 1000
    ).toUTCString();

    document.cookie = `cookie_consent_okrices=${status}; expires=${expires}; path=/; SameSite=Lax`;

    localStorage.setItem("cookie_consent_okrices", status);

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
    <div className="fixed bottom-6 left-5 right-5 z-50 mx-auto max-w-2xl antialiased font-sans md:bottom-8 md:left-auto md:right-8 md:mx-0">
      <div className="space-y-6 rounded-2xl border border-white/[0.06] bg-[#0D1419] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:p-8">
        <p className="text-sm font-light leading-relaxed tracking-wide text-[#EDE7E2]/80 md:text-base">
          {currentText.text}
        </p>

        <div className="flex flex-col items-stretch justify-end gap-3 sm:flex-row sm:items-center sm:space-x-4">
          <button
            type="button"
            onClick={() => handleAction("denied")}
            className="cursor-pointer rounded-xl px-6 py-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-white/50 transition-colors duration-300 hover:text-white md:text-sm"
          >
            {currentText.decline}
          </button>

          <button
            type="button"
            onClick={() => handleAction("granted")}
            className="cursor-pointer rounded-xl bg-[#A55130] px-8 py-3.5 text-center text-xs font-medium uppercase tracking-[0.2em] text-[#EDE7E2] shadow-lg shadow-[#A55130]/10 transition-all duration-300 hover:bg-[#A55130]/90 active:scale-95 md:text-sm"
          >
            {currentText.accept}
          </button>
        </div>
      </div>
    </div>
  );
}