import React from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Section from "@/components/Section";
import { Heading, Text } from "@/components/Typography";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import TextReveal from "@/components/TextReveal";
import Magnetic from "@/components/Magnetic";
import CtaCard from "@/components/CtaCard";
import Accordion from "@/components/Accordion";

async function getFaqPageData() {
  const query = `*[_type == "faqPage"][0]{
    heroTitleEs,
    heroSubtitleEs,
    heroTitleEn,
    heroSubtitleEn,
    faqItems[]{
      questionEs,
      answerEs,
      questionEn,
      answerEn
    },
    ctaTitleEs,
    ctaTextEs,
    ctaBtnEs,
    ctaTitleEn,
    ctaTextEn,
    ctaBtnEn
  }`;

  return await client.fetch(query);
}

function renderHighlightedText(rawText) {
  if (!rawText) return "";

  const parts = rawText.split(/\*\*([^*]+)\*\*/g);

  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <span
          key={index}
          className="text-studio-copper font-medium"
        >
          {part}
        </span>
      );
    }

    return part;
  });
}

export default async function FaqPage({ params }) {
  const { locale } = await params;
  const data = await getFaqPageData();

  if (!data) {
    return (
      <main className="studio-main-container min-h-screen" />
    );
  }

  const isEn = locale === "en";

  const heroTitle = isEn ? data.heroTitleEn : data.heroTitleEs;
  const heroSubtitle = isEn ? data.heroSubtitleEn : data.heroSubtitleEs;
  const ctaTitle = isEn ? data.ctaTitleEn : data.ctaTitleEs;
  const ctaText = isEn ? data.ctaTextEn : data.ctaTextEs;
  const ctaButton = isEn ? data.ctaBtnEn : data.ctaBtnEs;

  return (
    <main className="studio-main-container">
      
      {/* 1. SECCIÓN HERO (Gobernada visualmente de manera global) */}
      <div className="studio-hero-editorial">
        <Section noVerticalPadding>
          {/* ENCABEZADO E INTRODUCCIÓN */}
          <FadeIn direction="up" className="space-y-8">
            <Heading level={2} className="font-semibold tracking-[-0.03em] text-studio-white">
              {heroTitle}
            </Heading>

            <div className="text-subtitle font-light leading-illustrator tracking-wide text-studio-white/70">
              {renderHighlightedText(heroSubtitle)}
            </div>
          </FadeIn>
        </Section>
      </div>

      {/* 2. ACORDEÓN DE PREGUNTAS (Contenido Puro) */}
      <Section className="pt-0 pb-24 md:pb-32">
        <div className="w-full space-y-2 text-left">
          {data.faqItems?.map((item, index) => {
            const question = isEn ? item.questionEn : item.questionEs;
            const answer = isEn ? item.answerEn : item.answerEs;

            return (
              <FadeIn key={`${question}-${index}`} delay={index * 0.05} direction="up">
                <Accordion question={question} answer={answer} />
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* 3. SECCIÓN CTA FINAL */}
      <Section>
        <div className="w-full max-w-7xl mx-auto">
          <CtaCard
            variant="primary"
            className="w-full flex flex-col items-start text-left"
          >
            <Heading
              level={2}
              className="mb-6 font-sans font-medium tracking-tighter text-white"
            >
              {renderHighlightedText(ctaTitle)}
            </Heading>

            <Text className="max-w-3xl mb-10 text-body-large text-left text-white/60 font-light leading-relaxed">
              {ctaText}
            </Text>

            <Link href={`/${locale}/contact`}>
              <Magnetic>
                <Button
                  variant="tertiary"
                  className="px-10"
                >
                  {ctaButton}
                </Button>
              </Magnetic>
            </Link>
          </CtaCard>
        </div>
      </Section>
      
    </main>
  );
}