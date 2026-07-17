export const workPageSchema = {
  name: 'workPage',
  title: 'Página de Portafolio (Work)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Identificador del Documento',
      type: 'string',
      description: 'Ejemplo: "Contenido de la Página de Portafolio"',
    },

    // --- 1. HERO ---
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

    // --- 2. INTRODUCCIÓN ---
    { name: 'introTitleEs', title: '2. Intro: Título (Español)', type: 'string' },
    { name: 'introTextEs', title: '2. Intro: Texto (Español)', type: 'text' },
    { name: 'introTitleEn', title: '2. Intro: Título (Inglés)', type: 'string' },
    { name: 'introTextEn', title: '2. Intro: Texto (Inglés)', type: 'text' },

    // --- 3. PROYECTOS Y CASOS DE ESTUDIO ---
    {
      name: 'categories',
      title: '3. Categorías / Filtros',
      type: 'array',
      description: 'Ej: Branding, Web, E-commerce, Booking',
      of: [{ type: 'string' }]
    },
    {
      name: 'projectsList',
      title: 'Lista de Proyectos',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Proyecto',
          fields: [
            { name: 'name', title: 'Nombre del Proyecto', type: 'string' },
            { name: 'category', title: 'Categoría (Debe coincidir con los filtros)', type: 'string' },
            { 
              name: 'slug', 
              title: 'Slug / URL del caso de estudio', 
              type: 'slug', 
              options: { 
                source: (doc, options) => options.parent.name,
                maxLength: 96
              } 
            },
            
            // --- AJUSTE DE RENDIMIENTO: SEPARACIÓN DE MEDIOS ---
            { 
              name: 'gridImage', 
              title: 'Imagen para la Grilla (Miniatura / Mockup)', 
              type: 'image', 
              options: { hotspot: true },
              description: 'Imagen optimizada y ligera exclusiva para las tarjetas del catálogo general (/work).'
            },
            { 
              name: 'heroImage', 
              title: 'Imagen Principal del Proyecto (Full HD Banner)', 
              type: 'image', 
              options: { hotspot: true },
              description: 'Imagen panorámica en alta resolución para el fondo de pantalla completa dentro del detalle del proyecto.'
            },
            
            // Tarjeta Info
            { name: 'shortDescEs', title: 'Descripción Corta (Español)', type: 'text' },
            { name: 'shortDescEn', title: 'Descripción Corta (Inglés)', type: 'text' },
            
            // Caso de Estudio Interno (Dos Columnas)
            { name: 'descriptionEs', title: 'Descripción Detallada (Español)', type: 'text' },
            { name: 'descriptionEn', title: 'Descripción Detallada (Inglés)', type: 'text' },

            {
              name: 'gallery',
              title: 'Galería de Imágenes del Proyecto',
              type: 'array',
              description: 'Sube aquí mockups, capturas de pantalla o aplicaciones de la marca.',
              options: {
                layout: 'grid'
              },
              of: [{ type: 'image', options: { hotspot: true } }]
            }
          ]
        }
      ]
    },

    // --- 4. BLOQUE DE CONFIANZA ---
    { name: 'trustTitleEs', title: '4. Confianza: Título (Español)', type: 'string' },
    { name: 'trustTextEs', title: '4. Confianza: Texto (Español)', type: 'text' },
    { name: 'trustListEs', title: '4. Confianza: Señales (Español)', type: 'array', of: [{ type: 'string' }] },
    { name: 'trustTitleEn', title: '4. Confianza: Título (Inglés)', type: 'string' },
    { name: 'trustTextEn', title: '4. Confianza: Texto (Inglés)', type: 'text' },
    { name: 'trustListEn', title: '4. Confianza: Señales (Inglés)', type: 'array', of: [{ type: 'string' }] },

    // --- 5. CTA FINAL ---
    { name: 'ctaTitleEs', title: '5. CTA Final: Título (Español)', type: 'string' },
    { name: 'ctaSubtitleEs', title: '5. CTA Final: Texto (Español)', type: 'text' },
    { name: 'ctaBtnEs', title: '5. CTA Final: Texto del Botón (Español)', type: 'string' },
    { name: 'ctaTitleEn', title: '5. CTA Final: Título (Inglés)', type: 'string' },
    { name: 'ctaSubtitleEn', title: '5. CTA Final: Texto (Inglés)', type: 'text' },
    { name: 'ctaBtnEn', title: '5. CTA Final: Texto del Botón (Inglés)', type: 'string' },
    { name: 'ctaBtnLink', title: '5. CTA Final: Enlace del Botón', type: 'string' }
  ]
};