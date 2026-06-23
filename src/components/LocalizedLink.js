import Link from "next/link";
import { useParams } from "next/navigation";

export default function LocalizedLink({ href, children, ...props }) {
  // Extrae de forma dinámica el idioma actual de la URL ([locale])
  const { locale } = useParams();
  
  // Idioma base por defecto configurado en nuestro estudio
  const currentLocale = locale || "es";

  // Construye la ruta final inyectando el prefijo del idioma correspondiente
  const localizedHref = href.startsWith("/")
    ? `/${currentLocale}${href === "/" ? "" : href}`
    : href;

  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  );
}