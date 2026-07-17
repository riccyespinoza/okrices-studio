"use client";
import React, { useState, useEffect } from "react";

export default function TestimonialsSlider({ trusts = [], locale }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const itemsPerPage = 3;
  const chunks = [];

  if (trusts && trusts.length > 0) {
    if (trusts.length <= itemsPerPage) {
      chunks.push(trusts);
    } else {
      const numPages = Math.ceil(trusts.length / itemsPerPage);
      for (let p = 0; p < numPages; p++) {
        const chunk = [];
        for (let i = 0; i < itemsPerPage; i++) {
          const index = (p * itemsPerPage + i) % trusts.length;
          chunk.push(trusts[index]);
        }
        chunks.push(chunk);
      }
    }
  }

  const totalPages = chunks.length || 1;

  useEffect(() => {
    if (isPaused || totalPages <= 1) return;
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, totalPages]);

  if (!trusts || trusts.length === 0) return null;

  return (
    <div 
      className="w-full relative pb-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="grid grid-cols-1 w-full items-stretch">
        {chunks.map((chunk, chunkIndex) => {
          const isActive = chunkIndex === currentPage;
          return (
            <div
              key={chunkIndex}
              className={`col-start-1 row-start-1 grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16 w-full h-full transition-all duration-500 ${
                isActive 
                  ? "opacity-100 z-10 pointer-events-auto scale-100" 
                  : "opacity-0 z-0 pointer-events-none scale-[0.99]"
              }`}
              aria-hidden={!isActive}
            >
              {chunk.map((item, index) => (
                <div key={index} className="flex flex-row items-start gap-4 text-left h-full">
                  <span className="font-sans font-extrabold text-quote text-studio-copper leading-none select-none pointer-events-none shrink-0 relative -mt-3 md:-mt-5">
                    “
                  </span>

                  <div className="flex-1 flex flex-col justify-between h-full min-h-full">
                    <p className="font-sans font-light text-support text-studio-card-text leading-relaxed text-left pt-2">
                      {locale === "en" ? item.quoteEn : item.quoteEs}
                    </p>

                    {item.label && (
                      <div className="mt-6 flex items-center justify-between">
                        <span className="text-support font-light leading-illustrator text-studio-copper font-sans">
                          {item.label}
                        </span>
                         
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center gap-3 w-full">
          {chunks.map((_, pageIndex) => (
            <button
              key={pageIndex}
              className={`h-2 rounded-full transition-all duration-300 ${
                pageIndex === currentPage 
                  ? "w-6 bg-studio-copper" 
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              onClick={() => setCurrentPage(pageIndex)}
              aria-label={`Go to slide group ${pageIndex + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}