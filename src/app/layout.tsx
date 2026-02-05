import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "RushData - Portafolio de Soluciones IA",
  description: "Demos interactivos de soluciones de inteligencia artificial para empresas. Chatbots, dashboards, prediccion, CRM y mas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
