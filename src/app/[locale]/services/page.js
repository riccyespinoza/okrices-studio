import React from "react";
import { client } from "@/sanity/lib/client";
import Section from "@/components/Section";
import { Heading, Text } from "@/components/Typography";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import TextReveal from "@/components/TextReveal";
import Magnetic from "@/components/Magnetic";
import HeroGlow from "@/components/FluidHero";
import GlowCard from "@/components/GlowCard";
import CtaCard from "@/components/CtaCard";
import LocalizedLink from "@/components/LocalizedLink"; // Importante: Importamos el componente

async function getServicesPageData() {
  const query = `*[_type == "servicesPage"][0]{
    heroTitleEs, heroSubtitleEs, heroBtnMainEs, heroBtnSecEs, heroBtnMainLink, heroBtnSecLink,
    heroTitleEn, heroSubtitleEn, heroBtnMainEn, heroBtnSecEn,
    servicesList[]{
      titleEs, textEs, includedEs, ctaEs, titleEn, textEn, includedEn, ctaEn, "imageUrl": image.asset->url,
      sectionCtaTitleEs, sectionCtaTextEs, sectionCtaBtnEs, sectionCtaLink,
      sectionCtaTitleEn, sectionCtaTextEn, sectionCtaBtnEn,
      packages[]{ 
        titleEn, textEn, priceEn, deliveryEn, detailsEn, ctaEn, ctaLink,
        titleEs, textEs, priceEs, deliveryEs, detailsEs, ctaEs, featured 
      }
    },
    ctaTitleEs, ctaSubtitleEs, ctaBtnEs, ctaBtnLink, ctaTitleEn, ctaSubtitleEn, ctaBtnEn
  }`;
  return await client.fetch(query);
}

function renderHighlightedText(rawText) {
  if (!rawText) return "";
  const parts = rawText.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, index) => index % 2 === 1 ? <span key={index} className="text-studio-copper font-medium">{part}</span> : part);
}

