import React from "react";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import LocalizedLink from "@/components/LocalizedLink";
import Section from "@/components/Section";
import { Heading, Text } from "@/components/Typography";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import TextReveal from "@/components/TextReveal";
import Magnetic from "@/components/Magnetic";
import CtaCard from "@/components/CtaCard";

// Consultamos el proyecto específico por su slug y traemos la descripción única junto al CTA final
async function getProjectData(slug) {
  const query = `*[_type == "workPage"][0]{
    "project": projectsList[slug.current == $slug][0]{
      name, category, 
      "heroImageUrl": heroImage.asset->url,
      "gallery": gallery[].asset->url,
      descriptionEs, descriptionEn
    },
    ctaTitleEs, ctaSubtitleEs, ctaBtnEs,
    ctaTitleEn, ctaSubtitleEn, ctaBtnEn
  }`;
  return await client.fetch(query, { slug });
}

function renderHighlightedText(rawText) {
  if (!rawText) return "";
  const parts = rawText.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, index) => index % 2 === 1 ? <span key={index} className="text-studio-copper font-medium">{part}</span> : part);
}

export default async function ProjectCaseStudy({ params }) {
  const { locale, slug } = await params;
  const data = await getProjectData(slug);

  // Si no encuentra el proyecto en Sanity, redirige a la página 404 nativa de Next.js
  if (!data || !data.project) return notFound();

  const { project } = data;

  // Selección de texto de descripción según idioma
  const descriptionText = locale === "en" ? project.descriptionEn : project.descriptionEs;

  return (
    <main className="studio-main-container">
      {/* SECCIÓN 1: HERO DE IMPACTO VISUAL (IMAGEN FULL-SCREEN EN ALTA DEFINICIÓN) */}
      <section className="relative w-full overflow-hidden bg-[#0D1419] md:h-screen">
        {project.heroImageUrl && (
          <FadeIn direction="none" duration={1.4} className="w-full h-full">
            <img 
              src={project.heroImageUrl} 
              alt={`Mockup premium HD de ${project.name}`} 
              className="block h-auto w-full object-contain md:h-full md:object-cover"
            />
          </FadeIn>
        )}
      </section>

      {/* SECCIÓN 2: CUERPO EDITORIAL A DOS COLUMNAS (CONTENIDO ABAJO DE LA IMAGEN) */}
      <Section className="studio-section-divider">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
          {/* Columna Izquierda: Nombre del proyecto y su Tipo */}
          <div className="space-y-6">
            <TextReveal 
              text={project.name} 
              className="text-hero font-sans font-semibold tracking-[-0.03em] text-studio-white leading-[1.1]" 
            />
            
            <FadeIn delay={0.2} direction="up">
              <span className="text-micro uppercase tracking-widest text-studio-copper font-medium bg-studio-copper/10 px-4 py-2 rounded-full font-sans inline-block">
                {project.category}
              </span>
            </FadeIn>
          </div>

          {/* Columna Derecha: Descripción unificada del Caso de Estudio */}
          <div className="pt-2 md:pt-4">
            {descriptionText && (
              <FadeIn delay={0.3} direction="up">
                <Text className="text-subtitle text-studio-white/70 font-light leading-illustrator">
                  {renderHighlightedText(descriptionText)}
                </Text>
              </FadeIn>
            )}
          </div>
        </div>
      </Section>

      {/* SECCIÓN 3: GALERÍA DE ENTREGABLES ASIMÉTRICA */}
      {project.gallery && project.gallery.length > 0 && (
        <Section className="studio-section-divider">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {project.gallery.map((imgUrl, index) => (
              <FadeIn 
                key={index} 
                delay={index * 0.1} 
                direction="up" 
                className={index % 3 === 0 ? "md:col-span-2" : "md:col-span-1"}
              >
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-studio-white/5 border border-studio-white/[0.06] shadow-xl">
                  <img 
                    src={imgUrl} 
                    alt={`${project.name} - Detalle de marca e interfaz ${index + 1}`} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s] ease-out"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>
      )}

      {/* SECCIÓN 4: CTA FINAL DE ALTA CONVERSIÓN */}
      <Section className="py-24 md:py-32">
        <CtaCard variant="primary">
          <div className="max-w-4xl space-y-8">
            <Heading level={2} className="text-section tracking-tighter font-sans font-medium text-studio-white">
              {renderHighlightedText(locale === "en" ? data.ctaTitleEn : data.ctaTitleEs)}
            </Heading>
            
            {(locale === "en" ? data.ctaSubtitleEn : data.ctaSubtitleEs) && (
              <Text className="text-subtitle font-light leading-relaxed tracking-wide text-studio-cta-sub">
                {renderHighlightedText(locale === "en" ? data.ctaSubtitleEn : data.ctaSubtitleEs)}
              </Text>
            )}
            
            {(locale === "en" ? data.ctaBtnEn : data.ctaBtnEs) && (
              <div className="pt-4">
                <Magnetic>
                  <Button variant="tertiary" className="studio-button text-button">
                    {locale === "en" ? data.ctaBtnEn : data.ctaBtnEs}
                  </Button>
                </Magnetic>
              </div>
            )}
          </div>
        </CtaCard>
      </Section>
    </main>
  );
}