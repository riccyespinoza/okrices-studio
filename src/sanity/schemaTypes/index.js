// Definición limpia del esquema estructural para la página de Inicio (Home)
const homeSchema = {
  name: 'home',
  title: 'Página de Inicio (Home)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Identificador del Documento',
      type: 'string',
      description: 'Ejemplo: "Contenido Principal de la Home"',
    },
    // --- Campos en Español ---
    {
      name: 'heroTitleEs',
      title: 'Título del Hero (Español)',
      type: 'string',
    },
    {
      name: 'heroSubtitleEs',
      title: 'Subtítulo del Hero (Español)',
      type: 'text',
    },
    // --- Campos en Inglés ---
    {
      name: 'heroTitleEn',
      title: 'Título del Hero (Inglés)',
      type: 'string',
    },
    {
      name: 'heroSubtitleEn',
      title: 'Subtítulo del Hero (Inglés)',
      type: 'text',
    },
  ],
};

// Vinculamos de forma nativa el esquema al contenedor limpio de Sanity
export const schema = {
  types: [homeSchema],
};