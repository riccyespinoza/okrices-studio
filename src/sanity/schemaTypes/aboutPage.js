// sanity/schemaTypes/aboutPage.js

export const aboutPageSchema = {
  name: 'aboutPage',
  title: 'Página de Nosotros (About)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Identificador del Documento',
      type: 'string',
      description: 'Ejemplo: "Contenido de la Página About"',
    },

    // --- 1. HERO ---
    { name: 'heroTitleEs', title: '1. Hero: Título (Español)', type: 'string' },
    { name: 'heroSubtitleEs', title: '1. Hero: Subtítulo (Español)', type: 'text' },
    { name: 'heroTitleEn', title: '1. Hero: Título (Inglés)', type: 'string' },
    { name: 'heroSubtitleEn', title: '1. Hero: Subtítulo (Inglés)', type: 'text' },
    { 
      name: 'heroImage', 
      title: '1. Hero: Imagen (Retrato o Estudio)', 
      type: 'image', 
      options: { hotspot: true } 
    },

    // --- 2. HISTORIA (ORIGEN) ---
    { name: 'originTitleEs', title: '2. Origen: Título (Español)', type: 'string' },
    { name: 'originTextEs', title: '2. Origen: Texto (Español)', type: 'text' },
    { name: 'originTitleEn', title: '2. Origen: Título (Inglés)', type: 'string' },
    { name: 'originTextEn', title: '2. Origen: Texto (Inglés)', type: 'text' },

    // --- 3. CÓMO TRABAJAMOS ---
    { name: 'howTitleEs', title: '3. Proceso: Título (Español)', type: 'string' },
    { name: 'howTextEs', title: '3. Proceso: Texto (Español)', type: 'text' },
    { name: 'howTitleEn', title: '3. Proceso: Título (Inglés)', type: 'string' },
    { name: 'howTextEn', title: '3. Proceso: Texto (Inglés)', type: 'text' },

    // --- 4. QUÉ NOS DIFERENCIA ---
    { name: 'diffTitleEs', title: '4. Diferenciación: Título (Español)', type: 'string' },
    { name: 'diffTextEs', title: '4. Diferenciación: Texto (Español)', type: 'text' },
    { name: 'diffPointsEs', title: '4. Diferenciación: Puntos (Español)', type: 'array', of: [{ type: 'string' }] },
    
    { name: 'diffTitleEn', title: '4. Diferenciación: Título (Inglés)', type: 'string' },
    { name: 'diffTextEn', title: '4. Diferenciación: Texto (Inglés)', type: 'text' },
    { name: 'diffPointsEn', title: '4. Diferenciación: Puntos (Inglés)', type: 'array', of: [{ type: 'string' }] },

    // --- 5. SECCIÓN LOCAL ---
    { name: 'localTitleEs', title: '5. Local: Título (Español)', type: 'string' },
    { name: 'localTextEs', title: '5. Local: Texto (Español)', type: 'text' },
    { name: 'localTitleEn', title: '5. Local: Título (Inglés)', type: 'string' },
    { name: 'localTextEn', title: '5. Local: Texto (Inglés)', type: 'text' },

    // --- 6. VALORES ---
    { name: 'valuesTitleEs', title: '6. Valores: Título (Español)', type: 'string' },
    { name: 'valuesListEs', title: '6. Valores: Lista (Español)', type: 'array', of: [{ type: 'string' }] },
    { name: 'valuesTitleEn', title: '6. Valores: Título (Inglés)', type: 'string' },
    { name: 'valuesListEn', title: '6. Valores: Lista (Inglés)', type: 'array', of: [{ type: 'string' }] },

    // --- 7. CTA FINAL ---
    { name: 'ctaTitleEs', title: '7. CTA Final: Título (Español)', type: 'string' },
    { name: 'ctaBtnEs', title: '7. CTA Final: Texto del Botón (Español)', type: 'string' },
    { name: 'ctaTitleEn', title: '7. CTA Final: Título (Inglés)', type: 'string' },
    { name: 'ctaBtnEn', title: '7. CTA Final: Texto del Botón (Inglés)', type: 'string' }
  ]
};