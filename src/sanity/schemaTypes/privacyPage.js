export const privacyPageSchema = {
  name: 'privacyPage',
  title: 'Página de Privacidad (Privacy Policy)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Identificador del Documento',
      type: 'string',
      description: 'Ejemplo: "Contenido de la Política de Privacidad"',
    },

    // --- TÍTULO PRINCIPAL Y ENTRADA ---
    { name: 'pageTitleEs', title: 'Título Principal (Español)', type: 'string' },
    { name: 'introTextEs', title: 'Texto Introductorio (Español)', type: 'text' },
    { name: 'pageTitleEn', title: 'Título Principal (Inglés)', type: 'string' },
    { name: 'introTextEn', title: 'Texto Introductorio (Inglés)', type: 'text' },

    // --- SECCIÓN 1: RECOPILACIÓN ---
    { name: 'collectTitleEs', title: '1. Recopilación: Título (Español)', type: 'string' },
    { name: 'collectTextEs', title: '1. Recopilación: Texto (Español)', type: 'text' },
    { name: 'collectTitleEn', title: '1. Recopilación: Título (Inglés)', type: 'string' },
    { name: 'collectTextEn', title: '1. Recopilación: Texto (Inglés)', type: 'text' },

    // --- SECCIÓN 2: USO ---
    { name: 'useTitleEs', title: '2. Uso: Título (Español)', type: 'string' },
    { name: 'useTextEs', title: '2. Uso: Texto (Español)', type: 'text' },
    { name: 'useTitleEn', title: '2. Uso: Título (Inglés)', type: 'string' },
    { name: 'useTextEn', title: '2. Uso: Texto (Inglés)', type: 'text' },

    // --- SECCIÓN 3: COOKIES ---
    { name: 'cookiesTitleEs', title: '3. Cookies: Título (Español)', type: 'string' },
    { name: 'cookiesTextEs', title: '3. Cookies: Texto (Español)', type: 'text' },
    { name: 'cookiesTitleEn', title: '3. Cookies: Título (Inglés)', type: 'string' },
    { name: 'cookiesTextEn', title: '3. Cookies: Texto (Inglés)', type: 'text' },

    // --- SECCIÓN 4: COMPARTICIÓN ---
    { name: 'shareTitleEs', title: '4. Compartición: Título (Español)', type: 'string' },
    { name: 'shareTextEs', title: '4. Compartición: Texto (Español)', type: 'text' },
    { name: 'shareTitleEn', title: '4. Compartición: Título (Inglés)', type: 'string' },
    { name: 'shareTextEn', title: '4. Compartición: Texto (Inglés)', type: 'text' },

    // --- SECCIÓN 5: SEGURIDAD ---
    { name: 'securityTitleEs', title: '5. Seguridad: Título (Español)', type: 'string' },
    { name: 'securityTextEs', title: '5. Seguridad: Texto (Español)', type: 'text' },
    { name: 'securityTitleEn', title: '5. Seguridad: Título (Inglés)', type: 'string' },
    { name: 'securityTextEn', title: '5. Seguridad: Texto (Inglés)', type: 'text' },

    // --- SECCIÓN 6: DERECHOS ---
    { name: 'rightsTitleEs', title: '6. Derechos: Título (Español)', type: 'string' },
    { name: 'rightsTextEs', title: '6. Derechos: Texto (Español)', type: 'text' },
    { name: 'rightsTitleEn', title: '6. Derechos: Título (Inglés)', type: 'string' },
    { name: 'rightsTextEn', title: '6. Derechos: Texto (Inglés)', type: 'text' },

    // --- SECCIÓN 7: CONTACTO ---
    { name: 'contactTitleEs', title: '7. Contacto: Título (Español)', type: 'string' },
    { name: 'contactTextEs', title: '7. Contacto: Texto (Español)', type: 'text' },
    { name: 'contactTitleEn', title: '7. Contacto: Título (Inglés)', type: 'string' },
    { name: 'contactTextEn', title: '7. Contacto: Texto (Inglés)', type: 'text' },
  ]
};