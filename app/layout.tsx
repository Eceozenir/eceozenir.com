import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { icerik } from "@/lib/dil"

// Yazı tipi: Inter. Başlıklar ince ve büyük, metinler aynı ailede.
// Değiştirmek için buradaki adı başka bir Google Fonts yazı tipiyle değiştir.
const sans = Inter({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-sans" })

export async function generateMetadata(): Promise<Metadata> {
  const { dil, t } = await icerik()
  return {
    title: { default: t.metaBaslik, template: "%s | Ece Özenir" },
    description: t.metaAciklama,
    openGraph: {
      title: t.metaBaslik,
      description: t.metaAciklama,
      type: "website",
      locale: dil === "en" ? "en_US" : "tr_TR",
    },
  }
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { dil } = await icerik()
  return (
    <html lang={dil} className={sans.variable}>
      <body className={`${sans.className} bg-[#fbfaf6] text-[#141414] antialiased`}>{children}</body>
    </html>
  )
}
