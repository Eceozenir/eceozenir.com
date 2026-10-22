"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Menu, X } from "lucide-react"

import { MENU } from "./menu"

// Her sayfanın üstündeki sabit menü. Mobilde tam ekran açılır.
export function SiteHeader() {
  const yol = usePathname()
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

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        // Not: menü açıkken bulanıklık efekti kapalı; yoksa açılan menü ekranı kaplayamıyor
        acik ? "bg-[#f6f4ef]" : kaydi ? "bg-[#f6f4ef]/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:h-[72px] sm:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="Ana sayfa">
          <span className="flex size-9 items-center justify-center rounded-full bg-[#141414] text-[13px] font-semibold tracking-tight text-[#f6f4ef]">
            EÖ
          </span>
          <span className="leading-tight">
            <span className="block text-[15px] font-semibold tracking-tight">Ece Özenir</span>
            <span className="block text-xs text-[#6b665e]">Proje Yöneticisi</span>
          </span>
        </Link>

        {/* Masaüstü menü */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Ana menü">
          {MENU.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              aria-current={aktif(m.href) ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                aktif(m.href) ? "bg-[#141414] text-[#f6f4ef]" : "text-[#141414]/70 hover:bg-[#141414]/5 hover:text-[#141414]"
              }`}
            >
              {m.ad}
            </Link>
          ))}
          <Link
            href="/#iletisim"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-[#c2410c] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#9a3412]"
          >
            İletişim <ArrowUpRight className="size-4" />
          </Link>
        </nav>

        {/* Mobil menü düğmesi */}
        <button
          type="button"
          onClick={() => setAcik((a) => !a)}
          aria-expanded={acik}
          aria-label={acik ? "Menüyü kapat" : "Menüyü aç"}
          className="flex size-11 items-center justify-center rounded-full bg-[#141414] text-[#f6f4ef] md:hidden"
        >
          {acik ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobil menü */}
      {acik && (
        <nav className="fixed inset-x-0 top-16 bottom-0 z-50 flex flex-col overflow-y-auto bg-[#f6f4ef] px-5 pt-6 pb-10 md:hidden" aria-label="Mobil menü">
          {MENU.map((m, i) => (
            <Link
              key={m.href}
              href={m.href}
              className="foto-gir block py-4 text-3xl font-semibold tracking-tight"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <span className={aktif(m.href) ? "text-[#c2410c]" : ""}>{m.ad}</span>
            </Link>
          ))}
          <Link
            href="/#iletisim"
            className="mt-auto flex items-center justify-center gap-2 rounded-full bg-[#c2410c] py-4 text-base font-medium text-white"
          >
            İletişime geç <ArrowUpRight className="size-5" />
          </Link>
        </nav>
      )}
    </header>
  )
}
