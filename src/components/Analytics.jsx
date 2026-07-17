"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";

export default function Analytics() {
  const [consent, setConsent] = useState(null);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    // Evaluamos el estado inicial guardado en el navegador del usuario
    const savedConsent = localStorage.getItem("cookie_consent_okrices");
    setConsent(savedConsent);

    // Escuchamos actualizaciones en tiempo real gatilladas por el banner de consentimiento
    const handleConsentChange = () => {
      const updatedConsent = localStorage.getItem("cookie_consent_okrices");
      setConsent(updatedConsent);
    };

    window.addEventListener("cookieConsentUpdated", handleConsentChange);
    return () => {
      window.removeEventListener("cookieConsentUpdated", handleConsentChange);
    };
  }, []);

  // Cláusula de salvaguarda senior: Si no configuraste el ID o el consentimiento no es explícito, bloqueamos los scripts
  if (!gaId || consent !== "granted") {
    return null;
  }

  return (
    <>
      {/* Carga asíncrona optimizada después de que la página principal es interactiva */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  );
}