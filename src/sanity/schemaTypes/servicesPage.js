// Esquema bilingüe unificado para la Página de Servicios
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

    // --- 2. BLOQUES DE SERVICIOS INDIVIDUALES ---
    {
      name: 'servicesList',
      title: '2. Bloques de Servicios Individuales',
      type: 'array',
      description: 'Agrega de forma ordenada los servicios (Branding, Desarrollo Web, Sistemas y Automatización)',
      of: [
        {
          type: 'object',
          title: 'Bloque de Servicio',
          fields: [
            // --- DATOS BÁSICOS ---
            { name: 'titleEs', title: 'Título del Servicio (Español)', type: 'string' },
            { name: 'subtitleEs', title: 'Subtítulo / Descripción (Español)', type: 'text' },

            { name: 'titleEn', title: 'Título del Servicio (Inglés)', type: 'string' },
            { name: 'subtitleEn', title: 'Subtítulo / Descripción (Inglés)', type: 'text' },

            // --- LISTA 1: ESTE SERVICIO ES PARA TI SI... ---
            {
              name: 'forYouListEs',
              title: 'Este servicio es para ti si: (Español)',
              type: 'array',
              of: [{ type: 'string' }],
            },
            {
              name: 'forYouListEn',
              title: 'Este servicio es para ti si: (Inglés)',
              type: 'array',
              of: [{ type: 'string' }],
            },

            // --- LISTA 2: ENTREGABLES (TEXTO SIMPLE) ---
            {
              name: 'includesTitleEs',
              title: 'Título Entregables (Español) - Ej: "El proyecto puede incluir:"',
              type: 'string',
            },
            {
              name: 'includesTitleEn',
              title: 'Título Entregables (Inglés) - Ej: "Your project may include:"',
              type: 'string',
            },
            {
              name: 'includesListEs',
              title: 'Lista de Entregables (Texto simple - Español)',
              type: 'array',
              of: [{ type: 'string' }],
            },
            {
              name: 'includesListEn',
              title: 'Lista de Entregables (Texto simple - Inglés)',
              type: 'array',
              of: [{ type: 'string' }],
            },

            // --- LISTA 3: DESARROLLAMOS (ÍTEMS CON ÍCONO SVG INDIVIDUAL) ---
            {
              name: 'developTitleEs',
              title: 'Título Desarrollo (Español) - Ej: "Desarrollamos:" o "Podemos desarrollar:"',
              type: 'string',
            },
            {
              name: 'developTitleEn',
              title: 'Título Desarrollo (Inglés) - Ej: "We develop:" o "We can develop:"',
              type: 'string',
            },
            {
              name: 'developItems',
              title: 'Ítems de Desarrollo (Con Ícono SVG individual)',
              type: 'array',
              of: [
                {
                  type: 'object',
                  title: 'Solución a Desarrollar',
                  fields: [
                    {
                      name: 'iconSvg',
                      title: 'Ícono de la Solución (.svg)',
                      type: 'file',
                      options: { accept: '.svg' },
                    },
                    { name: 'textEs', title: 'Nombre de la Solución (Español)', type: 'string' },
                    { name: 'textEn', title: 'Nombre de la Solución (Inglés)', type: 'string' },
                  ],
                  preview: {
                    select: {
                      title: 'textEs',
                      subtitle: 'textEn',
                    },
                  },
                },
              ],
            },

            // --- NOTA ADICIONAL Y MEDIA OPCIONAL ---
            {
              name: 'extraNoteEs',
              title: 'Nota Adicional Transversal (Español) - Ej: "Todos nuestros sitios se diseñan..."',
              type: 'text',
            },
            {
              name: 'extraNoteEn',
              title: 'Nota Adicional Transversal (Inglés)',
              type: 'text',
            },
            {
              name: 'image',
              title: 'Imagen / Mockup Elegante (Opcional)',
              type: 'image',
              options: { hotspot: true },
            },

            // --- BOTÓN DE ACCIÓN ---
            { name: 'ctaTextEs', title: 'Texto del Botón CTA (Español)', type: 'string' },
            { name: 'ctaTextEn', title: 'Texto del Botón CTA (Inglés)', type: 'string' },
            { name: 'ctaLink', title: 'Enlace del Botón CTA del Servicio', type: 'string' },
          ],
          preview: {
            select: {
              title: 'titleEs',
              subtitle: 'subtitleEs',
            },
          },
        },
      ],
    },

    // --- 3. CTA FINAL ---
    { name: 'ctaTitleEs', title: '3. CTA Final: Título (Español)', type: 'string' },
    { name: 'ctaSubtitleEs', title: '3. CTA Final: Texto (Español)', type: 'text' },
    { name: 'ctaBtnEs', title: '3. CTA Final: Texto del Botón (Español)', type: 'string' },

    { name: 'ctaTitleEn', title: '3. CTA Final: Título (Inglés)', type: 'string' },
    { name: 'ctaSubtitleEn', title: '3. CTA Final: Texto (Inglés)', type: 'text' },
    { name: 'ctaBtnEn', title: '3. CTA Final: Texto del Botón (Inglés)', type: 'string' },

    { name: 'ctaBtnLink', title: '3. CTA Final: Enlace del Botón', type: 'string' },
  ],
};