export default async function ServicesPage({ params }) {
  const { locale } = await params;
  const data = await getServicesPageData();
  if (!data) return <main className="min-h-screen bg-studio-blue" />;

  return (
    <main className="studio-main-container">
      {/* Hero Principal */}
      <HeroGlow>
        <Section className="flex min-h-[95vh] flex-col items-start justify-center gap-12 pb-20 pt-32">
          <div className="max-w-5xl space-y-8">
            <TextReveal text={locale === "en" ? data.heroTitleEn : data.heroTitleEs} className="text-hero font-sans font-semibold leading-none tracking-[-0.03em] text-studio-white" />
            <div className="max-w-3xl text-hero-subtitle font-light leading-relaxed tracking-wide text-studio-white">
              {renderHighlightedText(locale === "en" ? data.heroSubtitleEn : data.heroSubtitleEs)}
            </div>
          </div>

          <FadeIn delay={0.7} direction="up" className="flex w-full flex-col items-center gap-6 sm:w-auto sm:flex-row">
            <LocalizedLink href={data.heroBtnMainLink || "/"}>
              <Magnetic>
                <Button variant="primary" className="studio-button text-button w-full sm:w-auto">
                  {locale === "en" ? data.heroBtnMainEn : data.heroBtnMainEs}
                </Button>
              </Magnetic>
            </LocalizedLink>
            <LocalizedLink href={data.heroBtnSecLink || "/"}>
              <Magnetic>
                <Button variant="secondary" className="studio-button text-button w-full border border-studio-white/20 text-studio-white/80 hover:border-studio-white hover:text-studio-white sm:w-auto">
                  {locale === "en" ? data.heroBtnSecEn : data.heroBtnSecEs}
                </Button>
              </Magnetic>
            </LocalizedLink>
          </FadeIn>
        </Section>
      </HeroGlow>

      {/* Servicios */}
      <Section className="studio-section-divider space-y-32">
        {data.servicesList?.map((service, serviceIndex) => {
          const serviceTitle = locale === "en" ? service.titleEn : service.titleEs;
          const serviceText = locale === "en" ? service.textEn : service.textEs;
          const serviceIncluded = locale === "en" ? service.includedEn : service.includedEs;
          const sectionCtaTitle = locale === "en" ? service.sectionCtaTitleEn : service.sectionCtaTitleEs;
          const sectionCtaText = locale === "en" ? service.sectionCtaTextEn : service.sectionCtaTextEs;
          const sectionCtaButton = locale === "en" ? service.sectionCtaBtnEn : service.sectionCtaBtnEs;

          const totalPackages = service.packages?.length || 0;
          const gridColsClass = totalPackages === 4 ? "md:grid-cols-4" : "md:grid-cols-3";

          return (
            <div key={serviceIndex} className="space-y-16 py-12">
              <FadeIn direction="up">
                <div className={`flex flex-col items-center gap-12 ${serviceIndex % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="w-full space-y-6 md:w-1/2">
                    <Heading level={2} className="text-studio-copper">{renderHighlightedText(serviceTitle)}</Heading>
                    <Text className="text-subtitle font-light leading-illustrator text-studio-white">{renderHighlightedText(serviceText)}</Text>
                    {serviceIncluded?.length > 0 && (
                      <ul className="space-y-3 pt-2">
                        {serviceIncluded.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3 font-sans text-support font-light leading-illustrator text-studio-white/80">
                            <span aria-hidden="true" className="shrink-0 text-studio-copper">✦</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="aspect-[4/3] w-full md:w-1/2">
                    {service.imageUrl ? <img src={service.imageUrl} alt={serviceTitle || ""} className="h-full w-full rounded-xl object-cover" /> : 
                     <div className="flex h-full w-full items-center justify-center rounded-xl border border-studio-white/[0.05] bg-studio-white/[0.02]"><span className="text-micro font-sans uppercase tracking-[0.2em] text-studio-white/20">Visual Media Missing</span></div>}
                  </div>
                </div>
              </FadeIn>

              {/* Paquetes */}
              {service.packages?.length > 0 && (
                <div className="space-y-8">
                  <div className={`grid grid-cols-1 gap-6 ${gridColsClass}`}>
                    {service.packages.map((pkg, pkgIndex) => {
                      const pTitle = locale === "en" ? pkg.titleEn : pkg.titleEs;
                      const pText = locale === "en" ? pkg.textEn : pkg.textEs;
                      const pPrice = locale === "en" ? pkg.priceEn : pkg.priceEs;
                      const pDelivery = locale === "en" ? pkg.deliveryEn : pkg.deliveryEs;
                      const pDetails = locale === "en" ? pkg.detailsEn : pkg.detailsEs;
                      const pCta = locale === "en" ? pkg.ctaEn : pkg.ctaEs;
                      
                      return (
                        <FadeIn key={pkgIndex} delay={pkgIndex * 0.1} direction="up" className="h-full">
                          <GlowCard className={`h-full min-h-[520px] ${pkg.featured ? "border-studio-copper shadow-[0_0_30px_rgba(165,81,48,0.15)]" : ""}`}>
                            <div className="flex h-full flex-col p-1">
                              <div className="mb-6 flex items-start justify-between gap-3 md:min-h-[3.5rem]">
                                <Heading level={3} className="text-studio-white transition-colors group-hover:text-studio-copper">{pTitle}</Heading>
                                {pkg.featured && <span className="shrink-0 rounded-full bg-studio-copper/10 px-3 py-1 font-sans text-micro font-medium uppercase tracking-widest text-studio-copper">Popular</span>}
                              </div>
                              <div className="md:min-h-[9rem]"><Text className="text-body-large font-light leading-illustrator text-studio-card-text">{renderHighlightedText(pText)}</Text></div>
                              <div className="mt-8 flex flex-1 flex-col border-t border-studio-white/10 pt-6">
                                {pDetails?.length > 0 && <ul className="space-y-3">{pDetails.map((d, i) => <li key={i} className="flex items-start gap-3 font-sans text-support font-light leading-illustrator text-studio-white/80"><span aria-hidden="true" className="shrink-0 text-studio-copper">●</span><span>{d}</span></li>)}</ul>}
                                {(pPrice || pDelivery) && (
                                  <div className="mt-auto space-y-2 pt-8">
                                    {pPrice && <p className="font-sans text-body-large font-medium leading-illustrator text-studio-copper">{pPrice}</p>}
                                    {pDelivery && <p className="font-sans text-support font-light leading-illustrator text-studio-white/50">{pDelivery}</p>}
                                  </div>
                                )}
                              </div>
                              {pCta && (
                                <div className="w-full pt-8">
                                  <LocalizedLink href={pkg.ctaLink || "/"}>
                                    <Button variant={pkg.featured ? "primary" : "secondary"} className="studio-button text-button w-full">{pCta}</Button>
                                  </LocalizedLink>
                                </div>
                              )}
                            </div>
                          </GlowCard>
                        </FadeIn>
                      );
                    })}
                  </div>
                </div>
              )}

              {sectionCtaTitle && (
                <FadeIn direction="up" className="pt-4">
                  <CtaCard variant="secondary">
                    <div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                      <div className="max-w-3xl space-y-4">
                        <Heading level={3} className="text-studio-white">{renderHighlightedText(sectionCtaTitle)}</Heading>
                        {sectionCtaText && <Text className="text-body-large font-light leading-illustrator text-studio-white/80">{renderHighlightedText(sectionCtaText)}</Text>}
                      </div>
                      {sectionCtaButton && (
                         <LocalizedLink href={service.sectionCtaLink || "/"}>
                            <Magnetic><Button variant="secondary" className="studio-button text-button whitespace-nowrap">{sectionCtaButton}</Button></Magnetic>
                         </LocalizedLink>
                      )}
                    </div>
                  </CtaCard>
                </FadeIn>
              )}
            </div>
          );
        })}
      </Section>

      {/* CTA Final */}
      <Section className="py-24 md:py-32">
        <CtaCard variant="primary">
          <div className="max-w-4xl space-y-8">
            <Heading level={2} className="text-studio-white">
              {renderHighlightedText(locale === "en" ? data.ctaTitleEn : data.ctaTitleEs)}
            </Heading>
            <Text className="max-w-3xl text-subtitle font-light leading-illustrator tracking-wide text-studio-cta-sub">
              {renderHighlightedText(locale === "en" ? data.ctaSubtitleEn : data.ctaSubtitleEs)}
            </Text>
            <LocalizedLink href={data.ctaBtnLink || "/"}>
              <div className="flex w-full justify-start pt-4 sm:w-auto">
                <Magnetic>
                  <Button variant="tertiary" className="studio-button text-button">
                    {locale === "en" ? data.ctaBtnEn : data.ctaBtnEs}
                  </Button>
                </Magnetic>
              </div>
            </LocalizedLink>
          </div>
        </CtaCard>
      </Section>
    </main>
  );
}