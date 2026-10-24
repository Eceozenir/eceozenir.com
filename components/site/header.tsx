"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Menu, X } from "lucide-react"

import { MENU } from "./menu"
import { DilDugmesi, useDil } from "./dil"

// Her sayfanın üstündeki sabit menü. Mobilde tam ekran açılır.
export function SiteHeader() {
  const yol = usePathname()
  const { t } = useDil()
  const [acik, setAcik] = useState(false)
  const [kaydi, setKaydi] = useState(false)

  useEffect(() => {
    const kontrol = () => setKaydi(window.scrollY > 8)
    kontrol()
    window.addEventListener("scroll", kontrol, { passive: true })
    return () => window.removeEventListener("scroll", kontrol)
  }, [])

  // Sayfa değişince mobil menüyü kapat
  useEffect(() => setAcik(false), [yol])

  // Mobil menü açıkken arka sayfa kaymasın
  useEffect(() => {
    document.documentElement.style.overflow = acik ? "hidden" : ""
    return () => {
      document.documentElement.style.overflow = ""
    }
  }, [acik])

  const aktif = (href: string) => (href === "/" ? yol === "/" : yol.startsWith(href))
  // Ana sayfanın en üstünde menü videonun üstünde durur: şeffaf zemin, beyaz yazı
  const beyaz = yol === "/" && !kaydi && !acik

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        // Not: menü açıkken bulanıklık efekti kapalı; yoksa açılan menü ekranı kaplayamıyor
        acik ? "bg-[#fbfaf6]" : kaydi ? "bg-[#fbfaf6]/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:h-[72px] sm:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label={t.anaSayfa}>
          <span
            className={`flex size-9 items-center justify-center rounded-full text-[13px] font-semibold tracking-tight transition-colors ${
              beyaz ? "bg-white text-[#141414]" : "bg-[#141414] text-[#fbfaf6]"
            }`}
          >
            EÖ
          </span>
          <span className={`leading-tight transition-colors ${beyaz ? "text-white" : ""}`}>
            <span className="block text-[15px] font-semibold tracking-tight">Ece Özenir</span>
            <span className={`block text-xs ${beyaz ? "text-white/70" : "text-[#6b665e]"}`}>{t.rol}</span>
          </span>
        </Link>

        {/* Masaüstü menü */}
        <nav className="hidden items-center gap-1 md:flex" aria-label={t.anaMenu}>
          {MENU.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              aria-current={aktif(m.href) ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-[12.5px] tracking-[0.06em] uppercase transition-colors ${
                aktif(m.href)
                  ? beyaz
                    ? "bg-white text-[#141414]"
                    : "bg-[#141414] text-[#fbfaf6]"
                  : beyaz
                    ? "text-white/80 hover:bg-white/10 hover:text-white"
                    : "text-[#141414]/70 hover:bg-[#141414]/5 hover:text-[#141414]"
              }`}
            >
              {t[m.anahtar]}
            </Link>
          ))}
          <span className="ml-2">
            <DilDugmesi beyaz={beyaz} />
          </span>
          <Link
            href="/#iletisim"
            data-miknatis
            className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-[#4a2b1d] px-4 py-2 text-[12.5px] tracking-[0.06em] text-white uppercase transition-colors hover:bg-[#331c12]"
          >
            {t.iletisim} <ArrowUpRight className="size-4" />
          </Link>
        </nav>

        {/* Mobil: dil seçimi ve menü düğmesi */}
        <div className="flex items-center gap-2 md:hidden">
          <DilDugmesi beyaz={beyaz} />
          <button
            type="button"
            onClick={() => setAcik((a) => !a)}
            aria-expanded={acik}
            aria-label={acik ? t.menuKapat : t.menuAc}
            className={`flex size-11 items-center justify-center rounded-full ${beyaz ? "bg-white text-[#141414]" : "bg-[#141414] text-[#fbfaf6]"}`}
          >
            {acik ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobil menü */}
      {acik && (
        <nav className="fixed inset-x-0 top-16 bottom-0 z-50 flex flex-col overflow-y-auto bg-[#fbfaf6] px-5 pt-6 pb-10 md:hidden" aria-label={t.mobilMenu}>
          {MENU.map((m, i) => (
            <Link
              key={m.href}
              href={m.href}
              className="foto-gir block py-4 text-3xl font-semibold tracking-tight"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <span className={aktif(m.href) ? "text-[#4a2b1d]" : ""}>{t[m.anahtar]}</span>
            </Link>
          ))}
          <Link
            href="/#iletisim"
            className="mt-auto flex items-center justify-center gap-2 rounded-full bg-[#4a2b1d] py-4 text-base font-medium text-white"
          >
            {t.iletisimeGec} <ArrowUpRight className="size-5" />
          </Link>
        </nav>
      )}
    </header>
  )
}
