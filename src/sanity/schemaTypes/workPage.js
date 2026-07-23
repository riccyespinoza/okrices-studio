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
    { name: 'heroSubtitleEs', title: '1. Hero: Subtítulo (Español)', type: 'text', description: 'Texto sobre los filtros. Ej: "Explorar por tipo de proyecto"' },
    { name: 'heroTitleEn', title: '1. Hero: Título H1 (Inglés)', type: 'string' },
    { name: 'heroSubtitleEn', title: '1. Hero: Subtítulo (Inglés)', type: 'text', description: 'Texto sobre los filtros. Ej: "Browse by project type"' },

    // --- 2. PROYECTOS Y CASOS DE ESTUDIO ---
    {
      name: 'categories',
      title: '2. Categorías / Filtros',
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
            
            // --- SEPARACIÓN DE MEDIOS PARA OPTIMIZACIÓN ---
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
            
            // Caso de Estudio Interno
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

    // --- 3. CTA FINAL ---
    { name: 'ctaTitleEs', title: '3. CTA Final: Título (Español)', type: 'string' },
    { name: 'ctaSubtitleEs', title: '3. CTA Final: Texto (Español)', type: 'text' },
    { name: 'ctaBtnEs', title: '3. CTA Final: Texto del Botón (Español)', type: 'string' },
    { name: 'ctaTitleEn', title: '3. CTA Final: Título (Inglés)', type: 'string' },
    { name: 'ctaSubtitleEn', title: '3. CTA Final: Texto (Inglés)', type: 'text' },
    { name: 'ctaBtnEn', title: '3. CTA Final: Texto del Botón (Inglés)', type: 'string' },
    { name: 'ctaBtnLink', title: '3. CTA Final: Enlace del Botón', type: 'string' }
  ]
};