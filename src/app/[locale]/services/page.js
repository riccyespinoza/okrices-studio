import React from "react";
import { client } from "@/sanity/lib/client";
import Section from "@/components/Section";
import { Heading, Text } from "@/components/Typography";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import TextReveal from "@/components/TextReveal";
import Magnetic from "@/components/Magnetic";
import HeroGlow from "@/components/FluidHero";
import CtaCard from "@/components/CtaCard";
import LocalizedLink from "@/components/LocalizedLink";

async function getServicesPageData() {
  const query = `*[_type == "servicesPage"][0]{
    heroTitleEs, heroSubtitleEs, heroBtnMainEs, heroBtnSecEs, heroBtnMainLink, heroBtnSecLink,
    heroTitleEn, heroSubtitleEn, heroBtnMainEn, heroBtnSecEn,
    servicesList[]{
      titleEs, subtitleEs, forYouListEs, includesTitleEs, includesListEs, developTitleEs,
      titleEn, subtitleEn, forYouListEn, includesTitleEn, includesListEn, developTitleEn,
      extraNoteEs, extraNoteEn, ctaTextEs, ctaTextEn, ctaLink,
      "imageUrl": image.asset->url,
      developItems[]{
        "iconUrl": iconSvg.asset->url,
        textEs, textEn
      }
    },
    ctaTitleEs, ctaSubtitleEs, ctaBtnEs, ctaBtnLink,
    ctaTitleEn, ctaSubtitleEn, ctaBtnEn
  }`;
  return await client.fetch(query);
}

