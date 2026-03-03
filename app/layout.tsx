import { Playfair_Display, Inter } from 'next/font/google'
import { SmoothScroll } from '@/components/SmoothScroll';
import './globals.css'
import type { Metadata } from "next";

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata = {
  title: 'Alchymia | Elixir of the Occult Scent',
  description: "Descubra Silentivm, uma fragrância artesanal onde a alquimia encontra o luxo minimalista. Entre na lista de espera para o Lote 01.",
  keywords: ["perfume de nicho", "alquimia", "fragrância artesanal", "luxo minimalista", "Silentivm"],
  authors: [{ name: "Maison Alchymia" }],

  // Open Graph (Facebook, WhatsApp, LinkedIn)
  openGraph: {
    title: "Alchymia | Silentivm",
    description: "Fragrância artesanal em lotes limitados.",
    url: "https://alchymia.com.br", // Substitua pelo seu domínio
    siteName: "Alchymia",
    images: [
      {
        url: "/images/og-image.png", // Imagem de 1200x630px
        width: 1200,
        height: 630,
        alt: "Frasco de Perfume Alchymia Silentivm",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  // Twitter (X)
  twitter: {
    card: "summary_large_image",
    title: "Alchymia | Silentivm",
    description: "O despertar do aroma oculto.",
    images: ["/images/og-image.png"],
  },

  // Ícones (Favicon)
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}