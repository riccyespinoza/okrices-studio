// src/app/[locale]/about/page.js
import React from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Section from "@/components/Section";
import { Heading, Text } from "@/components/Typography";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import TextReveal from "@/components/TextReveal";
import Magnetic from "@/components/Magnetic";
import HeroGlow from "@/components/FluidHero";
import GlowCard from "@/components/GlowCard";
import CtaCard from "@/components/CtaCard";

async function getAboutPageData() {
  const query = `*[_type == "aboutPage"][0]{
    heroTitleEs, heroSubtitleEs, heroTitleEn, heroSubtitleEn,
    "imageUrl": heroImage.asset->url,
    originTitleEs, originTextEs, originTitleEn, originTextEn,
    howTitleEs, howTextEs, howTitleEn, howTextEn,
    diffTitleEs, diffTextEs, diffPointsEs,
    diffTitleEn, diffTextEn, diffPointsEn,
    localTitleEs, localTextEs, localTitleEn, localTextEn,
    valuesTitleEs, valuesListEs, valuesTitleEn, valuesListEn,
    ctaTitleEs, ctaBtnEs, ctaTitleEn, ctaBtnEn
  }`;
  return await client.fetch(query);
}

function renderHighlightedText(rawText) {
  if (!rawText) return "";
  const parts = rawText.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <span key={index} className="text-studio-copper font-medium">{part}</span>;
    }
    return part;
  });
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const data = await getAboutPageData();

  if (!data) return <main className="min-h-screen bg-[#0c0c0a]" />;

  const isEn = locale === "en";

  return (
    <main className="studio-main-container bg-[#0c0c0a]">
      
      {/* SECCIÓN 1: HERO */}
      <HeroGlow>
        <Section className="flex flex-col items-start justify-center min-h-[90vh] gap-12 pt-32 pb-20">
          <div className="max-w-5xl space-y-8">
            <TextReveal 
              text={isEn ? data.heroTitleEn : data.heroTitleEs} 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-semibold tracking-[-0.03em] leading-[1.05] text-white" 
            />
            <FadeIn delay={0.5} direction="up">
              <Text className="max-w-2xl text-base md:text-lg text-white/60 font-light leading-relaxed tracking-wide">
                {renderHighlightedText(isEn ? data.heroSubtitleEn : data.heroSubtitleEs)}
              </Text>
            </FadeIn>
          </div>
        </Section>
      </HeroGlow>

      {/* IMAGEN EDITORIAL (Si existe) */}
      {data.imageUrl && (
        <Section className="pb-24">
          <FadeIn direction="up">
            <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-[2rem] overflow-hidden bg-white/5">
              <img 
                src={data.imageUrl} 
                alt="Okrices Studio" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
              />
            </div>
          </FadeIn>
        </Section>
      )}

      {/* SECCIÓN 2: ORIGEN Y CÓMO TRABAJAMOS (Diseño tipo columnas editoriales) */}
      <Section className="studio-section-divider">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Bloque: Origen */}
          <FadeIn direction="up" className="space-y-6">
            <Heading level={2} className="text-2xl md:text-3xl text-studio-copper font-medium tracking-tight">
              {isEn ? data.originTitleEn : data.originTitleEs}
            </Heading>
            <Text className="text-white/70 font-light text-base md:text-lg leading-relaxed">
              {isEn ? data.originTextEn : data.originTextEs}
            </Text>
          </FadeIn>

          {/* Bloque: Cómo Trabajamos */}
          <FadeIn direction="up" delay={0.2} className="space-y-6">
            <Heading level={2} className="text-2xl md:text-3xl text-white font-medium tracking-tight">
              {isEn ? data.howTitleEn : data.howTitleEs}
            </Heading>
            <Text className="text-white/70 font-light text-base md:text-lg leading-relaxed">
              {isEn ? data.howTextEn : data.howTextEs}
            </Text>
          </FadeIn>

        </div>
      </Section>

      {/* SECCIÓN 3: QUÉ NOS DIFERENCIA */}
      <Section className="studio-section-divider">
        <div className="max-w-4xl space-y-12">
          <FadeIn direction="up">
            <Heading level={2} className="text-3xl md:text-5xl font-sans font-medium text-white mb-6">
              {isEn ? data.diffTitleEn : data.diffTitleEs}
            </Heading>
            <Text className="text-white/60 font-light text-lg md:text-xl leading-relaxed max-w-3xl">
              {isEn ? data.diffTextEn : data.diffTextEs}
            </Text>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 pt-8 border-t border-white/10">
            {(isEn ? data.diffPointsEn : data.diffPointsEs)?.map((point, index) => (
              <FadeIn key={index} delay={index * 0.1} direction="up" className="flex items-start gap-4">
                <span className="text-studio-copper mt-1">✦</span>
                <span className="text-white/80 font-light text-lg">{point}</span>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* SECCIÓN 4: ENFOQUE LOCAL Y VALORES */}
      <Section className="studio-section-divider">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Bloque Local */}
          <FadeIn direction="up" className="lg:col-span-7 space-y-6">
            <Heading level={2} className="text-3xl md:text-4xl text-white font-medium tracking-tight">
              {isEn ? data.localTitleEn : data.localTitleEs}
            </Heading>
            <Text className="text-white/60 font-light text-lg leading-relaxed max-w-xl">
              {isEn ? data.localTextEn : data.localTextEs}
            </Text>
          </FadeIn>

          {/* Bloque Valores */}
          <FadeIn direction="up" delay={0.2} className="lg:col-span-5">
            <GlowCard className="p-8 md:p-10 bg-white/[0.02]">
              <Heading level={3} className="text-sm uppercase tracking-[0.2em] text-studio-copper font-medium mb-8">
                {isEn ? data.valuesTitleEn : data.valuesTitleEs}
              </Heading>
              <div className="flex flex-wrap gap-3">
                {(isEn ? data.valuesListEn : data.valuesListEs)?.map((value, index) => (
                  <span 
                    key={index} 
                    className="px-5 py-2 rounded-full border border-white/20 text-white/80 text-sm font-light tracking-wide bg-transparent"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </GlowCard>
          </FadeIn>

        </div>
      </Section>

      {/* SECCIÓN 5: CTA FINAL */}
      <Section className="py-24 md:py-32">
        <CtaCard className="text-center max-w-4xl mx-auto flex flex-col items-center">
          <Heading level={2} className="text-3xl md:text-5xl lg:text-6xl tracking-tighter font-sans font-medium text-white mb-10">
            {renderHighlightedText(isEn ? data.ctaTitleEn : data.ctaTitleEs)}
          </Heading>
          
          <Link href={`/${locale}/contact`}>
            <Magnetic>
              <Button variant="tertiary" className="px-10">
                {isEn ? data.ctaBtnEn : data.ctaBtnEs}
              </Button>
            </Magnetic>
          </Link>
        </CtaCard>
      </Section>

    </main>
  );
}