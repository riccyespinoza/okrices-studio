import { Outfit } from "next/font/google";
import "./globals.css";

// Cargamos e inyectamos la tipografía de forma única y global
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "Okrices Studio",
  description: "Branding & Web Development Studio",
};

export default function RootLayout({ children }) {
  return (
    // Proveemos las etiquetas obligatorias una sola vez para toda la aplicación y el CMS
    <html lang="es" className={`${outfit.variable} h-full antialiased`}>
      <body className="h-full bg-[#0D1419] text-white antialiased">
        {children}
      </body>
    </html>
  );
}