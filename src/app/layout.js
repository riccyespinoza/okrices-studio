import { Outfit } from "next/font/google";
import "./globals.css";
// 1. Importa tu componente Providers
import Providers from "@/components/layout/Providers"; 

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "800"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "Okrices Studio",
  description: "Branding & Web Development Studio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${outfit.variable} h-full antialiased`}>
      <body className="h-full text-white antialiased">
        {/* 2. Envuelve {children} con Providers */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}