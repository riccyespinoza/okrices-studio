export const contactPageSchema = {
  name: 'contactPage',
  title: 'Página de Contacto',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Identificador del Documento',
      type: 'string',
      description: 'Ejemplo: "Contenido de la Página de Contacto"',
    },

    // --- 1. HERO (TÍTULO PRINCIPAL DE LA PÁGINA) ---
    { name: 'heroTitleEs', title: '1. Hero: Título (Español)', type: 'string' },
    { name: 'heroSubtitleEs', title: '1. Hero: Subtítulo (Español)', type: 'text' },
    { name: 'heroTitleEn', title: '1. Hero: Título (Inglés)', type: 'string' },
    { name: 'heroSubtitleEn', title: '1. Hero: Subtítulo (Inglés)', type: 'text' },

    
  ]
};