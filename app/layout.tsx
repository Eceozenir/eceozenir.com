import type { Metadata } from "next"
import { Fraunces, Instrument_Sans } from "next/font/google"
import "./globals.css"

// Metin yazı tipi: Instrument Sans · Başlıklar: Fraunces (yumuşak, karakterli bir serif)
const metin = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
})
const baslik = Fraunces({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-display",
  axes: ["SOFT", "opsz"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: "Ece Özenir — Proje Yöneticisi",
  description: "Ece Özenir'in projeleri, eğitimi ve sertifikaları.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${metin.variable} ${baslik.variable}`}>
      <body className={metin.className}>{children}</body>
    </html>
  )
}
