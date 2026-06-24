import React from "react";
import { client } from "@/sanity/lib/client";
import Section from "@/components/Section";
import { Heading, Text } from "@/components/Typography";
import Button from "@/components/Button";

// Importamos la suite interactiva premium al completo
import FadeIn from "@/components/FadeIn";
import TextReveal from "@/components/TextReveal";
import GlowCard from "@/components/GlowCard";
import Magnetic from "@/components/Magnetic";
import HeroGlow from "@/components/HeroGlow"; // El nuevo escudo de luz atmosférica

async function getHomeData() {
  const query = `*[_type == "home"][0]{
    heroTitleEs, heroSubtitleEs, heroTitleEn, heroSubtitleEn,
    servicesTitleEs, servicesSubtitleEs, servicesTitleEn, servicesSubtitleEn,
    servicesList[]{
      ...,
      "imageUrl": image.asset->url
    },
    methodTitleEs, methodTitleEn, 
    methodList[]{
      ...,
    },
    projectsTitleEs, projectsSubtitleEs, projectsTitleEn, projectsSubtitleEn,
    projectsList[]{
      ...,
      "imageUrl": image.asset->url
    },
    trustTitleEs, trustSubtitleEs, trustTitleEn, trustSubtitleEn, trustList,
    ctaTitleEs, ctaSubtitleEs, ctaTitleEn, ctaSubtitleEn
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

export default async function HomePage({ params }) {
  const { locale } = await params;
  const data = await getHomeData();

  // --- CONTENIDOS DE RESPALDO MULTILINGÜES ---
  const hTitle = locale === "en" ? (data?.heroTitleEn || "Web design and visual identity for businesses that want to look clear, professional, and ready to grow.") : (data?.heroTitleEs || "Diseño web e identidad visual para negocios que quieren verse claros, profesionales y listos para crecer.");
  const hSub = locale === "en" ? (data?.heroSubtitleEn || "At Okrices Studio, we combine branding, web development, and strategy to build a digital presence that inspires **trust** and attracts clients.") : (data?.heroSubtitleEs || "En Okrices Studio unimos branding, desarrollo web y estrategia para crear una presencia digital que transmita **confianza** y atraiga clientes.");
  const sTitle = locale === "en" ? (data?.servicesTitleEn || "Services designed to **communicate value** and turn visits into clients.") : (data?.servicesTitleEs || "Servicios pensados para comunicar **valor** y convertir visitas en clientes.");
  const sSub = locale === "en" ? (data?.servicesSubtitleEn || "We believe a brand shouldn't shout to be heard, but project quality.") : (data?.servicesSubtitleEs || "Creemos que una marca no debe gritar para ser escuchada, sino proyectar la esencia de un trabajo que habla por sí solo.");
  const services = data?.servicesList || [];
  const mTitle = locale === "en" ? (data?.methodTitleEn || "A **clear process** that helps you move forward with confidence.") : (data?.methodTitleEs || "Un proceso **claro** para avanzar con seguridad.");
  const methods = data?.methodList || [];
  const pTitle = locale === "en" ? (data?.projectsTitleEn || "Selected **projects**") : (data?.projectsTitleEs || "Proyectos **seleccionados**");
  const pSub = locale === "en" ? (data?.projectsSubtitleEn || "Each project reflects a mix of strategy, design, and functionality.") : (data?.projectsSubtitleEs || "Cada proyecto refleja una combinación de estrategia, diseño y funcionalidad.");
  const projects = data?.projectsList || [];
  const tTitle = locale === "en" ? (data?.trustTitleEn || "Trust that **shows** in every detail.") : (data?.trustTitleEs || "Confianza que se **nota** en cada detalle.");
  const tSub = locale === "en" ? (data?.trustSubtitleEn || "We work with a professional approach, clear communication, and careful execution.") : (data?.trustSubtitleEs || "Trabajamos con enfoque profesional, comunicación clara y una entrega cuidada.");
  const trusts = data?.trustList || [];
  const cTitle = locale === "en" ? (data?.ctaTitleEn || "Ready to **improve** your digital presence?") : (data?.ctaTitleEs || "¿Listo para **mejorar** tu presencia digital?");
  const cSub = locale === "en" ? (data?.ctaSubtitleEn || "If your business needs a clearer, more professional image aligned with its real value, we can help build it.") : (data?.ctaSubtitleEs || "Si tu negocio necesita una imagen más clara, profesional y alineada con su valor real, podemos ayudarte a construirla.");

  return (
    <main className="studio-main-container">
      
      {/* SECCIÓN 1: HERO ENVOLVIMIENTO CON RESPLANDOR ATMOSFÉRICO */}
      <HeroGlow>
        <Section className="flex flex-col items-start justify-center min-h-[95vh] gap-12 pt-40 pb-20">
          <div className="max-w-5xl space-y-8">
            <TextReveal 
              text={hTitle} 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-semibold tracking-[-0.03em] leading-[1.05] text-white" 
            />
            <FadeIn delay={0.5} direction="up">
              <Text className="max-w-2xl text-base md:text-lg text-white/60 font-light leading-relaxed tracking-wide">
                {renderHighlightedText(hSub)}
              </Text>
            </FadeIn>
          </div>
          
          <FadeIn delay={0.7} direction="up" className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
            <Magnetic>
              <Button variant="primary" className="w-full sm:w-auto rounded-xl uppercase tracking-[0.2em] text-xs px-10 py-4 font-medium block">
                {locale === "en" ? "Schedule a call" : "Agendar llamada"}
              </Button>
            </Magnetic>
            <Magnetic>
              <Button variant="secondary" className="w-full sm:w-auto rounded-xl uppercase tracking-[0.2em] text-xs px-10 py-4 font-medium border-white/20 text-white/80 block hover:text-white hover:border-white">
                {locale === "en" ? "View projects" : "Ver proyectos"}
              </Button>
            </Magnetic>
          </FadeIn>
        </Section>
      </HeroGlow>

      {/* SECCIÓN 2: SERVICIOS */}
      <Section className="studio-section-divider">
        <FadeIn direction="up" className="max-w-3xl space-y-4 mb-20">
          <Heading level={2} className="text-3xl md:text-5xl tracking-tight font-sans font-medium">{renderHighlightedText(sTitle)}</Heading>
          <Text className="text-white/50 font-light">{renderHighlightedText(sSub)}</Text>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {services.map((item, index) => {
            const isFeatured = item.featured;
            return (
              <FadeIn 
                key={index} 
                delay={index * 0.1} 
                direction="up"
                className={isFeatured ? "md:col-span-2" : "md:col-span-1"}
              >
                <GlowCard className="min-h-[440px]">
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-studio-copper font-semibold font-sans block">
                      {locale === "en" ? "Capabilities" : "Capacidad"}
                    </span>
                    <Heading level={3} className="text-2xl font-sans tracking-tight font-medium text-white group-hover:text-studio-copper transition-colors">
                      {locale === "en" ? item.titleEn : item.titleEs}
                    </Heading>
                    <p className="font-sans font-light text-sm md:text-base text-white/50 leading-relaxed max-w-xl">
                      {renderHighlightedText(locale === "en" ? item.descriptionEn : item.descriptionEs)}
                    </p>
                  </div>

                  {item.imageUrl && (
                    <div className="studio-media-window aspect-[16/9] md:aspect-[21/9] mt-6">
                      <img 
                        src={item.imageUrl} 
                        alt={item.titleEs} 
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                </GlowCard>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* SECCIÓN 3: MÉTODO DE TRABAJO */}
      <Section className="studio-section-divider">
        <FadeIn direction="up" className="max-w-3xl mb-24">
          <Heading level={2} className="text-3xl md:text-5xl tracking-tight font-sans font-medium">{renderHighlightedText(mTitle)}</Heading>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 w-full">
          {methods.map((item, index) => (
            <FadeIn key={index} delay={index * 0.1} direction="up" className="space-y-4 relative pt-12 border-t border-white/5">
              <div className="text-[6rem] md:text-[8rem] font-sans font-black text-white/[0.02] tracking-tighter absolute -top-10 -left-2 select-none leading-none pointer-events-none">
                {item.stepNumber || `0${index + 1}`}
              </div>
              <Heading level={3} className="text-lg font-sans font-medium text-white/90 tracking-tight z-10 relative">
                {locale === "en" ? item.titleEn : item.titleEs}
              </Heading>
              <p className="font-sans font-light text-sm text-white/40 leading-relaxed max-w-xs z-10 relative">
                {locale === "en" ? item.descriptionEn : item.descriptionEs}
              </p>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* SECCIÓN 4: PROYECTOS SELECCIONADOS */}
      <Section className="studio-section-divider">
        <FadeIn direction="up" className="max-w-3xl space-y-4 mb-20">
          <Heading level={2} className="text-3xl md:text-5xl tracking-tight font-sans font-medium">{renderHighlightedText(pTitle)}</Heading>
          <Text className="text-white/50 font-light">{renderHighlightedText(pSub)}</Text>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mb-16">
          {projects.map((item, index) => {
            const isWide = item.layoutSize === 'wide';
            return (
              <FadeIn 
                key={index} 
                delay={index * 0.15} 
                direction="up" 
                className={isWide ? "md:col-span-2" : "md:col-span-1"}
              >
                <div className="group space-y-6 cursor-pointer">
                  {item.imageUrl ? (
                    <div className="studio-media-window aspect-[16/10] md:aspect-[16/10] rounded-2xl">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-[1s] ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-[16/10] bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.05] rounded-2xl flex items-center justify-center">
                      <span className="text-xs uppercase tracking-[0.2em] text-white/20 font-sans">Visual Media Missing</span>
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between border-b border-white/5 pb-4">
                    <div className="space-y-1">
                      <Heading level={3} className="text-xl font-sans font-medium text-white">{item.name}</Heading>
                      <p className="font-sans font-light text-sm text-white/40 italic">
                        "{locale === "en" ? item.phraseEn : item.phraseEs}"
                      </p>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-studio-copper font-medium bg-studio-copper/10 px-3 py-1 rounded-full font-sans">
                      {locale === "en" ? item.tagEn : item.tagEs}
                    </span>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
        
        <FadeIn delay={0.2} direction="up" className="w-full flex justify-start">
          <Magnetic>
            <Button variant="secondary" className="rounded-xl uppercase tracking-[0.2em] text-xs px-10 py-4 font-medium border-white/20 text-white/80 block hover:text-white hover:border-white">
              {locale === "en" ? "View all projects" : "Ver todos los proyectos"}
            </Button>
          </Magnetic>
        </FadeIn>
      </Section>

      {/* SECCIÓN 5: TESTIMONIOS */}
      <Section className="studio-section-divider">
        <FadeIn direction="up" className="max-w-3xl space-y-4 mb-20">
          <Heading level={2} className="text-3xl md:text-5xl tracking-tight font-sans font-medium">{renderHighlightedText(tTitle)}</Heading>
          <Text className="text-white/50 font-light">{renderHighlightedText(tSub)}</Text>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {trusts.map((item, index) => (
            <FadeIn key={index} delay={index * 0.15} direction="up">
              <GlowCard className="min-h-[220px]">
                <p className="font-sans font-light text-base md:text-lg text-white/70 leading-relaxed italic">
                  {renderHighlightedText(locale === "en" ? item.quoteEn : item.quoteEs)}
                </p>
                {item.label && (
                  <span className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-medium font-sans block mt-6 border-t border-white/5 pt-4">
                    — {item.label}
                  </span>
                )}
              </GlowCard>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* SECCIÓN 6: CTA FINAL */}
      <Section className="studio-section-divider bg-gradient-to-t from-black/30 to-transparent py-32 md:py-40">
        <div className="max-w-4xl space-y-8 mb-12">
          <Heading level={2} className="text-4xl md:text-6xl tracking-tighter font-sans font-medium">{renderHighlightedText(cTitle)}</Heading>
          <Text className="max-w-2xl text-base md:text-lg text-white/50 font-light leading-relaxed">{renderHighlightedText(cSub)}</Text>
        </div>
        <FadeIn delay={0.2} direction="up">
          <Magnetic>
            <Button variant="primary" className="rounded-xl uppercase tracking-[0.2em] text-xs px-12 py-5 font-semibold block transition-transform duration-300 hover:scale-[1.02]">
              {locale === "en" ? "Schedule a call" : "Agendar llamada"}
            </Button>
          </Magnetic>
        </FadeIn>
      </Section>

    </main>
  );
}