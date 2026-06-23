import React from "react";
import { client } from "@/sanity/lib/client";
import Section from "@/components/Section";
import { Heading, Text } from "@/components/Typography";
import Button from "@/components/Button";

async function getHomeData() {
  const query = `*[_type == "home"][0]{
    heroTitleEs,
    heroSubtitleEs,
    heroTitleEn,
    heroSubtitleEn
  }`;
  return await client.fetch(query);
}

// Función auxiliar para transformar los asteriscos ** en texto color Cobre nativo
function renderHighlightedText(rawText) {
  if (!rawText) return "";
  
  // Divide el texto usando las marcas ** como punto de corte
  const parts = rawText.split(/\*\*([^*]+)\*\*/g);
  
  return parts.map((part, index) => {
    // Las partes impares son las que estaban envueltas entre asteriscos
    if (index % 2 === 1) {
      return (
        <span key={index} className="text-studio-copper font-medium">
          {part}
        </span>
      );
    }
    return part;
  });
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  const data = await getHomeData();

  // Textos de respaldo oficiales con las marcas de destaque integradas
  const defaultTitle = "Tu marca te cuesta clientes antes del primer contacto";
  const defaultSubtitle = "Si no transmite **seguridad** de inmediato, la **oportunidad se desvanece** antes de empezar.";
  
  const defaultTitleEn = "Your brand costs you clients before the first contact";
  const defaultSubtitleEn = "If it doesn't convey **trust** immediately, the **opportunity vanishes** before you even start.";

  // Selección de textos según idioma
  const title = locale === "en" 
    ? (data?.heroTitleEn || defaultTitleEn) 
    : (data?.heroTitleEs || defaultTitle);

  const subtitle = locale === "en" 
    ? (data?.heroSubtitleEn || defaultSubtitleEn) 
    : (data?.heroSubtitleEs || defaultSubtitle);

  return (
    <main className="min-h-screen bg-gradient-to-br from-studio-blue via-[#0F181E] to-[#141D24] text-white">
      <Section className="flex flex-col items-start justify-center min-h-[80vh] gap-8">
        <div className="max-w-4xl space-y-6">
          <Heading level={1}>
            {renderHighlightedText(title)}
          </Heading>
          
          <Text className="max-w-2xl">
            {renderHighlightedText(subtitle)}
          </Text>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Button variant="primary" className="w-full sm:w-auto">
            {locale === "en" ? "Let's talk" : "Hablemos"}
          </Button>
          <Button variant="secondary" className="w-full sm:w-auto">
            {locale === "en" ? "View Portfolio" : "Ver Portafolio"}
          </Button>
        </div>
      </Section>
    </main>
  );
}