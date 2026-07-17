// Esquema estructural exclusivo para la Página de Inicio (Home)
export const homeSchema = {
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
    { name: 'heroBtnMainEs', title: '1. Hero: Texto Botón Principal (Español)', type: 'string' },
    { name: 'heroBtnSecEs', title: '1. Hero: Texto Botón Secundario (Español)', type: 'string' },
    
    { name: 'heroTitleEn', title: '1. Hero: Título (Inglés)', type: 'string' },
    { name: 'heroSubtitleEn', title: '1. Hero: Subtítulo (Inglés)', type: 'text' },
    { name: 'heroBtnMainEn', title: '1. Hero: Texto Botón Principal (Inglés)', type: 'string' },
    { name: 'heroBtnSecEn', title: '1. Hero: Texto Botón Secundario (Inglés)', type: 'string' },

    { name: 'heroBtnMainLink', title: '1. Hero: Enlace Botón Principal (Ej: /contacto)', type: 'string' },
{ name: 'heroBtnSecLink', title: '1. Hero: Enlace Botón Secundario (Ej: /proyectos)', type: 'string' },

    // --- 1.5. LOGOS DE CLIENTES (MARQUEE) ---
    {
      name: 'clientLogos',
      title: '1.5. Logos de Clientes (Carrusel Infinito)',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Logo de Cliente',
          fields: [
            { name: 'logo', title: 'Imagen del Logo', type: 'image' },
            { name: 'altText', title: 'Texto Alternativo', type: 'string' }
          ]
        }
      ]
    },

    // --- 2. SERVICIOS DESTACADOS ---
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
            { name: 'ctaEs', title: 'Texto de Botón Interno (Español)', type: 'string' },
            { name: 'ctaEn', title: 'Texto de Botón Interno (Inglés)', type: 'string' },
            {
              name: 'iconSvg',
              title: 'Ícono del Servicio (Subir Archivo .svg)',
              type: 'file',
              options: { accept: '.svg' },
              validation: (Rule) => Rule.required()
            },
            { name: 'featured', title: '¿Destacar tarjeta?', type: 'boolean', initialValue: false },
            { name: 'ctaLink', title: 'Enlace del Botón (Ej: /servicio-x)', type: 'string' },

            
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

    // --- 4. PROYECTOS SELECCIONADOS ---
    { name: 'projectsTitleEs', title: '4. Proyectos: Título Sección (Español)', type: 'string' },
    { name: 'projectsSubtitleEs', title: '4. Proyectos: Subtítulo Sección (Español)', type: 'text' },
    { name: 'projectsTitleEn', title: '4. Proyectos: Título Sección (Inglés)', type: 'string' },
    { name: 'projectsSubtitleEn', title: '4. Proyectos: Subtítulo Sección (Inglés)', type: 'text' },
    { name: 'projectsBtnEs', title: '4. Proyectos: Texto del Botón Ver Todos (Español)', type: 'string' },
    { name: 'projectsBtnEn', title: '4. Proyectos: Texto del Botón Ver Todos (Inglés)', type: 'string' },
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
            { name: 'image', type: 'image', options: { hotspot: true } },
            {
              name: 'layoutSize',
              type: 'string',
              options: {
                list: [
                  { title: 'Estándar', value: 'normal' },
                  { title: 'Ancho Completo', value: 'wide' }
                ]
              },
              initialValue: 'normal'
            }
          ]
        }
      ]
    },
    { name: 'projectsBtnLink', title: '4. Proyectos: Enlace Botón Ver Todos (Ej: /proyectos)', type: 'string' },

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

    // --- 6. CTA FINAL DE LA PÁGINA ---
    { name: 'ctaTitleEs', title: '6. CTA Final: Título (Español)', type: 'string' },
    { name: 'ctaSubtitleEs', title: '6. CTA Final: Texto (Español)', type: 'text' },
    { name: 'ctaBtnEs', title: '6. CTA Final: Texto del Botón (Español)', type: 'string' },
    { name: 'ctaTitleEn', title: '6. CTA Final: Título (Inglés)', type: 'string' },
    { name: 'ctaSubtitleEn', title: '6. CTA Final: Texto (Inglés)', type: 'text' },
    { name: 'ctaBtnEn', title: '6. CTA Final: Texto del Botón (Inglés)', type: 'string' },
    { name: 'ctaBtnLink', title: '6. CTA Final: Enlace del Botón (Ej: /contacto)', type: 'string' }
  ],
};