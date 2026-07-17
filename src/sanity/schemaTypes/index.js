import { homeSchema } from './home';
import { servicesPageSchema } from './servicesPage';
import { workPageSchema } from './workPage';
import { contactPageSchema } from './contactPage';
import { aboutPageSchema } from './aboutPage';
import { faqPageSchema } from './faqPage';
import { privacyPageSchema } from './privacyPage'; // <-- Nuevo import

export const schema = {
  types: [
    homeSchema,
    servicesPageSchema,
    workPageSchema,
    contactPageSchema,
    aboutPageSchema,
    faqPageSchema,
    privacyPageSchema // <-- Agregado
  ],
};