function renderHighlightedText(rawText) {
  if (!rawText) return "";
  const parts = rawText.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} className="text-studio-copper font-medium">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default async function ServicesPage({ params }) {
  const { locale } = await params;
  const data = await getServicesPageData();

  if (!data) return <main className="min-h-screen bg-studio-blue" />;

  const isEn = locale === "en";

  return (
    <main className="studio-main-container">
      {/* 1. HERO PRINCIPAL DE SERVICIOS */}
      <HeroGlow>
        <Section className="flex min-h-[95vh] flex-col items-start justify-center gap-12 pb-20 pt-32">
          <div className="max-w-5xl space-y-8">
            <TextReveal
              text={isEn ? data.heroTitleEn : data.heroTitleEs}
              className="text-hero font-sans font-semibold leading-none tracking-[-0.03em] text-studio-white"
            />
            <div className="max-w-3xl text-hero-subtitle font-light leading-relaxed tracking-wide text-studio-white">
              {renderHighlightedText(isEn ? data.heroSubtitleEn : data.heroSubtitleEs)}
            </div>
          </div>

          <FadeIn delay={0.7} direction="up" className="flex w-full flex-col items-center gap-6 sm:w-auto sm:flex-row">
            {(isEn ? data.heroBtnMainEn : data.heroBtnMainEs) && (
              <LocalizedLink href={data.heroBtnMainLink || "/contact"}>
                <Magnetic>
                  <Button variant="primary" className="studio-button text-button w-full sm:w-auto">
                    {isEn ? data.heroBtnMainEn : data.heroBtnMainEs}
                  </Button>
                </Magnetic>
              </LocalizedLink>
            )}
            {(isEn ? data.heroBtnSecEn : data.heroBtnSecEs) && (
              <LocalizedLink href={data.heroBtnSecLink || "/work"}>
                <Magnetic>
                  <Button
                    variant="secondary"
                    className="studio-button text-button w-full border border-studio-white/20 text-studio-white/80 hover:border-studio-white hover:text-studio-white sm:w-auto"
                  >
                    {isEn ? data.heroBtnSecEn : data.heroBtnSecEs}
                  </Button>
                </Magnetic>
              </LocalizedLink>
            )}
          </FadeIn>
        </Section>
      </HeroGlow>

      {/* 2. BLOQUES DE SERVICIOS INDIVIDUALES */}
      <Section className="studio-section-divider space-y-24 md:space-y-36">
        {data.servicesList?.map((service, index) => {
          const title = isEn ? service.titleEn : service.titleEs;
          const subtitle = isEn ? service.subtitleEn : service.subtitleEs;
          const forYouList = isEn ? service.forYouListEn : service.forYouListEs;

          const includesTitle = isEn ? service.includesTitleEn : service.includesTitleEs;
          const includesList = isEn ? service.includesListEn : service.includesListEs;

          const developTitle = isEn ? service.developTitleEn : service.developTitleEs;
          const developItems = service.developItems || [];

          const extraNote = isEn ? service.extraNoteEn : service.extraNoteEs;
          const ctaText = isEn ? service.ctaTextEn : service.ctaTextEs;

          // Alternancia de posición de columna para escritorio (Zig-Zag)
          const isEven = index % 2 === 0;
          const imageOrderClass = isEven ? "lg:order-1" : "lg:order-2";
          const contentOrderClass = isEven ? "lg:order-2" : "lg:order-1";

          return (
            <FadeIn key={index} direction="up">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
               {/* Columna Imagen del servicio */}
{service.imageUrl && (
  <div className={`lg:col-span-5 w-full ${imageOrderClass}`}>
    <div className="studio-media-window aspect-[4/4] w-full sticky top-28">
      <img
        src={service.imageUrl}
        alt={title || "Service media"}
        className="h-full w-full object-cover"
      />
    </div>
  </div>
)}

                {/* Columna Contenido completo */}
                <div
                  className={`${
                    service.imageUrl ? "lg:col-span-7" : "lg:col-span-12"
                  } space-y-8 ${contentOrderClass}`}
                >
                  {/* Encabezado del Servicio */}
                  <div className="space-y-4">
                    <Heading level={2} className="text-studio-copper text-3xl sm:text-4xl font-semibold leading-tight">
                      {renderHighlightedText(title)}
                    </Heading>

                    {subtitle && (
                      <Text className="text-lg sm:text-xl font-light leading-relaxed text-studio-white/90">
                        {renderHighlightedText(subtitle)}
                      </Text>
                    )}
                  </div>

                  {/* Sub-columnas de Listados (Sin líneas divisorias superior) */}
                  {(forYouList?.length > 0 || includesList?.length > 0) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Columna A: Para ti si... */}
                      {forYouList?.length > 0 && (
                        <div className="space-y-4">
                          <Heading level={4} className="font-sans text-sm sm:text-base font-medium text-studio-copper uppercase tracking-wider">
                            {isEn ? "This service is for you if:" : "Este servicio es para ti si:"}
                          </Heading>
                          <ul className="space-y-3">
                            {forYouList.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-3 font-sans text-sm sm:text-base font-light text-studio-white/80 leading-relaxed">
                                <span aria-hidden="true" className="shrink-0 text-studio-copper mt-1">●</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Columna B: Entregables / Incluye */}
                      {includesList?.length > 0 && (
                        <div className="space-y-4">
                          {includesTitle && (
                            <Heading level={4} className="font-sans text-sm sm:text-base font-medium text-studio-copper uppercase tracking-wider">
                              {includesTitle}
                            </Heading>
                          )}
                          <ul className="space-y-3">
                            {includesList.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-3 font-sans text-sm sm:text-base font-light text-studio-white/80 leading-relaxed">
                                <span aria-hidden="true" className="shrink-0 text-studio-copper mt-1">●</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Desarrollos en Mini Cards (Cuadradas, Ícono arriba del texto, 1 sola fila de 4) */}
                  {developItems?.length > 0 && (
                    <div className="space-y-4">
                      {developTitle && (
                        <Heading level={4} className="font-sans text-sm sm:text-base font-medium text-studio-copper uppercase tracking-wider">
                          {developTitle}
                        </Heading>
                      )}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {developItems.map((item, itemIdx) => {
                          const itemText = isEn ? item.textEn : item.textEs;
                          return (
                            <div
                              key={itemIdx}
                              className="flex flex-col items-start gap-3 p-4 sm:p-5 rounded-studio bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm transition-all duration-300 hover:border-studio-copper/40 hover:bg-white/[0.05]"
                            >
                              {item.iconUrl ? (
                                <div
                                  className="w-7 h-7 bg-studio-icon-gradient select-none shrink-0"
                                  style={{
                                    maskImage: `url(${item.iconUrl})`,
                                    WebkitMaskImage: `url(${item.iconUrl})`,
                                    maskRepeat: "no-repeat",
                                    WebkitMaskRepeat: "no-repeat",
                                    maskPosition: "center",
                                    WebkitMaskPosition: "center",
                                    maskSize: "contain",
                                    WebkitMaskSize: "contain",
                                  }}
                                />
                              ) : (
                                <span aria-hidden="true" className="shrink-0 text-studio-copper text-lg">●</span>
                              )}
                              <span className="font-sans text-sm font-light text-studio-white/90 leading-snug">
                                {itemText}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Nota Adicional Transversal */}
                  {extraNote && (
                    <div className="border-l-2 border-studio-copper/50 pl-4 py-2 bg-studio-white/[0.02] rounded-r-studio">
                      <p className="font-sans text-sm sm:text-base font-light italic text-studio-white/70 leading-relaxed">
                        {renderHighlightedText(extraNote)}
                      </p>
                    </div>
                  )}

                  {/* Botón CTA del Servicio */}
                  {ctaText && (
                    <div className="pt-2">
                      <LocalizedLink href={service.ctaLink || "/contact"}>
                        <Magnetic>
                          <Button variant="primary" className="studio-button text-button w-full sm:w-auto">
                            {ctaText}
                          </Button>
                        </Magnetic>
                      </LocalizedLink>
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
          );
        })}
      </Section>

      {/* 3. CTA FINAL */}
      <Section className="py-24 md:py-32">
        <CtaCard variant="primary">
          <div className="max-w-4xl space-y-8">
            <Heading level={2} className="text-studio-white">
              {renderHighlightedText(isEn ? data.ctaTitleEn : data.ctaTitleEs)}
            </Heading>
            <Text className="max-w-3xl text-subtitle font-light leading-illustrator tracking-wide text-studio-cta-sub">
              {renderHighlightedText(isEn ? data.ctaSubtitleEn : data.ctaSubtitleEs)}
            </Text>
            {(isEn ? data.ctaBtnEn : data.ctaBtnEs) && (
              <LocalizedLink href={data.ctaBtnLink || "/contact"}>
                <div className="flex w-full justify-start pt-4 sm:w-auto">
                  <Magnetic>
                    <Button variant="tertiary" className="studio-button text-button">
                      {isEn ? data.ctaBtnEn : data.ctaBtnEs}
                    </Button>
                  </Magnetic>
                </div>
              </LocalizedLink>
            )}
          </div>
        </CtaCard>
      </Section>
    </main>
  );
}