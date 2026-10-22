"use client"

import { useState } from "react"
import {
  ArrowUpRight,
  Boxes,
  Check,
  Globe,
  Handshake,
  Mail,
  Phone,
  Plane,
  Plus,
  Server,
  ShoppingCart,
  Smartphone,
  UtensilsCrossed,
} from "lucide-react"

type Hizmet = { ikon: string; baslik: string; aciklama: string; detay?: string; maddeler: string[]; gorsel?: string }

const IKON = {
  sepet: ShoppingCart,
  restoran: UtensilsCrossed,
  b2b: Handshake,
  erp: Boxes,
  tur: Plane,
  web: Globe,
  sunucu: Server,
  mobil: Smartphone,
} as const

// Webadası hizmetleri: solda liste, sağda seçilen hizmetin ayrıntılı paneli.
// Telefonda dokununca açılan liste olur.
export function HizmetVitrini({
  hizmetler,
  firmaAd,
  eposta,
  telefon,
}: {
  hizmetler: Hizmet[]
  firmaAd: string
  eposta: string
  telefon?: string
}) {
  const [secili, setSecili] = useState(0)
  const [mobilAcik, setMobilAcik] = useState<number | null>(0)
  const tel = telefon ? `tel:+9${telefon.replace(/\D/g, "")}` : ""
  const mail = (b: string) => `mailto:${eposta}?subject=${encodeURIComponent(`${b} hakkında bilgi almak istiyorum`)}`

  const Panel = ({ h }: { h: Hizmet }) => {
    const Ikon = IKON[h.ikon as keyof typeof IKON] ?? Globe
    return (
      <div className="foto-gir overflow-hidden rounded-2xl bg-[#fbfaf6] text-[#141414]">
        <div className="relative aspect-[16/10] bg-[#f1ece4]">
          {h.gorsel ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={h.gorsel} alt={h.baslik} referrerPolicy="no-referrer" className="size-full object-contain p-4 sm:p-6" />
          ) : (
            <div className="flex size-full items-center justify-center">
              <span className="flex size-24 items-center justify-center rounded-3xl bg-[#4a2b1d] text-[#fbfaf6]">
                <Ikon className="size-11" />
              </span>
            </div>
          )}
        </div>
        <div className="p-6 sm:p-8">
          <p className="text-[clamp(20px,1.8vw,24px)] leading-snug font-light">{h.aciklama}</p>
          {h.detay && <p className="mt-4 leading-relaxed text-[#6b665e]">{h.detay}</p>}
          <ul className="mt-6 grid gap-x-6 gap-y-2.5 text-[15px] sm:grid-cols-2">
            {h.maddeler.map((m) => (
              <li key={m} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#4a2b1d] text-[#fbfaf6]">
                  <Check className="size-3" />
                </span>
                {m}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={mail(h.baslik)}
              data-miknatis
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#141414] px-6 py-3.5 text-[13px] tracking-[0.06em] text-[#fbfaf6] uppercase transition-colors hover:bg-[#4a2b1d]"
            >
              <Mail className="size-4" /> Bilgi al
            </a>
            {tel && (
              <a
                href={tel}
                data-miknatis
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#141414]/[0.06] px-6 py-3.5 text-[13px] tracking-[0.06em] uppercase transition-colors hover:bg-[#141414]/[0.1]"
              >
                <Phone className="size-4" /> Hemen ara
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="px-2 pt-24 sm:px-3 sm:pt-32">
      <div className="rounded-2xl bg-[#4a2b1d] px-5 py-16 text-[#fbfaf6] sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-6xl">
          {/* Başlık */}
          <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <h2 className="text-[clamp(38px,5.6vw,80px)] leading-[0.98] font-light">
              {firmaAd} ile neler yapıyoruz?
            </h2>
            <p className="text-lg leading-relaxed text-[#fbfaf6]/70 lg:pb-2">
              İşletmelere fikirden canlıya kadar uçtan uca yazılım çözümleri. Bir alan seçin, ne sunduğumuza yakından bakın.
            </p>
          </div>

          {/* Masaüstü: liste + panel */}
          <div className="mt-14 hidden gap-12 lg:grid lg:grid-cols-[1fr_1.25fr]">
            <ul className="flex flex-col">
              {hizmetler.map((h, i) => {
                const Ikon = IKON[h.ikon as keyof typeof IKON] ?? Globe
                const aktif = i === secili
                return (
                  <li key={h.baslik}>
                    <button
                      type="button"
                      onClick={() => setSecili(i)}
                      onMouseEnter={() => setSecili(i)}
                      aria-pressed={aktif}
                      className={`group flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left transition-colors duration-300 ${
                        aktif ? "bg-[#fbfaf6]/10" : "hover:bg-[#fbfaf6]/5"
                      }`}
                    >
                      <span
                        className={`flex size-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                          aktif ? "bg-[#fbfaf6] text-[#4a2b1d]" : "bg-[#fbfaf6]/10 text-[#fbfaf6]/60"
                        }`}
                      >
                        <Ikon className="size-[18px]" />
                      </span>
                      <span
                        className={`flex-1 text-[clamp(22px,2vw,30px)] leading-tight font-light transition-colors duration-300 ${
                          aktif ? "text-[#fbfaf6]" : "text-[#fbfaf6]/45 group-hover:text-[#fbfaf6]/80"
                        }`}
                      >
                        {h.baslik}
                      </span>
                      <ArrowUpRight
                        className={`size-5 transition-all duration-300 ${aktif ? "rotate-45 text-[#fbfaf6] opacity-100" : "opacity-0"}`}
                      />
                    </button>
                  </li>
                )
              })}
            </ul>
            <div className="sticky top-28 self-start">
              <Panel key={secili} h={hizmetler[secili]} />
            </div>
          </div>

          {/* Telefon: açılır liste */}
          <ul className="mt-10 space-y-2 lg:hidden">
            {hizmetler.map((h, i) => {
              const Ikon = IKON[h.ikon as keyof typeof IKON] ?? Globe
              const acik = mobilAcik === i
              return (
                <li key={h.baslik} className={`rounded-xl transition-colors ${acik ? "bg-[#fbfaf6]/10" : ""}`}>
                  <button
                    type="button"
                    onClick={() => setMobilAcik(acik ? null : i)}
                    aria-expanded={acik}
                    className="flex w-full items-center gap-3 px-3 py-4 text-left"
                  >
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full ${
                        acik ? "bg-[#fbfaf6] text-[#4a2b1d]" : "bg-[#fbfaf6]/10 text-[#fbfaf6]/70"
                      }`}
                    >
                      <Ikon className="size-4" />
                    </span>
                    <span className={`flex-1 text-[22px] leading-tight font-light ${acik ? "" : "text-[#fbfaf6]/70"}`}>{h.baslik}</span>
                    <Plus className={`size-5 shrink-0 transition-transform duration-300 ${acik ? "rotate-45" : ""}`} />
                  </button>
                  {acik && (
                    <div className="px-2 pb-3">
                      <Panel h={h} />
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
