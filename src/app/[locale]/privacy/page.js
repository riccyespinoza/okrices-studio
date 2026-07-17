import React from "react";
import { client } from "@/sanity/lib/client";
import Section from "@/components/Section";
import { Heading, Text } from "@/components/Typography";
import FadeIn from "@/components/FadeIn";

// Obtenemos todos los datos estructurados en Sanity
async function getPrivacyPageData() {
  const query = `*[_type == "privacyPage"][0]{
    pageTitleEs, pageTitleEn,
    introTextEs, introTextEn,
    collectTitleEs, collectTitleEn, collectTextEs, collectTextEn,
    useTitleEs, useTitleEn, useTextEs, useTextEn,
    cookiesTitleEs, cookiesTitleEn, cookiesTextEs, cookiesTextEn,
    shareTitleEs, shareTitleEn, shareTextEs, shareTextEn,
    securityTitleEs, securityTitleEn, securityTextEs, securityTextEn,
    rightsTitleEs, rightsTitleEn, rightsTextEs, rightsTextEn,
    contactTitleEs, contactTitleEn, contactTextEs, contactTextEn
  }`;

  return await client.fetch(query);
}

export default async function PrivacyPage({ params }) {
  const { locale } = await params;
  const data = await getPrivacyPageData();

  if (!data) return <main className="studio-main-container min-h-screen" />;

  const isEn = locale === "en";

  // Función auxiliar para renderizar limpiamente cada bloque legal
  const renderSection = (title, text, delay) => {
    if (!title || !text) return null;

    return (
      <FadeIn delay={delay} direction="up" className="space-y-5">
        <Heading level={3} className="font-medium tracking-tight text-studio-white">
          {title}
        </Heading>

        <Text className="whitespace-pre-line text-body-large font-light leading-relaxed text-studio-white/60">
          {text}
        </Text>
      </FadeIn>
    );
  };

  return (
    <main className="studio-main-container">
      
      {/* 1. SECCIÓN HERO (Gobernada visualmente de manera global) */}
      <div className="studio-hero-editorial">
        <Section noVerticalPadding>
          {/* ENCABEZADO E INTRODUCCIÓN */}
          <FadeIn direction="up" className="space-y-8">
            <Heading level={2} className="font-semibold tracking-[-0.03em] text-studio-white">
              {isEn ? data.pageTitleEn : data.pageTitleEs}
            </Heading>

            <Text className="text-subtitle font-light leading-illustrator tracking-wide text-studio-white/70">
              {isEn ? data.introTextEn : data.introTextEs}
            </Text>
          </FadeIn>
        </Section>
      </div>

      {/* 2. SECCIONES LEGALES (Contenido Puro) */}
      <Section className="pt-0 pb-24 md:pb-32">
        <div className="w-full space-y-12">
          {renderSection(isEn ? data.collectTitleEn : data.collectTitleEs, isEn ? data.collectTextEn : data.collectTextEs, 0.1)}
          {renderSection(isEn ? data.useTitleEn : data.useTitleEs, isEn ? data.useTextEn : data.useTextEs, 0.2)}
          {renderSection(isEn ? data.cookiesTitleEn : data.cookiesTitleEs, isEn ? data.cookiesTextEn : data.cookiesTextEs, 0.3)}
          {renderSection(isEn ? data.shareTitleEn : data.shareTitleEs, isEn ? data.shareTextEn : data.shareTextEs, 0.4)}
          {renderSection(isEn ? data.securityTitleEn : data.securityTitleEs, isEn ? data.securityTextEn : data.securityTextEs, 0.5)}
          {renderSection(isEn ? data.rightsTitleEn : data.rightsTitleEs, isEn ? data.rightsTextEn : data.rightsTextEs, 0.6)}
          {renderSection(isEn ? data.contactTitleEn : data.contactTitleEs, isEn ? data.contactTextEn : data.contactTextEs, 0.7)}
        </div>
      </Section>

    </main>
  );
}