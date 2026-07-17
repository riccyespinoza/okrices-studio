"use client";

import React from "react";
import { useParams } from "next/navigation";
import Analytics from "@/components/Analytics";
import CookieBanner from "@/components/CookieBanner";

export default function Providers({ children }) {
  // Capturamos el locale dinámico asignado por el enrutador de Next.js ([locale])
  const params = useParams();
  const locale = params?.locale || "es"; // Salvaguarda senior por si la ruta base falla

  return (
    <>
      {/* Inyector condicional de scripts de Google Analytics mode v2 */}
      <Analytics />

      {/* Renderizado de toda la estructura de la aplicación */}
      {children}

      {/* Banner flotante visual premium en Azul profundo y Cobre */}
      <CookieBanner locale={locale} />
    </>
  );
}