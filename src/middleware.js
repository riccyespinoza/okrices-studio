import { NextResponse } from "next/server";

const locales = ["es", "en"];
const defaultLocale = "es";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 1. Validar si la ruta ya incluye un idioma válido (/es o /en)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // 2. Lógica de redirección si no tiene idioma en la URL
  // Detecta si el navegador prefiere inglés, de lo contrario usa español
  const acceptLanguage = request.headers.get("accept-language") || "";
  const preferredLocale = acceptLanguage.toLowerCase().includes("en") ? "en" : "es";

  // Redirige respetando la preferencia del usuario o el idioma por defecto
  request.nextUrl.pathname = `/${preferredLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Filtro estricto para evitar que el middleware altere imágenes, archivos o APIs internas
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)",
  ],
};