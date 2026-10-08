import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"

const font = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ece Özenir — Proje Yöneticisi",
  description: "Ece Özenir'in projeleri, eğitimi ve sertifikaları.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body className={font.className}>{children}</body>
    </html>
  )
}
