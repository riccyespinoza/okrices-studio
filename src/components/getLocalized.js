/**
 * Devuelve el campo correspondiente al idioma activo.
 *
 * Ejemplo:
 * getLocalized(service, "title", "en")
 *
 * Buscará:
 * service.titleEn
 *
 * Para cualquier idioma distinto de "en", buscará:
 * service.titleEs
 */
export function getLocalized(source, field, locale) {
  if (!source || !field) {
    return undefined;
  }

  const languageSuffix = locale === "en" ? "En" : "Es";

  return source[`${field}${languageSuffix}`];
}