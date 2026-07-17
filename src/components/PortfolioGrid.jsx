"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heading } from "@/components/Typography";
import { motion, AnimatePresence } from "framer-motion";

export default function PortfolioGrid({ projects, categories, locale }) {
  // 1. Definimos la etiqueta para "Todos" según el idioma
  const allLabel = locale === "en" ? "All" : "Todos";

  // 2. Inicializamos el estado con esa etiqueta dinámica
  const [activeFilter, setActiveFilter] = useState(allLabel);

  // 3. Creamos la lista de filtros
  const filters = [allLabel, ...(categories || [])];

  // 4. Filtramos los proyectos
  const filteredProjects = projects.filter((project) => 
    activeFilter === allLabel || project.category === activeFilter
  );

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* FILTROS TIPO CHIPS (Centrados en todas las resoluciones con "justify-center") */}
      <div className="flex flex-wrap gap-3 mb-16 justify-center max-w-4xl mx-auto">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-full text-button uppercase tracking-[0.15em] font-sans font-medium transition-all duration-300 border ${
              activeFilter === filter
                ? "bg-studio-copper text-[#0c0c0a] border-studio-copper"
                : "bg-transparent text-white/60 border-white/20 hover:border-white/50 hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* GRID DE PROYECTOS (Aseguramos text-left para composición asimétrica) */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full text-left">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((item) => (
            <motion.div
              key={item.name}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="group cursor-pointer"
            >
              {/* ENLACE AL CASO DE ESTUDIO DINÁMICO */}
              <Link href={`/${locale}/work/${item.slug}`} className="block h-full space-y-6">
                
                {/* CONTENEDOR DE IMAGEN O MEDIA */}
                {item.imageUrl ? (
                  /* AJUSTE SENIOR: Se remueve el rounded-2xl cableado. 
                     La clase 'studio-media-window' ya inyecta de forma nativa rounded-studio desde globals.css */
                  <div className="studio-media-window aspect-[4/3] overflow-hidden bg-white/5">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-[1.2s] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-[1.035]" 
                    />
                  </div>
                ) : (
                  /* MÁSCARA EN CASO DE AUSENCIA DE CONTENIDO PROPORCIONADO */
                  <div className="w-full aspect-[4/3] bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.05] rounded-studio flex items-center justify-center">
                    <span className="text-micro uppercase tracking-[0.2em] text-white/20 font-sans">
                      Visual Media Missing
                    </span>
                  </div>
                )}

                {/* INFORMACIÓN DE LA FICHA DEL PROYECTO */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-start justify-between">
                    <Heading level={3} className="text-card-title font-sans font-medium text-white group-hover:text-studio-copper transition-colors">
                      {item.name}
                    </Heading>
                    <span className="text-micro uppercase tracking-widest text-studio-copper font-medium bg-studio-copper/10 px-3 py-1 rounded-full font-sans">
                      {item.category}
                    </span>
                  </div>
                  
                  <p className="font-sans font-light text-body-large text-white/50 leading-relaxed">
                    {locale === "en" ? item.shortDescEn : item.shortDescEs}
                  </p>
                  
                  {/* SENIOR REMOVAL: Se elimina por completo el div inferior que contenía el enlace plano "Ver caso de estudio".
                      Toda la superficie de la tarjeta Bento actúa ahora de forma integrada y minimalista. */}
                </div>

              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}