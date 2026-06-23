import { Outfit } from "next/font/google";
import "../globals.css";

// Configuración óptima de la tipografía Outfit
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
    <html
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#EDE7E2] text-[#0D1419]">
        {children}
      </body>
    </html>
  );
}