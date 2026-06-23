"use client";

import React from "react";

export default function Providers({ children }) {
  // Este componente centralizará los contextos interactivos y de cliente en el futuro
  return (
    <>
      {children}
    </>
  );
}