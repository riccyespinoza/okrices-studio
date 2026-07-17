export const faqPageSchema = {
  name: 'faqPage',
  title: 'Página de Preguntas Frecuentes (FAQ)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Identificador del Documento',
      type: 'string',
      description: 'Ejemplo: "Contenido de la Página FAQ"',
    },

    // --- 1. HERO ---
    { name: 'heroTitleEs', title: '1. Hero: Título (Español)', type: 'string' },
    { name: 'heroSubtitleEs', title: '1. Hero: Subtítulo (Español)', type: 'text' },
    { name: 'heroTitleEn', title: '1. Hero: Título (Inglés)', type: 'string' },
    { name: 'heroSubtitleEn', title: '1. Hero: Subtítulo (Inglés)', type: 'text' },

    // --- 2. PREGUNTAS FRECUENTES (LISTA) ---
    {
      name: 'faqItems',
      title: '2. Lista de Preguntas Frecuentes',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Pregunta',
          fields: [
            { name: 'questionEs', title: 'Pregunta (Español)', type: 'string' },
            { name: 'answerEs', title: 'Respuesta (Español)', type: 'text' },
            { name: 'questionEn', title: 'Pregunta (Inglés)', type: 'string' },
            { name: 'answerEn', title: 'Respuesta (Inglés)', type: 'text' },
          ],
          preview: {
            select: { title: 'questionEs' },
            prepare(selection) {
              return { title: selection.title || 'Nueva pregunta...' };
            }
          }
        }
      ]
    },

    // --- 3. CTA FINAL ---
    { name: 'ctaTitleEs', title: '3. CTA Final: Título (Español)', type: 'string' },
    { name: 'ctaTextEs', title: '3. CTA Final: Texto (Español)', type: 'text' },
    { name: 'ctaBtnEs', title: '3. CTA Final: Texto del Botón (Español)', type: 'string' },
    
    { name: 'ctaTitleEn', title: '3. CTA Final: Título (Inglés)', type: 'string' },
    { name: 'ctaTextEn', title: '3. CTA Final: Texto (Inglés)', type: 'text' },
    { name: 'ctaBtnEn', title: '3. CTA Final: Texto del Botón (Inglés)', type: 'string' }
  ]
};