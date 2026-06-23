import React from "react";
import Section from "@/components/Section";
import { Heading, Text } from "@/components/Typography";
import Button from "@/components/Button";

export default function HomePage() {
  return (
    // Fondo adaptado al degradado de tus carruseles de identidad
    <main className="min-h-screen bg-gradient-to-br from-studio-blue via-[#0F181E] to-[#141D24] text-white">
      
      {/* Estructura limpia para el bloque Hero */}
      <Section className="flex flex-col items-start justify-center min-h-[80vh] gap-8">
        <div className="max-w-4xl space-y-6">
          {/* Título adaptativo e imponente de la marca */}
          <Heading level={1}>
            Tu marca te cuesta clientes antes del primer contacto
          </Heading>
          
          {/* Subtítulo elegante y con aire */}
          <Text className="max-w-2xl">
            Si no transmite <span className="text-studio-copper font-medium">seguridad</span> de inmediato, la <span className="text-studio-copper font-medium">oportunidad se desvanece</span> antes de empezar.
          </Text>
        </div>

        {/* Acciones interactivas fluidas */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Button variant="primary" className="w-full sm:w-auto">
            Hablemos
          </Button>
          <Button variant="secondary" className="w-full sm:w-auto">
            Ver Portafolio
          </Button>
        </div>
      </Section>

    </main>
  );
}