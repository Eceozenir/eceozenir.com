import type { Metadata } from "next"
import { Inter_Tight } from "next/font/google"
import "./globals.css"

// Tek yazı tipi: Inter Tight. Başlıklar büyük harf, ince (400) ve sıkı satırlı;
// metinler aynı ailede, rahat okunur aralıkla.
const font = Inter_Tight({
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
