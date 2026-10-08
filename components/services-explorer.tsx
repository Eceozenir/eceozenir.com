"use client"

import { useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Globe,
  Handshake,
  Mail,
  Phone,
  Plane,
  Plus,
  Server,
  ShoppingCart,
  Boxes,
  Smartphone,
  UtensilsCrossed,
} from "lucide-react"

type Cozum = { ikon: string; baslik: string; aciklama: string; detay?: string; maddeler: string[]; gorsel?: string }

const IKON = {
  sepet: ShoppingCart,
  restoran: UtensilsCrossed,
  b2b: Handshake,
  tur: Plane,
  web: Globe,
  mobil: Smartphone,
  erp: Boxes,
  sunucu: Server,
} as const

const VIDEO = /\.(mp4|webm|mov)$/i

// Görsel varsa onu, yoksa hizmete özel hareketli çizimi gösterir
function Ekran({ c }: { c: Cozum }) {
  if (c.gorsel) {
    return VIDEO.test(c.gorsel) ? (
      <video src={c.gorsel} autoPlay muted loop playsInline className="size-full object-cover" />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={c.gorsel} alt={c.baslik} referrerPolicy="no-referrer" className="size-full bg-white object-contain" />
    )
  }
  return <Mock ikon={c.ikon} />
}

const SURE = 8000 // otomatik geçiş süresi (ms)

