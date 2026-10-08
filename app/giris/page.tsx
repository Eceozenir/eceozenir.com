import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { DevBaslik } from "./dev-baslik"
import { giris } from "../bilgilerim"

// Deneme sayfası (/giris): "Creative Giants" tarzı editoryal giriş.
// Krem zemin, kocaman ince (300) başlık, altında kenardan kenara video.

export const metadata: Metadata = { title: "Giriş denemesi — Ece Özenir" }

const inter = Inter({ subsets: ["latin", "latin-ext"], weight: ["300", "400"], variable: "--font-giris" })

export default function GirisDeneme() {
  return (
    <main
      className={`${inter.variable} min-h-screen bg-[#fffef7] text-black`}
      style={{ fontFamily: "var(--font-giris), sans-serif" }}
    >
      {/* Üst şerit */}
      <header className="flex items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-full bg-black text-[11px] font-normal tracking-tight text-[#fffef7]">
            EÖ
          </span>
          <p className="text-[11px] leading-tight font-normal uppercase sm:text-xs">
            Proje yönetimi //
            <br className="sm:hidden" /> Yazılım ve e-ticaret projeleri
          </p>
        </div>
        <a
          href="/"
          className="rounded-full bg-black px-6 py-3 text-base font-normal text-[#fffef7] transition-opacity hover:opacity-80"
        >
          Menü
        </a>
      </header>

      {/* Kocaman başlık */}
      <section className="px-4 pt-[3vh] pb-[3vh] sm:px-8 sm:pt-[5vh]">
        <DevBaslik metin="Ece Özenir" />
      </section>

      {/* Kenardan kenara video */}
      <section className="relative">
        <video
          src={giris.video}
          autoPlay
          muted
          loop
          playsInline
          className="giris-video block h-[78vh] w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-4 pt-32 pb-6 sm:px-8 sm:pb-8">
          <p className="text-xs font-normal tracking-normal text-[#fffef7] uppercase">Proje Yöneticisi · Webadası Bilgi Teknolojileri</p>
          <p className="mt-3 max-w-2xl text-[clamp(24px,3.4vw,34px)] leading-[1.15] font-light tracking-[-0.02em] text-[#fffef7]">
            {giris.slogan}
          </p>
        </div>
      </section>
    </main>
  )
}
