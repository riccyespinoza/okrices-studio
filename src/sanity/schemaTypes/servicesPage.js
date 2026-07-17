// Esquema bilingüe exclusivo para la Página de Servicios con Paquetes Anidados
export const servicesPageSchema = {
  name: 'servicesPage',
  title: 'Página de Servicios',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Identificador del Documento',
      type: 'string',
      description: 'Ejemplo: "Contenido de la Página de Servicios"',
    },

    // --- 1. HERO DE SERVICIOS ---
    { name: 'heroTitleEs', title: '1. Hero: Título H1 (Español)', type: 'string' },
    { name: 'heroSubtitleEs', title: '1. Hero: Subtítulo (Español)', type: 'text' },
    { name: 'heroBtnMainEs', title: '1. Hero: Botón Principal (Español)', type: 'string' },
    { name: 'heroBtnSecEs', title: '1. Hero: Botón Secundario (Español)', type: 'string' },
    
    { name: 'heroTitleEn', title: '1. Hero: Título H1 (Inglés)', type: 'string' },
    { name: 'heroSubtitleEn', title: '1. Hero: Subtítulo (Inglés)', type: 'text' },
    { name: 'heroBtnMainEn', title: '1. Hero: Botón Principal (Inglés)', type: 'string' },
    { name: 'heroBtnSecEn', title: '1. Hero: Botón Secundario (Inglés)', type: 'string' },

    { name: 'heroBtnMainLink', title: '1. Hero: Enlace Botón Principal', type: 'string' },
{ name: 'heroBtnSecLink', title: '1. Hero: Enlace Botón Secundario', type: 'string' },

    // --- 2. LISTA PRINCIPAL DE SERVICIOS CON PAQUETES ANIDADOS ---
    {
      name: 'servicesList',
      title: '2. Bloques de Servicios Individuales',
      type: 'array',
      description: 'Agrega aquí de forma ordenada los servicios (Branding, Desarrollo Web, E-commerce, Booking)',
      of: [
        {
          type: 'object',
          title: 'Bloque de Servicio',
          fields: [
            { name: 'titleEs', title: 'Título del Servicio (Español)', type: 'string' },
            { name: 'textEs', title: 'Descripción del Servicio (Español)', type: 'text' },
            {
              name: 'includedEs',
              title: 'Servicios Incluidos / Viñetas Generales (Español)',
              type: 'array',
              of: [{ type: 'string' }]
            },
            { name: 'ctaEs', title: 'Texto del Botón CTA Principal (Español)', type: 'string' },

            { name: 'titleEn', title: 'Título del Servicio (Inglés)', type: 'string' },
            { name: 'textEn', title: 'Descripción del Servicio (Inglés)', type: 'text' },
            {
              name: 'includedEn',
              title: 'Servicios Incluidos / Viñetas Generales (Inglés)',
              type: 'array',
              of: [{ type: 'string' }]
            },
            { name: 'ctaEn', title: 'Texto del Botón CTA Principal (Inglés)', type: 'string' },

            {
              name: 'image',
              title: 'Imagen / Mockup Elegante',
              type: 'image',
              options: { hotspot: true }
            },
            { name: 'sectionCtaLink', title: 'CTA Sección: Enlace del Botón', type: 'string' },

            // --- SUB-SECCIÓN: PAQUETES DEL SERVICIO ---
            {
              name: 'packages',
              title: 'Paquetes específicos de este Servicio',
              type: 'array',
              of: [
                {
                  type: 'object',
                  title: 'Tarjeta de Paquete',
                  fields: [
                    { name: 'titleEs', title: 'Nombre del Paquete (Español)', type: 'string' },
                    { name: 'textEs', title: 'Descripción / Ideal para... (Español)', type: 'text' },
                    { name: 'priceEs', title: 'Precio (Español) - Ej: "Desde $300 USD"', type: 'string' },
                    { name: 'deliveryEs', title: 'Tiempo de Entrega (Español) - Ej: "7–10 días hábiles"', type: 'string' },
                    {
                      name: 'detailsEs',
                      title: 'Entregables incluidos (Español)',
                      type: 'array',
                      of: [{ type: 'string' }]
                    },
                    { name: 'ctaEs', title: 'Texto del Botón (Español)', type: 'string' },

                    { name: 'titleEn', title: 'Nombre del Paquete (Inglés)', type: 'string' },
                    { name: 'textEn', title: 'Descripción / Ideal para... (Inglés)', type: 'text' },
                    { name: 'priceEn', title: 'Precio (Inglés) - Ej: "From $300 USD"', type: 'string' },
                    { name: 'deliveryEn', title: 'Tiempo de Entrega (Inglés) - Ej: "7–10 business days"', type: 'string' },
                    {
                      name: 'detailsEn',
                      title: 'Entregables incluidos (Inglés)',
                      type: 'array',
                      of: [{ type: 'string' }]
                    },
                    { name: 'ctaEn', title: 'Texto del Botón (Inglés)', type: 'string' },

                    {
                      name: 'featured',
                      title: '¿Destacar paquete?',
                      type: 'boolean',
                      initialValue: false
                    },
                    { name: 'ctaLink', title: 'Enlace del Botón (Paquete)', type: 'string' },
                  ]
                }
              ]
            },

            // --- SUB-SECCIÓN: CTA SECUNDARIO DE SECCIÓN ---
            { name: 'sectionCtaTitleEs', title: 'CTA Sección: Título (Español) - Ej: "¿No sabes cuál elegir?"', type: 'string' },
            { name: 'sectionCtaTextEs', title: 'CTA Sección: Texto (Español)', type: 'text' },
            { name: 'sectionCtaBtnEs', title: 'CTA Sección: Texto Botón (Español) - Ej: "Agendar llamada"', type: 'string' },

            { name: 'sectionCtaTitleEn', title: 'CTA Sección: Título (Inglés)', type: 'string' },
            { name: 'sectionCtaTextEn', title: 'CTA Sección: Texto (Inglés)', type: 'text' },
            { name: 'sectionCtaBtnEn', title: 'CTA Sección: Texto Botón (Inglés)', type: 'string' },

            { name: 'ctaBtnLink', title: '3. CTA seccion: Enlace del Botón', type: 'string' }
          ]
        }
      ]
    },

    // --- 3. CTA FINAL DE LA PÁGINA ---
    { name: 'ctaTitleEs', title: '3. CTA Final: Título (Español)', type: 'string' },
    { name: 'ctaSubtitleEs', title: '3. CTA Final: Texto (Español)', type: 'text' },
    { name: 'ctaBtnEs', title: '3. CTA Final: Texto del Botón (Español)', type: 'string' },

    { name: 'ctaTitleEn', title: '3. CTA Final: Título (Inglés)', type: 'string' },
    { name: 'ctaSubtitleEn', title: '3. CTA Final: Texto (Inglés)', type: 'text' },
    { name: 'ctaBtnEn', title: '3. CTA Final: Texto del Botón (Inglés)', type: 'string' },

    { name: 'ctaBtnLink', title: '3. CTA Final: Enlace del Botón', type: 'string' }
  ]
};