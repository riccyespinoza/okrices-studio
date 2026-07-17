import React from "react";
import { client } from "@/sanity/lib/client";
import Section from "@/components/Section";
import { Heading, Text } from "@/components/Typography";
import FadeIn from "@/components/FadeIn";
import TextReveal from "@/components/TextReveal";
import GlowCard from "@/components/GlowCard";
import ContactForm from "@/components/ContactForm";

async function getContactPageData() {
  const query = `*[_type == "contactPage"][0]{
    heroTitleEs, heroSubtitleEs, heroTitleEn, heroSubtitleEn,
    formTitleEs, formHelperEs, responseTitleEs, responseTextEs,
    formTitleEn, formHelperEn, responseTitleEn, responseTextEn,
    directTitleEs, directTextEs, directTitleEn, directTextEn,
    filterTitleEs, filterTextEs, filterTitleEn, filterTextEn,
    ctaTitleEs, ctaBtnEs, ctaTitleEn, ctaBtnEn
  }`;
  return await client.fetch(query);
}

function renderHighlightedText(rawText) {
  if (!rawText) return "";
  const parts = rawText.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, index) => 
    index % 2 === 1 
      ? <span key={index} className="text-studio-copper font-medium">{part}</span> 
      : part
  );
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const data = await getContactPageData();

  if (!data) return <main className="min-h-screen bg-studio-blue" />;

  const isEn = locale === "en";

  return (
    <main className="studio-main-container">
      
      {/* SECCIÓN ÚNICA EN DOS COLUMNAS MAXIMALISTA Y LIMPIA */}
      <Section className="pt-36 lg:pt-44 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* COLUMNA IZQUIERDA (40% - lg:col-span-5): Título Principal e Ítems de Contacto */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* Bloque Hero: Título y Subtítulo principal */}
            <div className="space-y-6">
              <TextReveal 
                text={isEn ? data.heroTitleEn : data.heroTitleEs} 
                className="text-hero font-sans font-semibold tracking-[-0.03em] leading-[1.05] text-studio-white" 
              />
              <FadeIn delay={0.2} direction="up">
                <Text className="text-hero-subtitle font-light leading-relaxed tracking-wide text-studio-white/80">
                  {renderHighlightedText(isEn ? data.heroSubtitleEn : data.heroSubtitleEs)}
                </Text>
              </FadeIn>
            </div>

            {/* Lista de Canales de Contacto Directo (Fluido sin bordes ni títulos secundarios) */}
            <FadeIn direction="up" delay={0.3}>
              <div className="space-y-6">
                
                {/* Email */}
                <div className="flex items-center gap-5 group">
                  <div className="w-11 h-11 rounded-full border border-studio-white/10 flex items-center justify-center text-studio-copper bg-studio-white/[0.02] transition-colors duration-300 group-hover:border-studio-copper/30">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-studio-white/40 font-light text-micro uppercase tracking-widest">{isEn ? "Email Us" : "Escríbenos"}</h4>
                    <a href="mailto:hello@okrices.com" className="text-support text-studio-white font-medium tracking-wide mt-0.5 block transition-colors duration-300 hover:text-studio-copper">
                      hello@okrices.com
                    </a>
                  </div>
                </div>

                {/* Calendly */}
                <div className="flex items-center gap-5 group">
                  <div className="w-11 h-11 rounded-full border border-studio-white/10 flex items-center justify-center text-studio-copper bg-studio-white/[0.02] transition-colors duration-300 group-hover:border-studio-copper/30">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-studio-white/40 font-light text-micro uppercase tracking-widest">{isEn ? "Digital Meeting" : "Cita Digital"}</h4>
                    <span className="text-support text-studio-white font-medium tracking-wide mt-0.5 block transition-colors duration-300 group-hover:text-studio-copper cursor-pointer">
                      {isEn ? "Schedule a Call via Calendly" : "Agendar Llamada vía Calendly"}
                    </span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center gap-5 group">
                  <div className="w-11 h-11 rounded-full border border-studio-white/10 flex items-center justify-center text-studio-copper bg-studio-white/[0.02] transition-colors duration-300 group-hover:border-studio-copper/30">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-studio-white/40 font-light text-micro uppercase tracking-widest">WhatsApp</h4>
                    <span className="text-support text-studio-white font-medium tracking-wide mt-0.5 block transition-colors duration-300 group-hover:text-studio-copper cursor-pointer">
                      {isEn ? "Direct Instant Message" : "Mensaje directo inmediato"}
                    </span>
                  </div>
                </div>

              </div>
            </FadeIn>
          </div>

          {/* COLUMNA DERECHA (60% - lg:col-span-7): Formulario de Contacto Desnudo */}
          <div className="lg:col-span-7 space-y-8">
            <FadeIn direction="up" delay={0.1}>
              <GlowCard className="p-8 md:p-12">
                {/* Formulario puro sin títulos internos */}
                <ContactForm locale={locale} ctaBtnText={isEn ? data.ctaBtnEn : data.ctaBtnEs} />
              </GlowCard>
            </FadeIn>

            
          </div>

        </div>
      </Section>

    </main>
  );
}