// ── Her hizmete özel küçük ekran çizimleri ─────────────────────
function Mock({ ikon }: { ikon: string }) {
  const bar = (w: string, c = "bg-[#2a1708]/15") => <span className={`block h-2 rounded-full ${c}`} style={{ width: w }} />
  switch (ikon) {
    case "sepet":
      return (
        <div className="flex h-full flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            {bar("22%", "bg-[#2a1708]/30")}
            <span className="relative flex size-7 items-center justify-center rounded-full bg-[#2a1708] text-[#ffd24a]">
              <ShoppingCart className="size-3.5" />
              <span className="mock-pop absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-[#ff4f8b] text-[9px] font-bold text-white">3</span>
            </span>
          </div>
          <div className="grid flex-1 grid-cols-3 gap-2.5">
            {["from-[#ffc21a] to-[#ff8a1f]", "from-[#ff8a1f] to-[#ff4f8b]", "from-[#ff4f8b] to-[#ffc21a]"].map((g, i) => (
              <div key={i} className="mock-rise flex flex-col gap-1.5 rounded-lg bg-white p-2" style={{ animationDelay: `${i * 120}ms` }}>
                <div className={`flex-1 rounded-md bg-gradient-to-br ${g}`} />
                {bar("80%")}
                <span className="text-[10px] font-extrabold text-[#e8590c]">₺{(i + 2) * 149}</span>
              </div>
            ))}
          </div>
        </div>
      )
    case "restoran":
      return (
        <div className="flex h-full items-center justify-center gap-4 p-4">
          <div className="flex h-full w-[46%] flex-col gap-2 rounded-xl bg-white p-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold">MASA 4</span>
              <span className="rounded-full bg-[#fff0c2] px-1.5 text-[9px] font-bold text-[#b45309]">QR</span>
            </div>
            {["Mercimek çorbası", "Izgara köfte", "Künefe"].map((m, i) => (
              <div key={m} className="mock-rise flex items-center justify-between rounded-md bg-[#fff8ea] px-2 py-1.5" style={{ animationDelay: `${i * 120}ms` }}>
                <span className="text-[9px] font-semibold">{m}</span>
                <span className="text-[9px] font-extrabold text-[#e8590c]">+</span>
              </div>
            ))}
            <span className="mt-auto rounded-md bg-[#2a1708] py-1.5 text-center text-[9px] font-bold text-[#ffd24a]">Sipariş ver</span>
          </div>
          <div className="flex h-full flex-1 flex-col gap-2 rounded-xl bg-[#2a1708] p-3 text-[#fff8ea]">
            <span className="text-[10px] font-extrabold text-[#ffd24a]">MUTFAK</span>
            {[1, 2].map((i) => (
              <div key={i} className="mock-rise rounded-md bg-white/10 p-2" style={{ animationDelay: `${300 + i * 150}ms` }}>
                <span className="text-[9px] font-bold">#{40 + i} · Masa {i + 3}</span>
                <span className="mt-1 block h-1.5 w-3/4 rounded-full bg-white/20" />
              </div>
            ))}
          </div>
        </div>
      )
    case "b2b":
      return (
        <div className="flex h-full flex-col gap-2 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold">BAYİ SİPARİŞLERİ</span>
            {bar("18%", "bg-[#ff8a1f]")}
          </div>
          {[
            ["Ankara Bayi", "Onaylandı", "bg-[#d3f9d8] text-[#2b8a3e]"],
            ["İzmir Bayi", "Hazırlanıyor", "bg-[#fff0c2] text-[#b45309]"],
            ["Bursa Bayi", "Kargoda", "bg-[#ffe3ee] text-[#d6336c]"],
            ["Antalya Bayi", "Onaylandı", "bg-[#d3f9d8] text-[#2b8a3e]"],
          ].map(([ad, d, c], i) => (
            <div key={ad} className="mock-rise flex items-center gap-3 rounded-lg bg-white px-3 py-2" style={{ animationDelay: `${i * 100}ms` }}>
              <span className="size-5 rounded-md bg-gradient-to-br from-[#ffc21a] to-[#ff8a1f]" />
              <span className="flex-1 text-[10px] font-bold">{ad}</span>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${c}`}>{d}</span>
            </div>
          ))}
        </div>
      )
    case "tur":
      return (
        <div className="flex h-full gap-3 p-4">
          <div className="flex-1 rounded-xl bg-white p-3">
            <span className="text-[10px] font-extrabold">EKİM</span>
            <div className="mt-2 grid grid-cols-7 gap-1">
              {Array.from({ length: 28 }).map((_, i) => (
                <span
                  key={i}
                  className={`flex aspect-square items-center justify-center rounded text-[8px] font-bold ${
                    i >= 9 && i <= 12 ? "mock-pop bg-gradient-to-br from-[#ff8a1f] to-[#ff4f8b] text-white" : "bg-[#fff8ea] text-[#2a1708]/60"
                  }`}
                  style={i >= 9 && i <= 12 ? { animationDelay: `${(i - 9) * 90}ms` } : undefined}
                >
                  {i + 1}
                </span>
              ))}
            </div>
          </div>
          <div className="mock-rise flex w-[38%] flex-col overflow-hidden rounded-xl bg-white">
            <div className="h-1/2 bg-gradient-to-br from-[#4dabf7] via-[#ffc21a] to-[#ff8a1f]" />
            <div className="flex flex-1 flex-col gap-1.5 p-2.5">
              <span className="text-[10px] font-extrabold">Kapadokya Turu</span>
              {bar("70%")}
              <span className="mt-auto rounded-md bg-[#2a1708] py-1 text-center text-[9px] font-bold text-[#ffd24a]">Rezervasyon</span>
            </div>
          </div>
        </div>
      )
    case "mobil":
      return (
        <div className="flex h-full items-center justify-center gap-6 p-4">
          {[0, 1].map((k) => (
            <div
              key={k}
              className={`mock-rise flex h-[92%] w-[30%] flex-col gap-1.5 rounded-[18px] border-4 border-[#2a1708] bg-white p-2 ${k ? "translate-y-3 rotate-6" : "-rotate-6"}`}
              style={{ animationDelay: `${k * 150}ms` }}
            >
              <span className="mx-auto h-1 w-8 rounded-full bg-[#2a1708]/20" />
              <div className={`h-1/3 rounded-lg bg-gradient-to-br ${k ? "from-[#ff4f8b] to-[#ff8a1f]" : "from-[#ffc21a] to-[#ff8a1f]"}`} />
              {bar("80%")}
              {bar("60%")}
              <div className="mt-auto flex justify-around">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="size-2.5 rounded-full bg-[#2a1708]/20" />
                ))}
              </div>
            </div>
          ))}
        </div>
      )
    case "erp":
      return (
        <div className="flex h-full gap-3 p-4">
          <div className="flex w-1/4 flex-col gap-2 rounded-xl bg-[#2a1708] p-2.5">
            {["Muhasebe", "Stok", "Satış", "e-Fatura"].map((m, i) => (
              <span
                key={m}
                className={`mock-rise rounded-md px-1.5 py-1 text-[9px] font-bold ${i === 1 ? "bg-[#ffc21a] text-[#2a1708]" : "text-white/70"}`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {m}
              </span>
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-2.5">
            <div className="grid grid-cols-3 gap-2">
              {["₺248K", "1.204", "%18"].map((v, i) => (
                <div key={v} className="mock-rise rounded-lg bg-white p-2" style={{ animationDelay: `${i * 100}ms` }}>
                  {bar("60%")}
                  <span className="mt-1 block text-[11px] font-extrabold text-[#e8590c]">{v}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-1 items-end gap-1.5 rounded-lg bg-white p-2.5">
              {[40, 65, 50, 80, 60, 92, 75].map((h, i) => (
                <span
                  key={i}
                  className="mock-rise flex-1 rounded-t-sm bg-gradient-to-t from-[#ff8a1f] to-[#ffc21a]"
                  style={{ height: `${h}%`, animationDelay: `${i * 70}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      )
    case "sunucu":
      return (
        <div className="flex h-full flex-col justify-center gap-2.5 p-5">
          {["TR · İstanbul", "FR · Paris", "DE · Frankfurt"].map((l, i) => (
            <div key={l} className="mock-rise flex items-center gap-3 rounded-xl bg-[#2a1708] px-3 py-2.5" style={{ animationDelay: `${i * 120}ms` }}>
              <Server className="size-4 text-[#ffd24a]" />
              <span className="text-[10px] font-bold text-white/80">{l}</span>
              <span className="ml-auto flex items-center gap-1.5 text-[9px] font-bold text-[#4ade80]">
                <span className="size-1.5 animate-pulse rounded-full bg-[#4ade80]" /> AKTİF
              </span>
              <span className="h-1.5 w-16 overflow-hidden rounded-full bg-white/15">
                <span className="block h-full rounded-full bg-gradient-to-r from-[#ffc21a] to-[#ff4f8b]" style={{ width: `${45 + i * 18}%` }} />
              </span>
            </div>
          ))}
        </div>
      )
    default: // web
      return (
        <div className="flex h-full flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            {bar("16%", "bg-[#2a1708]/40")}
            <span className="flex gap-2">
              {bar("24px")}
              {bar("24px")}
              {bar("24px")}
            </span>
          </div>
          <div className="flex flex-1 gap-4">
            <div className="flex flex-1 flex-col justify-center gap-2">
              <span className="mock-rise block h-3.5 w-11/12 rounded-full bg-[#2a1708]/70" />
              <span className="mock-rise block h-3.5 w-3/4 rounded-full bg-[#2a1708]/70" style={{ animationDelay: "100ms" }} />
              {bar("90%")}
              {bar("70%")}
              <span className="mock-rise mt-1 h-5 w-20 rounded-md bg-gradient-to-r from-[#ff8a1f] to-[#ff4f8b]" style={{ animationDelay: "250ms" }} />
            </div>
            <div className="mock-rise w-2/5 rounded-xl bg-gradient-to-br from-[#ffc21a] via-[#ff8a1f] to-[#ff4f8b]" style={{ animationDelay: "150ms" }} />
          </div>
        </div>
      )
  }
}

// "Bilgi al": tıklayınca e-posta ve telefon kutusu açılır
function BilgiAl({ konu, eposta, telefon, mobil = false }: { konu: string; eposta: string; telefon?: string; mobil?: boolean }) {
  const [acik, setAcik] = useState(false)
  const kutuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!acik) return
    const kapat = (e: PointerEvent) => {
      if (kutuRef.current && !kutuRef.current.contains(e.target as Node)) setAcik(false)
    }
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAcik(false)
    document.addEventListener("pointerdown", kapat)
    document.addEventListener("keydown", esc)
    return () => {
      document.removeEventListener("pointerdown", kapat)
      document.removeEventListener("keydown", esc)
    }
  }, [acik])

  const mail = `mailto:${eposta}?subject=${encodeURIComponent(`${konu} hakkında bilgi almak istiyorum`)}`
  const tel = telefon ? `tel:+9${telefon.replace(/\D/g, "")}` : ""

  return (
    <div ref={kutuRef} className="relative">
      <button
        type="button"
        onClick={() => setAcik((a) => !a)}
        aria-expanded={acik}
        className="group inline-flex items-center gap-2 rounded-full bg-[#2a1708] px-5 py-2.5 text-sm font-bold text-white transition hover:scale-[1.03] focus-visible:ring-4 focus-visible:ring-[#ff8a1f]/40 focus-visible:outline-none"
      >
        Bilgi al <ArrowUpRight className={`size-4 transition-transform ${acik ? "rotate-45" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"}`} />
      </button>
      {acik && (
        <div
          className={`hizmet-giris z-20 rounded-2xl bg-white p-2 shadow-[0_25px_60px_-15px_rgba(42,23,8,0.45)] ring-1 ring-[#fbd99a] ${
            mobil ? "mt-3 w-full max-w-sm" : "absolute right-0 bottom-full mb-3 w-[320px]"
          }`}
        >
          <p className="px-3 pt-2 pb-1 text-xs font-bold text-[#2a1708]/50">{konu} için bana ulaşın</p>
          <a href={mail} className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-[#fff8ea]">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ffc21a] to-[#ff8a1f] text-[#2a1708]">
              <Mail className="size-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] font-bold text-[#2a1708]/50">E-posta</span>
              <span className="block truncate text-sm font-extrabold text-[#2a1708]">{eposta}</span>
            </span>
          </a>
          {telefon && (
            <a href={tel} className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-[#fff8ea]">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ff8a1f] to-[#ff4f8b] text-white">
                <Phone className="size-4" />
              </span>
              <span>
                <span className="block text-[11px] font-bold text-[#2a1708]/50">Telefon</span>
                <span className="block text-sm font-extrabold text-[#2a1708]">{telefon}</span>
              </span>
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export function ServicesExplorer({
  cozumler,
  eposta,
  telefon,
}: {
  cozumler: Cozum[]
  eposta: string
  telefon?: string
}) {
  const [aktif, setAktif] = useState(0)
  const [oto, setOto] = useState(true)
  const [masaustu, setMasaustu] = useState(false)
  const [mobilAcik, setMobilAcik] = useState<number | null>(0) // mobilde açık olan hizmet (null = hepsi kapalı)
  const barRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const guncelle = () => setMasaustu(mq.matches)
    guncelle()
    mq.addEventListener("change", guncelle)
    return () => mq.removeEventListener("change", guncelle)
  }, [])

  // Masaüstünde, kullanıcı dokunana kadar hizmetler sırayla değişir (mobilde değişmez)
  useEffect(() => {
    if (!oto || !masaustu) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setTimeout(() => setAktif((a) => (a + 1) % cozumler.length), SURE)
    return () => window.clearTimeout(id)
  }, [aktif, oto, masaustu, cozumler.length])

  const sec = (i: number) => {
    setOto(false)
    setAktif(i)
  }

  const c = cozumler[aktif]
  const Ikon = IKON[c.ikon as keyof typeof IKON] ?? Globe

  return (
    <section id="cozumler" className="relative overflow-hidden">
      <div aria-hidden className="float-blob pointer-events-none absolute -right-40 top-20 size-[520px] rounded-full bg-[#ff4f8b]/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-6 sm:py-32">
        {/* Başlık */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="max-w-2xl text-4xl leading-[1] font-extrabold tracking-tight text-balance sm:text-6xl">
              İşletmeniz için{" "}
              <span className="vurgu">
                ne yapabiliriz?
              </span>
            </h2>
          </div>
          <p className="max-w-sm font-semibold text-[#2a1708]/60">
            {cozumler.length} farklı alanda uçtan uca çözüm. Birini seçin, nasıl görüneceğine bakın.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          {/* ── Sol: hizmet listesi ── */}
          <ol className="border-t border-[#2a1708]/10">
            {cozumler.map((s, i) => {
              const secili = masaustu ? i === aktif : mobilAcik === i
              return (
                <li key={s.baslik} className="border-b border-[#2a1708]/10">
                  <button
                    type="button"
                    onClick={() => {
                      sec(i)
                      // Mobil: açık olana tekrar dokununca kapanır
                      setMobilAcik((m) => (m === i ? null : i))
                    }}
                    onMouseEnter={() => window.matchMedia("(hover: hover)").matches && sec(i)}
                    aria-expanded={secili}
                    className="group relative flex w-full items-center gap-4 py-5 text-left sm:gap-6 sm:py-6"
                  >
                    <span className={`w-8 text-sm font-bold tabular-nums transition-colors ${secili ? "text-[#e8590c]" : "text-[#2a1708]/35"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex-1 text-2xl font-extrabold tracking-tight text-balance transition-all duration-500 sm:text-3xl xl:text-4xl ${
                        secili
                          ? "translate-x-1 text-[#e8590c]"
                          : "text-[#2a1708]/45 group-hover:text-[#2a1708]"
                      }`}
                    >
                      {s.baslik}
                    </span>
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                        secili ? "rotate-0 bg-[#2a1708] text-[#ffd24a]" : "lg:-rotate-45 bg-transparent text-[#2a1708]/40 ring-1 ring-[#2a1708]/15"
                      }`}
                    >
                      <span className="hidden lg:block">
                        <ArrowRight className="size-4" />
                      </span>
                      <span className="lg:hidden">
                        <Plus className={`size-4 transition-transform ${secili ? "rotate-45" : ""}`} />
                      </span>
                    </span>
                    {/* Otomatik geçiş çubuğu */}
                    {secili && oto && masaustu && (
                      <span className="absolute inset-x-0 -bottom-px h-0.5 overflow-hidden">
                        <span
                          ref={barRef}
                          key={aktif}
                          className="hizmet-sure block h-full origin-left bg-gradient-to-r from-[#ffc21a] via-[#ff8a1f] to-[#ff4f8b]"
                          style={{ animationDuration: `${SURE}ms` }}
                        />
                      </span>
                    )}
                  </button>

                  {/* Mobil: seçilen hizmet listenin içinde açılır */}
                  <div className={`grid transition-all duration-500 lg:hidden ${secili ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-[#fff0c2]">
                        {secili && <Ekran c={s} />}
                      </div>
                      <p className="mt-4 font-semibold leading-relaxed text-[#2a1708]">{s.aciklama}</p>
                      {s.detay && <p className="mt-2 leading-relaxed text-[#2a1708]/70">{s.detay}</p>}
                      <ul className="mt-4 space-y-1.5 text-sm font-semibold">
                        {s.maddeler.map((m) => (
                          <li key={m} className="flex items-center gap-2">
                            <Check className="size-4 text-[#e8590c]" /> {m}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5">
                        <BilgiAl konu={s.baslik} eposta={eposta} telefon={telefon} mobil />
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>

          {/* ── Sağ: seçilen hizmetin büyük önizlemesi (masaüstü) ── */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="rounded-[32px] bg-gradient-to-br from-[#ffc21a] via-[#ff8a1f] to-[#ff4f8b] p-[2px]">
                <div key={aktif} className="hizmet-giris rounded-[30px] bg-[#fff8ea] p-6">
                  {/* Önizleme ekranı */}
                  <div className="overflow-hidden rounded-2xl bg-[#2a1708] p-2">
                    <div className="flex items-center gap-1.5 px-2 pb-2">
                      <span className="size-2 rounded-full bg-[#ff5f57]" />
                      <span className="size-2 rounded-full bg-[#febc2e]" />
                      <span className="size-2 rounded-full bg-[#28c840]" />
                      <span className="ml-3 text-[10px] font-semibold text-white/40">{c.baslik.toLocaleLowerCase("tr-TR").replace(/\s+/g, "-")}.webadasi</span>
                    </div>
                    <div className="aspect-[16/10] overflow-hidden rounded-xl bg-[#fff0c2]">
                      <Ekran c={c} />
                    </div>
                  </div>

                  <div className="mt-6 flex items-start gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#2a1708] text-[#ffd24a]">
                      <Ikon className="size-6" />
                    </span>
                    <div>
                      <h3 className="text-2xl font-extrabold tracking-tight">{c.baslik}</h3>
                      <p className="mt-1 font-semibold leading-relaxed text-[#2a1708]/85">{c.aciklama}</p>
                    </div>
                  </div>
                  {c.detay && <p className="mt-4 leading-relaxed text-[#2a1708]/70">{c.detay}</p>}

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                    <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
                      {c.maddeler.map((m) => (
                        <li key={m} className="inline-flex items-center gap-1.5 text-sm font-bold">
                          <Check className="size-3.5 text-[#e8590c]" /> {m}
                        </li>
                      ))}
                    </ul>
                    <BilgiAl konu={c.baslik} eposta={eposta} telefon={telefon} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
