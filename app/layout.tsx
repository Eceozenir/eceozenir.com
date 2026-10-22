import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

// Yazı tipleri: Geist (metin ve başlıklar), Geist Mono (tarihler, sayılar, zaman tabloları).
const sans = Geist({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-sans" })
const mono = Geist_Mono({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-mono" })

export const metadata: Metadata = {
  title: { default: "Ece Özenir | Proje Yöneticisi", template: "%s | Ece Özenir" },
  description:
    "Ece Özenir: Webadası Bilgi Teknolojileri'nde proje yöneticisi, TOSFED'de zaman kayıt netice sorumlusu. Projeler, referanslar, ralli galerisi ve iletişim.",
  openGraph: {
    title: "Ece Özenir | Proje Yöneticisi",
    description: "Projeler, referanslar, TOSFED ralli galerisi ve iletişim.",
    type: "website",
    locale: "tr_TR",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${sans.variable} ${mono.variable}`}>
      <body className={`${sans.className} bg-[#f6f4ef] text-[#141414] antialiased`}>{children}</body>
    </html>
  )
}
