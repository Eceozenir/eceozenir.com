import Link from "next/link"
import { MENU } from "./menu"
import { firma, iletisim, tosfed } from "@/app/bilgilerim"

export function SiteFooter() {
  const tel = iletisim.telefon ? `tel:+9${iletisim.telefon.replace(/\D/g, "")}` : ""
  return (
    <footer className="mt-24 bg-[#141414] text-[#f6f4ef]">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-2xl font-semibold tracking-tight">Ece Özenir</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#f6f4ef]/60">
            Proje Yöneticisi, {firma.ad}.
            <br />
            {tosfed.rol}, {tosfed.kurum}.
          </p>
        </div>
        <div>
          <p className="text-sm text-[#f6f4ef]/45">Sayfalar</p>
          <ul className="mt-4 space-y-2 text-sm">
            {MENU.map((m) => (
              <li key={m.href}>
                <Link href={m.href} className="text-[#f6f4ef]/80 transition-colors hover:text-white">
                  {m.ad}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm text-[#f6f4ef]/45">İletişim</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${iletisim.eposta}`} className="text-[#f6f4ef]/80 transition-colors hover:text-white">
                {iletisim.eposta}
              </a>
            </li>
            {tel && (
              <li>
                <a href={tel} className="mono text-[#f6f4ef]/80 transition-colors hover:text-white">
                  {iletisim.telefon}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-5 pb-10 text-xs text-[#f6f4ef]/40 sm:px-8">
        <span>© {new Date().getFullYear()} Ece Özenir</span>
        <span>Tüm hakları saklıdır.</span>
      </div>
    </footer>
  )
}
