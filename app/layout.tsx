import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

// Yazı tipi: Inter. Başlıklar ince ve büyük, metinler aynı ailede.
// Değiştirmek için buradaki adı başka bir Google Fonts yazı tipiyle değiştir.
const sans = Inter({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-sans" })

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
    <html lang="tr" className={sans.variable}>
      <body className={`${sans.className} bg-[#fbfaf6] text-[#141414] antialiased`}>{children}</body>
    </html>
  )
}
