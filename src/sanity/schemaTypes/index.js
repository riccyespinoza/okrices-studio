// Definición limpia del esquema estructural para las 6 secciones de la Home (Modo Editorial)
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
    // --- 1. HERO PRINCIPAL ---
    { name: 'heroTitleEs', title: '1. Hero: Título (Español)', type: 'string' },
    { name: 'heroSubtitleEs', title: '1. Hero: Subtítulo (Español)', type: 'text' },
    { name: 'heroTitleEn', title: '1. Hero: Título (Inglés)', type: 'string' },
    { name: 'heroSubtitleEn', title: '1. Hero: Subtítulo (Inglés)', type: 'text' },

    // --- 2. SERVICIOS DESTACADOS (BENTO GRID READY) ---
    { name: 'servicesTitleEs', title: '2. Servicios: Título Sección (Español)', type: 'string' },
    { name: 'servicesSubtitleEs', title: '2. Servicios: Subtítulo Sección (Español)', type: 'text' },
    { name: 'servicesTitleEn', title: '2. Servicios: Título Sección (Inglés)', type: 'string' },
    { name: 'servicesSubtitleEn', title: '2. Servicios: Subtítulo Sección (Inglés)', type: 'text' },
    {
      name: 'servicesList',
      title: '2. Servicios: Colección de Tarjetas',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Tarjeta de Servicio',
          fields: [
            { name: 'titleEs', title: 'Nombre del Servicio (Español)', type: 'string' },
            { name: 'titleEn', title: 'Nombre del Servicio (Inglés)', type: 'string' },
            { name: 'descriptionEs', title: 'Descripción Corta (Español)', type: 'text' },
            { name: 'descriptionEn', title: 'Descripción Corta (Inglés)', type: 'text' },
            {
              name: 'image',
              title: 'Imagen / Ilustración del Servicio',
              type: 'image',
              options: { hotspot: true } // Permite elegir el centro de atención visual de la imagen
            },
            {
              name: 'featured',
              title: '¿Destacar tarjeta? (Ocupa el doble de ancho en computadoras)',
              type: 'boolean',
              initialValue: false
            }
          ]
        }
      ]
    },

    // --- 3. MÉTODO DE TRABAJO ---
    { name: 'methodTitleEs', title: '3. Método: Título Sección (Español)', type: 'string' },
    { name: 'methodTitleEn', title: '3. Método: Título Sección (Inglés)', type: 'string' },
    {
      name: 'methodList',
      title: '3. Método: Lista de Pasos',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Paso del Proceso',
          fields: [
            { name: 'stepNumber', title: 'Número de Paso (Ej: 01)', type: 'string' },
            { name: 'titleEs', title: 'Título (Español)', type: 'string' },
            { name: 'titleEn', title: 'Título (Inglés)', type: 'string' },
            { name: 'descriptionEs', title: 'Descripción (Español)', type: 'text' },
            { name: 'descriptionEn', title: 'Descripción (Inglés)', type: 'text' }
          ]
        }
      ]
    },

    // --- 4. PROYECTOS SELECCIONADOS (RITMO ASIMÉTRICO) ---
    { name: 'projectsTitleEs', title: '4. Proyectos: Título Sección (Español)', type: 'string' },
    { name: 'projectsSubtitleEs', title: '4. Proyectos: Subtítulo Sección (Español)', type: 'text' },
    { name: 'projectsTitleEn', title: '4. Proyectos: Título Sección (Inglés)', type: 'string' },
    { name: 'projectsSubtitleEn', title: '4. Proyectos: Subtítulo Sección (Inglés)', type: 'text' },
    {
      name: 'projectsList',
      title: '4. Proyectos: Muestrario de Tarjetas',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Proyecto Destacado',
          fields: [
            { name: 'name', title: 'Nombre del Proyecto', type: 'string' },
            { name: 'tagEs', title: 'Tipo de Servicio (Español)', type: 'string' },
            { name: 'tagEn', title: 'Tipo de Servicio (Inglés)', type: 'string' },
            { name: 'phraseEs', title: 'Frase de Resultado (Español)', type: 'string' },
            { name: 'phraseEn', title: 'Frase de Resultado (Inglés)', type: 'string' },
            {
              name: 'image',
              title: 'Mockup Editorial o Fotografía Real',
              type: 'image',
              options: { hotspot: true }
            },
            {
              name: 'layoutSize',
              title: 'Ancho de la tarjeta en grilla',
              type: 'string',
              options: {
                list: [
                  { title: 'Estándar (1 Columna)', value: 'normal' },
                  { title: 'Ancho Completo (2 Columnas)', value: 'wide' }
                ]
              },
              initialValue: 'normal'
            }
          ]
        }
      ]
    },

    // --- 5. TESTIMONIOS O CONFIANZA ---
    { name: 'trustTitleEs', title: '5. Confianza: Título Sección (Español)', type: 'string' },
    { name: 'trustSubtitleEs', title: '5. Confianza: Subtítulo Sección (Español)', type: 'text' },
    { name: 'trustTitleEn', title: '5. Confianza: Título Sección (Inglés)', type: 'string' },
    { name: 'trustSubtitleEn', title: '5. Confianza: Subtítulo Sección (Inglés)', type: 'text' },
    {
      name: 'trustList',
      title: '5. Confianza: Bloques o Reseñas',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Elemento de Confianza',
          fields: [
            { name: 'quoteEs', title: 'Texto o Testimonio (Español)', type: 'text' },
            { name: 'quoteEn', title: 'Texto o Testimonio (Inglés)', type: 'text' },
            { name: 'label', title: 'Autor o Métrica (Opcional)', type: 'string' }
          ]
        }
      ]
    },

    // --- 6. CTA FINAL ---
    { name: 'ctaTitleEs', title: '6. CTA: Título Final (Español)', type: 'string' },
    { name: 'ctaSubtitleEs', title: '6. CTA: Texto Descriptivo (Español)', type: 'text' },
    { name: 'ctaTitleEn', title: '6. CTA: Título Final (Inglés)', type: 'string' },
    { name: 'ctaSubtitleEn', title: '6. CTA: Texto Descriptivo (Inglés)', type: 'text' },
  ],
};

export const schema = {
  types: [homeSchema],
};