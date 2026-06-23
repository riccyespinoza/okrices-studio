import { NextResponse } from "next/server";

const locales = ["es", "en"];
const defaultLocale = "es";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // ESCUDO DE SANITY: Si la URL va hacia el panel de administración, el middleware no interfiere
  if (pathname.startsWith('/studio')) {
    return NextResponse.next();
  }

  // 1. Validar si la ruta ya incluye un idioma válido (/es o /en)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // 2. Tu lógica inteligente original: Detecta la preferencia del idioma del navegador
  const acceptLanguage = request.headers.get("accept-language") || "";
  const preferredLocale = acceptLanguage.toLowerCase().includes("en") ? "en" : "es";

  // Redirige respetando la navegación cómoda del usuario
  request.nextUrl.pathname = `/${preferredLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Filtro estricto para evitar que el middleware altere imágenes, archivos o el panel interno
  matcher: [
    "/((?!api|_next/static|_next/image|assets|studio|favicon.ico|sw.js).*)",
  ],
};