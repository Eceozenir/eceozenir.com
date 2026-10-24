import Link from "next/link"
import { MENU } from "./menu"
import { icerik } from "@/lib/dil"
import { doldur } from "@/lib/sozluk"
import { InstagramIkon } from "./instagram-ikon"

export async function SiteFooter() {
  const { v, t } = await icerik()
  const { firma, iletisim } = v
  const tel = iletisim.telefon ? `tel:+9${iletisim.telefon.replace(/\D/g, "")}` : ""
  return (
    <footer className="mt-24 bg-black text-[#fbfaf6]">
      <div className="mx-auto max-w-6xl px-5 pt-20 sm:px-8">
        <p className="text-sm tracking-[0.06em] text-[#fbfaf6]/50 uppercase">{t.birProjenizMiVar}</p>
        <a
          href={`mailto:${iletisim.eposta}`}
          data-miknatis
          className="mt-4 inline-block text-[clamp(32px,6vw,72px)] leading-none font-light tracking-[-0.04em] transition-colors hover:text-[#e6cdb6]"
        >
          {iletisim.eposta}
        </a>
      </div>
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-2xl font-semibold tracking-tight">Ece Özenir</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#fbfaf6]/60">
            {doldur(t.rolFirma, { firma: firma.ad })}
          </p>
          <a
            href={firma.site || "https://webadasi.com"}
            target="_blank"
            rel="noopener noreferrer"
            data-miknatis
            aria-label={doldur(t.webSitesi, { ad: firma.ad })}
            className="group mt-8 inline-flex rounded-2xl bg-[#fbfaf6]/[0.05] px-6 py-5 ring-1 ring-[#fbfaf6]/10 transition-colors hover:bg-[#fbfaf6]/[0.09]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/webadasi-logo-acik.png"
              alt={firma.ad}
              loading="lazy"
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-[1.03] sm:h-12"
            />
          </a>
        </div>
        <div>
          <p className="text-sm text-[#fbfaf6]/45">{t.sayfalar}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {MENU.map((m) => (
              <li key={m.href}>
                <Link href={m.href} className="text-[#fbfaf6]/80 transition-colors hover:text-white">
                  {t[m.anahtar]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm text-[#fbfaf6]/45">{t.iletisim}</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${iletisim.eposta}`} className="text-[#fbfaf6]/80 transition-colors hover:text-white">
                {iletisim.eposta}
              </a>
            </li>
            {tel && (
              <li>
                <a href={tel} className="mono text-[#fbfaf6]/80 transition-colors hover:text-white">
                  {iletisim.telefon}
                </a>
              </li>
            )}
            {iletisim.instagram && (
              <li>
                <a
                  href={iletisim.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#fbfaf6]/80 transition-colors hover:text-white"
                >
                  <InstagramIkon className="size-4" /> @eceozenirr
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-5 pb-10 text-xs text-[#fbfaf6]/40 sm:px-8">
        <span>© {new Date().getFullYear()} Ece Özenir</span>
        <span>{t.haklar}</span>
      </div>
    </footer>
  )
}
