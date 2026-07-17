"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Accordion({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group focus:outline-none"
        aria-expanded={isOpen}
      >
        {/* CAMBIO: Aplicamos text-subtitle (35px fluido) para la pregunta */}
        <h3 className="text-subtitle font-sans font-medium text-white group-hover:text-studio-copper transition-colors duration-300 pr-4">
          {question}
        </h3>
        <div className="flex-shrink-0 relative w-6 h-6 flex items-center justify-center">
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/50 group-hover:text-studio-copper transition-colors"
          >
            {/* Icono Monolineal (+ que se convierte en X) */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pb-6 pr-8 md:pr-12">
              {/* CAMBIO: Aplicamos text-body-large (30px fluido) para la respuesta */}
              <p className="text-body-large font-sans font-light text-white/60 leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}