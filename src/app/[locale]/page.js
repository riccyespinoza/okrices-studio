import React from "react";
import { client } from "@/sanity/lib/client";
import Section from "@/components/Section";
import { Heading, Text } from "@/components/Typography";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import TextReveal from "@/components/TextReveal";
import GlowCard from "@/components/GlowCard";
import Magnetic from "@/components/Magnetic";
import HeroGlow from "@/components/FluidHero";
import CtaCard from "@/components/CtaCard";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import LocalizedLink from "@/components/LocalizedLink"; // Asegúrate de que esta ruta sea correcta
import * as motion from "framer-motion/client";

async function getHomeData() {
  const query = `*[_type == "home"][0]{
    heroTitleEs, heroSubtitleEs, heroBtnMainEs, heroBtnSecEs, heroBtnMainLink, heroBtnSecLink,
    heroTitleEn, heroSubtitleEn, heroBtnMainEn, heroBtnSecEn,
    clientLogos[]{ "imageUrl": logo.asset->url, altText },
    servicesTitleEs, servicesSubtitleEs, servicesTitleEn, servicesSubtitleEn,
    servicesList[]{ ..., "iconUrl": iconSvg.asset->url },
    methodTitleEs, methodSubtitleEs, methodTitleEn, methodSubtitleEn, methodList[]{ ... },
    projectsTitleEs, projectsSubtitleEs, projectsTitleEn, projectsSubtitleEn, projectsBtnEs, projectsBtnEn, projectsBtnLink,
    projectsList[]{ ..., "imageUrl": image.asset->url },
    trustTitleEs, trustSubtitleEs, trustTitleEn, trustSubtitleEn, trustList,
    ctaTitleEs, ctaSubtitleEs, ctaBtnEs, ctaBtnLink, ctaTitleEn, ctaSubtitleEn, ctaBtnEn
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

  // 1. TEXTOS HERO Y BOTONES
  const hTitle = locale === "en" ? (data?.heroTitleEn || "Web design and visual identity for businesses that want to look clear, professional, and ready to grow.") : (data?.heroTitleEs || "Diseño web e identidad visual para negocios que quieren verse claros, profesionales y listos para crecer.");
  const hSub = locale === "en" ? (data?.heroSubtitleEn || "At Okrices Studio, we combine branding, web development, and strategy to build a digital presence that inspires **trust** and attracts clients.") : (data?.heroSubtitleEs || "En Okrices Studio unimos branding, desarrollo web y estrategia para crear una presencia digital que transmita **confianza** y atraiga clientes.");
  const hBtnMain = locale === "en" ? (data?.heroBtnMainEn || "Schedule a call") : (data?.heroBtnMainEs || "Agendar llamada");
  const hBtnSec = locale === "en" ? (data?.heroBtnSecEn || "View projects") : (data?.heroBtnSecEs || "Ver proyectos");

  // 2. SECCIÓN SERVICIOS
  const sTitle = locale === "en" ? (data?.servicesTitleEn || "Services designed to **communicate value** and turn visits into clients.") : (data?.servicesTitleEs || "Servicios pensados para comunicar **valor** y convertir visitas en clientes.");
  const sSub = locale === "en" ? (data?.servicesSubtitleEn || "We believe a brand shouldn't shout to be heard, but project quality.") : (data?.servicesSubtitleEs || "Creemos que una marca no debe gritar para ser escuchada, sino proyectar la esencia de un trabajo que habla por sí solo.");
  const services = data?.servicesList || [];

  // 3. SECCIÓN MÉTODO
  const mTitle = locale === "en" ? (data?.methodTitleEn || "A **clear process** that helps you move forward with confidence.") : (data?.methodTitleEs || "Un proceso **claro** para avanzar con seguridad.");
  const mSub = locale === "en" ? (data?.methodSubtitleEn || "We break down complexity into simple, structured, and predictable milestones.") : (data?.methodSubtitleEs || "Dividimos la complejidad en hitos simples, estructurados y completamente predecibles.");
  const methods = data?.methodList || [];

  // 4. SECCIÓN PROYECTOS
  const pTitle = locale === "en" ? (data?.projectsTitleEn || "Selected **projects**") : (data?.projectsTitleEs || "Proyectos **seleccionados**");
  const pSub = locale === "en" ? (data?.projectsSubtitleEn || "Each project reflects a mix of strategy, design, and functionality.") : (data?.projectsSubtitleEs || "Cada proyecto refleja una combinación de estrategia, diseño y funcionalidad.");
  const pBtnAll = locale === "en" ? (data?.projectsBtnEn || "View all projects") : (data?.projectsBtnEs || "Ver todos los proyectos");
  const projects = data?.projectsList || [];

  // 5. SECCIÓN CONFIANZA
  const tTitle = locale === "en" ? (data?.trustTitleEn || "Trust that **shows** in every detail.") : (data?.trustTitleEs || "Confianza que se **nota** en cada detalle.");
  const tSub = locale === "en" ? (data?.trustSubtitleEn || "We work with a professional approach, clear communication, and careful execution.") : (data?.trustSubtitleEs || "Trabajamos con enfoque profesional, comunicación clara y una entrega cuidada.");
  const trusts = data?.trustList || [];

  // 6. SECCIÓN CTA FINAL
  const cTitle = locale === "en" ? (data?.ctaTitleEn || "Ready to **improve** your digital presence?") : (data?.ctaTitleEs || "¿Listo para **mejorar** tu presencia digital?");
  const cSub = locale === "en" ? (data?.ctaSubtitleEn || "If your business needs a clearer, more professional image aligned with its real value, we can help build it.") : (data?.ctaSubtitleEs || "Si tu negocio necesita una imagen más clara, profesional y alineada con su valor real, podemos ayudarte a construirla.");
  const cBtnFinal = locale === "en" ? (data?.ctaBtnEn || "Schedule a call") : (data?.ctaBtnEs || "Agendar llamada");

  return (
    <main className="studio-main-container">
      {/* SECCIÓN 1: HERO */}
      <HeroGlow>
        <Section className="flex flex-col items-start justify-center min-h-[95vh] gap-12 pt-32 pb-20">
          <div className="max-w-5xl space-y-8">
            <TextReveal text={hTitle} className="text-hero font-sans font-semibold tracking-[-0.03em] leading-none text-white" />
            <div className="max-w-2xl text-hero-subtitle text-white font-light leading-relaxed tracking-wide">
              {renderHighlightedText(hSub)}
            </div>
          </div>
          <FadeIn delay={0.7} direction="up" className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
            <LocalizedLink href={data.heroBtnMainLink || "/"}>
              <Magnetic>
                <Button variant="primary" className="studio-button text-button w-full sm:w-auto">
                  {hBtnMain}
                </Button>
              </Magnetic>
            </LocalizedLink>
            <LocalizedLink href={data.heroBtnSecLink || "/"}>
              <Magnetic>
                <Button variant="secondary" className="studio-button text-button w-full sm:w-auto border border-white/20 text-white/80 hover:text-white hover:border-white">
                  {hBtnSec}
                </Button>
              </Magnetic>
            </LocalizedLink>
          </FadeIn>
        </Section>
      </HeroGlow>

      {/* SECCIÓN 2: SERVICIOS */}
      <Section className="studio-section-divider">
        <FadeIn direction="up" className="max-w-3xl space-y-4 mb-20">
          <Heading level={2} className="text-studio-copper">
            {renderHighlightedText(sTitle)}
          </Heading>
          <Text className="text-white font-light text-subtitle leading-illustrator">
            {renderHighlightedText(sSub)}
          </Text>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {services.map((item, index) => (
            <FadeIn key={index} delay={index * 0.1} direction="up" className="col-span-1 h-full">
              <GlowCard className="min-h-[440px] h-full">
                <div className="flex flex-col h-full items-start p-1">
                  {item.iconUrl ? (
                    <div 
                      className="w-[64px] h-[64px] md:w-[90px] md:h-[90px] bg-studio-icon-gradient mb-6 transition-transform duration-500 group-hover:scale-105 select-none flex-shrink-0"
                      style={{
                        maskImage: `url(${item.iconUrl})`,
                        maskSize: "contain",
                        maskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskImage: `url(${item.iconUrl})`,
                        WebkitMaskSize: "contain",
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskPosition: "center"
                      }}
                    />
                  ) : (
                    <div className="w-[64px] h-[64px] md:w-[90px] md:h-[90px] border border-white/5 bg-white/[0.02] rounded-xl flex items-center justify-center mb-6 flex-shrink-0">
                      <span className="text-[9px] uppercase tracking-widest text-white/20">Empty</span>
                    </div>
                  )}

                  <div className="w-full h-[3.5rem] md:h-[6.5rem] mb-6 flex items-start flex-shrink-0">
                    <Heading level={3} className="text-white group-hover:text-studio-copper transition-colors leading-tight">
                      {locale === "en" ? item.titleEn : item.titleEs}
                    </Heading>
                  </div>
                  
                  <p className="font-sans font-light text-body-large text-studio-card-text text-left flex-grow">
                    {renderHighlightedText(locale === "en" ? item.descriptionEn : item.descriptionEs)}
                  </p>
                  
                  <div className="pt-8 mt-auto w-full flex justify-start flex-shrink-0">
                    <LocalizedLink href={item.ctaLink || "/"}>
                      <Button variant="primary" className="w-full sm:w-auto text-button font-medium">
                        {locale === "en" ? (item.ctaEn || "View Service") : (item.ctaEs || "Ver servicio")}
                      </Button>
                    </LocalizedLink>
                  </div>
                </div>
              </GlowCard>
            </FadeIn>
          ))}
        </div>
      </Section>
      
      {/* SECCIÓN 3: PROCESO */}
      <Section className="studio-section-divider">
        <FadeIn direction="up" className="max-w-3xl space-y-4 mb-20">
          <Heading level={2} className="text-studio-copper">
            {renderHighlightedText(mTitle)}
          </Heading>
          <Text className="text-white font-light text-subtitle leading-illustrator">
            {renderHighlightedText(mSub)}
          </Text>
        </FadeIn>
        
        <div className="flex flex-col w-full">
          {methods.map((item, index) => (
            <FadeIn key={index} delay={index * 0.1} direction="up" className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-y-0 md:gap-x-8 items-center text-left py-5 md:py-7 border-b border-studio-card-text/30">
                <div className="md:col-span-2 text-section font-sans font-extrabold text-studio-copper leading-none select-none pointer-events-none">
                  {item.stepNumber || `0${index + 1}`}
                </div>
                <div className="md:col-span-4">
                  <Heading level={3} className="text-white">
                    {locale === "en" ? item.titleEn : item.titleEs}
                  </Heading>
                </div>
                <div className="md:col-span-6">
                  <p className="font-sans font-light text-body-large text-studio-card-text leading-illustrator text-left">
                    {locale === "en" ? item.descriptionEn : item.descriptionEs}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* SECCIÓN 4: PROYECTOS */}
      <Section className="studio-section-divider">
        <FadeIn direction="up" className="max-w-3xl space-y-4 mb-20">
          <Heading level={2} className="text-studio-copper">
            {renderHighlightedText(pTitle)}
          </Heading>
           
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mb-16">
          {projects.map((item, index) => (
            <FadeIn 
              key={index} 
              delay={index * 0.15} 
              direction="up" 
              className={item.layoutSize === 'wide' ? "md:col-span-2" : "md:col-span-1"}
            >
              <motion.div 
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
                className="group space-y-6 cursor-pointer"
              >
                {item.imageUrl ? (
                  <div className="studio-media-window aspect-[4/3] rounded-2xl overflow-hidden">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.035]" />
                  </div>
                ) : (
                  <div className="w-full aspect-[4/3] bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.05] rounded-2xl flex items-center justify-center">
                    <span className="text-micro uppercase tracking-[0.2em] text-white/20 font-sans">Visual Media Missing</span>
                  </div>
                )}
                <div className="flex items-start justify-between pt-2">
                  <div className="space-y-2 max-w-[80%] text-left">
                    <Heading level={3} className="text-white group-hover:text-studio-copper transition-colors">
                      {item.name}
                    </Heading>
                    <p className="font-sans font-light text-body-large leading-illustrator text-studio-card-text">
                      "{locale === "en" ? item.phraseEn : item.phraseEs}"
                    </p>
                  </div>
                  <span className="text-micro uppercase tracking-widest text-studio-copper font-medium bg-studio-copper/10 px-3 py-1 rounded-full font-sans whitespace-nowrap">
                    {locale === "en" ? item.tagEn : item.tagEs}
                  </span>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} direction="up" className="w-full flex justify-center">
          <LocalizedLink href={data.projectsBtnLink || "/"}>
            <Magnetic>
              <Button variant="secondary" className="studio-button text-button border border-white/20 text-white/80 hover:text-white hover:border-white">
                {pBtnAll}
              </Button>
            </Magnetic>
          </LocalizedLink>
        </FadeIn>
      </Section>

      {/* SECCIÓN 5: TESTIMONIOS */}
      <Section className="studio-section-divider overflow-hidden">
        <FadeIn direction="up" className="max-w-3xl space-y-4 mb-20">
          <Heading level={2} className="text-studio-copper">
            {renderHighlightedText(tTitle)}
          </Heading>
          <Text className="text-white font-light text-subtitle leading-illustrator">
            {renderHighlightedText(tSub)}
          </Text>
        </FadeIn>
        <TestimonialsSlider trusts={trusts} locale={locale} />
      </Section>

      {/* SECCIÓN 6: CTA CARD PRINCIPAL (COBRE) */}
      <Section className="py-24 md:py-32">
        <CtaCard variant="primary">
          <div className="max-w-4xl space-y-8">
            <Heading level={2} className="text-studio-white">
              {renderHighlightedText(cTitle)}
            </Heading>
            {cSub && (
              <Text className="max-w-3xl text-subtitle font-light leading-illustrator tracking-wide text-studio-cta-sub">
                {renderHighlightedText(cSub)}
              </Text>
            )}
            <div className="flex w-full justify-start pt-4 sm:w-auto">
              <LocalizedLink href={data.ctaBtnLink || "/"}>
                <Magnetic>
                  <Button variant="tertiary" className="studio-button text-button">
                    {cBtnFinal}
                  </Button>
                </Magnetic>
              </LocalizedLink>
            </div>
          </div>
        </CtaCard>
      </Section>
    </main>
  );
}