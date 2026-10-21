import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import "./globals.css"

// Tek yazı tipi: Manrope. Yumuşak, geometrik ve sade.
// (Değiştirmek için buradaki adı başka bir Google Fonts yazı tipiyle değiştir.)
const font = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Ece Özenir — Proje Yöneticisi",
  description: "Ece Özenir'in projeleri, eğitimi ve sertifikaları.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={font.variable}>
      <body className={font.className}>{children}</body>
    </html>
  )
}
