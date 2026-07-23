import React from "react";
import { client } from "@/sanity/lib/client";
import Section from "@/components/Section";
import { Heading, Text } from "@/components/Typography";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import TextReveal from "@/components/TextReveal";
import Magnetic from "@/components/Magnetic";
import CtaCard from "@/components/CtaCard";
import PortfolioGrid from "@/components/PortfolioGrid";
import LocalizedLink from "@/components/LocalizedLink";

async function getWorkPageData() {
  const query = `*[_type == "workPage"][0]{
    heroTitleEs, heroSubtitleEs, heroTitleEn, heroSubtitleEn,
    categories,
    projectsList[]{
      name, category, "slug": slug.current,
      shortDescEs, shortDescEn,
      "imageUrl": gridImage.asset->url
    },
    ctaTitleEs, ctaSubtitleEs, ctaBtnEs, ctaBtnLink,
    ctaTitleEn, ctaSubtitleEn, ctaBtnEn
  }`;
  return await client.fetch(query);
}

function renderHighlightedText(rawText) {
  if (!rawText) return "";
  const parts = rawText.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, index) => index % 2 === 1 ? <span key={index} className="text-studio-copper font-medium">{part}</span> : part);
}

export default async function WorkPage({ params }) {
  const { locale } = await params;
  const data = await getWorkPageData();

  if (!data) return <main className="min-h-screen bg-studio-blue" />;

  const heroSubtitle = locale === "en" ? data.heroSubtitleEn : data.heroSubtitleEs;

  return (
    <main className="studio-main-container">
      {/* SECCIÓN ÚNICA: CABECERA, FILTROS Y PROYECTOS INTEGRADOS */}
      <Section className="pt-60 md:pt-72 pb-32 flex flex-col items-center text-center">
        
        {/* 1. TÍTULO PRINCIPAL */}
        <div className="max-w-4xl mx-auto mb-6 md:mb-8">
          <TextReveal 
            text={locale === "en" ? data.heroTitleEn : data.heroTitleEs} 
            className="text-hero font-sans font-semibold tracking-[-0.03em] leading-none text-studio-white text-center mx-auto" 
          />
        </div>

        {/* 2. FILTROS Y PROYECTOS */}
        <div className="w-full flex flex-col items-center">
          {heroSubtitle && (
            <FadeIn direction="up" className="mb-12 text-center">
              <Heading level={3} className="text-support text-studio-white/40 uppercase tracking-[0.2em] font-medium mb-4">
                {heroSubtitle}
              </Heading>
            </FadeIn>
          )}
          
          <div className="w-full">
            <PortfolioGrid 
              projects={data.projectsList || []} 
              categories={data.categories || []} 
              locale={locale} 
            />
          </div>
        </div>
      </Section>

      {/* SECCIÓN 3: CTA FINAL */}
      <Section className="py-24 md:py-32">
        <CtaCard variant="primary">
          <div className="max-w-4xl space-y-8">
            <Heading level={2} className="text-section tracking-tighter font-sans font-medium text-studio-white">
              {renderHighlightedText(locale === "en" ? data.ctaTitleEn : data.ctaTitleEs)}
            </Heading>
            {(locale === "en" ? data.ctaSubtitleEn : data.ctaSubtitleEs) && (
              <Text className="max-w-2xl text-subtitle font-light leading-relaxed tracking-wide text-studio-cta-sub">
                {renderHighlightedText(locale === "en" ? data.ctaSubtitleEn : data.ctaSubtitleEs)}
              </Text>
            )}
            {(locale === "en" ? data.ctaBtnEn : data.ctaBtnEs) && (
              <div className="pt-4 flex justify-start w-full sm:w-auto">
                <LocalizedLink href={data.ctaBtnLink || "/"}>
                  <Magnetic>
                    <Button variant="tertiary" className="studio-button text-button">
                      {locale === "en" ? data.ctaBtnEn : data.ctaBtnEs}
                    </Button>
                  </Magnetic>
                </LocalizedLink>
              </div>
            )}
          </div>
        </CtaCard>
      </Section>
    </main>
  );
}