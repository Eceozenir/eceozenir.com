import {
  ArrowRight,
  ArrowUpRight,
  Globe,
  Handshake,
  Mail,
  Phone,
  Plane,
  ShoppingCart,
  Smartphone,
  UtensilsCrossed,
} from "lucide-react"
import MetroHero from "@/components/ui/scroll-locked-video-hero"
import { Reveal } from "@/components/reveal"
import { ProjectsShowcase } from "@/components/projects-showcase"
import { GiantStatement } from "@/components/air-sections"
import { Certificate3D } from "@/components/cert-3d"
import { ServicesExplorer } from "@/components/services-explorer"
import { Anton, Caveat } from "next/font/google"
import { Kartvizit } from "@/components/business-card"
import { Journey } from "@/components/journey"
import fs from "node:fs"
import path from "node:path"
import { Check, CodeXml, ImagePlus, SquareKanban, Users, Wrench } from "lucide-react"
import {
  cozumler,
  fotograf,
  deneyim,
  egitim,
  firma,
  giris,
  hakkimda,
  iletisim,
  projeler,
  rakamlar,
  sertifikalar,
  yetkinlikler,
  kartvizit,
} from "./bilgilerim"

// Ayçiçeği tonları: sarı → turuncu → pembe
const GRADIENT = "bg-gradient-to-r from-[#ffc21a] via-[#ff8a1f] to-[#ff4f8b]"
const GRADIENT_SICAK = "bg-gradient-to-br from-[#f76707] to-[#e64980]"
const GRADIENT_TEXT = "vurgu"

const IKONLAR = {
  sepet: ShoppingCart,
  restoran: UtensilsCrossed,
  b2b: Handshake,
  tur: Plane,
  web: Globe,
  mobil: Smartphone,
} as const

// Dev başlık ve el yazısı vurgu için yazı tipleri
const anton = Anton({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-anton" })
const caveat = Caveat({ subsets: ["latin", "latin-ext"], weight: ["600", "700"], variable: "--font-caveat" })

const YETKINLIK_IKONLARI = {
  yonetim: SquareKanban,
  kod: CodeXml,
  arac: Wrench,
  ekip: Users,
} as const

// Yolculuk duraklarını eskiden yeniye sıralar (tarihteki ilk yıla göre).
// Yılı belli olmayanlar sona, "Bugün" içerenler en sona gelir.
function siralaYolculuk<T extends { tarih: string }>(liste: T[]): T[] {
  const anahtar = (t: string) => {
    // "Bugün" olanlar (şu anki işler) en sona; tarihi henüz yazılmamışlar onlardan hemen önce
    if (/bugün/i.test(t)) return 9999
    const yil = t.match(/(19|20)\d{2}/)
    return yil ? Number(yil[0]) : 5000
  }
  return [...liste].sort((a, b) => anahtar(a.tarih) - anahtar(b.tarih))
}

function BolumBasligi({ baslik }: { baslik: string }) {
  return (
    <Reveal className="mb-12">
      <h2 className="text-4xl font-extrabold tracking-tight text-balance text-[#2a1708] sm:text-5xl">
        {baslik}
      </h2>
    </Reveal>
  )
}

export default function Home() {
  const fotografVar = fs.existsSync(path.join(process.cwd(), "public", fotograf))
  const seritYazilari = ["Proje Yönetimi", ...cozumler.map((c) => c.baslik), firma.ad]

  return (
    <main className={`${anton.variable} ${caveat.variable} overflow-x-clip bg-[#fff8ea] text-[#2a1708]`}>
      <MetroHero
        videoSrc={giris.video}
        title={giris.baslik}
        subtitle={giris.altBaslik}
        subtitleHighlight={giris.altBaslikVurgu}
        scrollHint="KAYDIR"
        taglineEyebrow={giris.etiket}
        tagline={giris.slogan}
        taglineHighlight={giris.sloganVurgu}
        scrubDistance={5000}
      />

      {/* HAKKIMDA */}
      <section id="hakkimda" className="relative overflow-hidden">
        <div
          aria-hidden
          className="float-blob pointer-events-none absolute -top-40 -right-40 size-[520px] rounded-full bg-[#ffc21a]/35 blur-3xl"
        />
        <div
          aria-hidden
          className="float-blob pointer-events-none absolute -bottom-40 -left-40 size-[520px] rounded-full bg-[#ff4f8b]/20 blur-3xl [animation-delay:-6s]"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 sm:py-32 md:grid-cols-[1fr_minmax(0,420px)] md:gap-16">
          {/* FOTOĞRAF — public klasörüne koyduğun fotoğraf burada görünür */}
          <Reveal className="order-first md:order-last">
            <div className="relative mx-auto w-full max-w-[340px] md:max-w-none">
              <div aria-hidden className={`absolute inset-0 translate-x-4 translate-y-4 rounded-[32px] ${GRADIENT}`} />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-[#fff0c2] ring-1 ring-[#2a1708]/10">
                {fotografVar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={fotograf} alt="Ece Özenir" className="size-full object-cover" />
                ) : (
                  <div className="flex size-full flex-col items-center justify-center gap-3 border-2 border-dashed border-[#f59f00]/50 p-8 text-center text-[#2a1708]/60">
                    <ImagePlus className="size-10 text-[#e8590c]" />
                    <p className="font-bold text-[#2a1708]/80">Fotoğrafın burada görünecek</p>
                    <p className="text-sm">
                      Fotoğrafını <code className="rounded bg-white/70 px-1.5 py-0.5">public</code> klasörüne{" "}
                      <code className="rounded bg-white/70 px-1.5 py-0.5">{fotograf.replace("/", "")}</code> adıyla koy.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-2xl leading-snug font-semibold text-balance sm:text-4xl">
                <span className={GRADIENT_TEXT}>Merhaba, ben Ece.</span> {hakkimda}
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#2a1708]/70 sm:text-xl">
                {firma.metin.split(firma.ad).map((parca, i, arr) => (
                  <span key={i}>
                    {parca}
                    {i < arr.length - 1 && <strong className="font-bold text-[#e8590c]">{firma.ad}</strong>}
                  </span>
                ))}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* RAKAMLAR */}
      <section className={`${GRADIENT} text-[#2a1708]`}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-24 gap-y-10 px-6 py-16">
          {rakamlar.map((r, i) => (
            <Reveal key={r.aciklama} delay={i * 120} className="text-center">
              <p className="text-5xl font-extrabold tracking-tight sm:text-6xl">{r.deger}</p>
              <p className="mt-2 text-sm font-semibold text-[#2a1708]/75">{r.aciklama}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* KAYAN ŞERİT */}
      <div className="overflow-hidden border-y border-[#2a1708]/10 bg-[#2a1708] py-5" aria-hidden>
        <div className="marquee-track flex w-max">
          {[0, 1].map((kopya) => (
            <div key={kopya} className="flex shrink-0 items-center">
              {seritYazilari.map((y, i) => (
                <span key={i} className="flex items-center text-2xl font-extrabold tracking-tight whitespace-nowrap sm:text-3xl">
                  <span className={`px-10 ${i % 2 === 0 ? "text-white" : GRADIENT_TEXT}`}>{y}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ÇÖZÜMLER — WEBADASI: solda liste, sağda seçilen hizmetin canlı önizlemesi */}
      <ServicesExplorer cozumler={cozumler} eposta={iletisim.eposta} telefon={iletisim.telefon} />


      {/* DEV YAZI */}
      <GiantStatement satirlar={["Fikirden", "teslimata"]} />

      {/* PROJELER — ilk 4 proje; devamı /projeler sayfasında */}
      <ProjectsShowcase projeler={projeler.slice(0, 4)} toplam={projeler.length} devamLink="/projeler" />

      {/* YOLCULUĞUM — deneyim + eğitim */}
      <section id="yolculuk" className="relative overflow-hidden bg-white">
        <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-6 sm:py-32">
          <Reveal className="mb-16 text-center md:mb-24">
            <h2 className="text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
              Bugüne kadarki <span className={GRADIENT_TEXT}>yolculuğum</span>
            </h2>
          </Reveal>
          <Journey
            duraklar={siralaYolculuk([
              ...deneyim.map((d) => ({
                tur: "is" as const,
                tarih: d.tarih,
                baslik: d.rol,
                alt: d.sirket,
                aciklama: d.aciklama,
              })),
              ...egitim.map((e) => ({
                tur: "okul" as const,
                tarih: e.tarih,
                baslik: e.okul,
                alt: e.bolum,
                aciklama: e.not,
              })),
              ...sertifikalar.map((c) => ({
                tur: "sertifika" as const,
                tarih: c.tarih,
                baslik: c.ad,
                alt: c.kurum,
                aciklama: c.aciklama,
              })),
            ])}
          />
        </div>
      </section>

      {/* SERTİFİKA — fareyle çevrilen 3B kart */}
      {sertifikalar
        .filter((c) => c.gorsel)
        .map((c) => (
          <section key={c.ad} id="sertifika" className="relative overflow-hidden">
            <div aria-hidden className="float-blob pointer-events-none absolute top-1/3 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-[#ffc21a]/25 blur-3xl" />
            <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-6 sm:py-32">
              <div className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,540px)_1fr] lg:gap-10">
                {/* Sol yazı */}
                <Reveal className="text-center lg:text-right">
                  <h2 className="text-4xl leading-[1] font-extrabold tracking-tight text-balance sm:text-5xl">
                    <span className={GRADIENT_TEXT}>{c.ad}</span>
                  </h2>
                  <p className="mt-4 text-lg font-semibold text-[#2a1708]/70">{c.kurum}</p>
                  <p className="mt-6 text-lg font-extrabold text-[#e8590c]">{c.tarih}</p>
                </Reveal>

                {/* Ortada 3B sertifika */}
                <Certificate3D gorsel={c.gorsel} baslik={c.ad} kurum={c.kurum} detay={c.aciklama} tarih={c.tarih} />

                {/* Sağ yazı */}
                <Reveal delay={150} className="text-center lg:text-left">
                  {c.saat && (
                    <>
                      <p className="text-[64px] leading-none font-extrabold tracking-tight sm:text-[80px]">
                        <span className={GRADIENT_TEXT}>{c.saat}</span>
                      </p>
                      <p className="mt-1 text-sm font-bold tracking-[0.15em] text-[#2a1708]/50">SAATLİK EĞİTİM</p>
                    </>
                  )}
                  {c.aciklama && <p className="mx-auto mt-6 max-w-xs leading-relaxed text-[#2a1708]/70 lg:mx-0">{c.aciklama}</p>}
                </Reveal>
              </div>
            </div>
          </section>
        ))}

      {/* UZMANLIK ALANLARIM — yetkinlikler */}
      <section id="yetkinlikler" className="mx-auto max-w-6xl px-5 pb-24 sm:px-6 sm:pb-32">
        <BolumBasligi baslik="Uzmanlık alanlarım" />
        <div className="grid gap-5 md:grid-cols-3 md:grid-rows-2">
          {yetkinlikler.map((g, i) => {
            const Ikon = YETKINLIK_IKONLARI[g.ikon as keyof typeof YETKINLIK_IKONLARI] ?? Check
            const buyuk = i === 0
            return (
              <Reveal key={g.baslik} delay={i * 100} className={buyuk ? "md:row-span-2" : i === 3 ? "md:col-span-2" : ""}>
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] p-7 transition duration-500 hover:-translate-y-1 sm:p-8 ${
                    buyuk
                      ? "bg-[#2a1708] text-[#fff8ea]"
                      : "bg-white ring-1 ring-[#fbd99a] hover:shadow-[0_25px_50px_-25px_rgba(232,89,12,0.5)]"
                  }`}
                >
                  {/* Üstte ince renkli çizgi, üzerine gelince dolar */}
                  <div className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${GRADIENT}`} />
                  {buyuk && (
                    <div aria-hidden className="pointer-events-none absolute -right-20 -bottom-20 size-72 rounded-full bg-[#ff8a1f]/25 blur-3xl" />
                  )}

                  <div className="relative flex items-center justify-between">
                    <span
                      className={`flex size-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6 ${
                        buyuk ? "bg-[#ffc21a] text-[#2a1708]" : "bg-[#fff0c2] text-[#e8590c]"
                      }`}
                    >
                      <Ikon className="size-6" />
                    </span>
                    <span className={`text-sm font-bold tabular-nums ${buyuk ? "text-[#fff8ea]/40" : "text-[#2a1708]/30"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className={`relative mt-6 font-extrabold tracking-tight ${buyuk ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
                    {g.baslik}
                  </h3>
                  <p className={`relative mt-2 leading-relaxed ${buyuk ? "text-[#fff8ea]/70" : "text-[#2a1708]/65"}`}>
                    {g.aciklama}
                  </p>

                  <ul className={`relative mt-6 flex flex-wrap gap-x-5 gap-y-2 ${buyuk ? "md:mt-auto md:pt-10" : ""}`}>
                    {g.maddeler.map((m, j) => (
                      <li
                        key={j}
                        className={`inline-flex items-center gap-1.5 text-sm font-semibold ${buyuk ? "text-[#fff8ea]" : "text-[#2a1708]"}`}
                      >
                        <Check className={`size-3.5 ${buyuk ? "text-[#ffc21a]" : "text-[#e8590c]"}`} />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* İLETİŞİM */}
      <section id="iletisim" className="px-4 pb-4 sm:px-6 sm:pb-6">
        <Reveal>
          <div className={`relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] px-8 py-20 text-[#2a1708] sm:px-16 sm:py-28 ${GRADIENT}`}>
            <div aria-hidden className="float-blob pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-white/30 blur-3xl" />
            <div className="relative grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <div>
            <h2 className="relative max-w-3xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl xl:text-6xl">
              Projeniz mi var? Birlikte hayata geçirelim.
            </h2>
            <p className="relative mt-4 max-w-2xl text-lg text-[#2a1708]/80">
              E-ticaret, restoran otomasyonu, B2B ya da tur şirketiniz için bilgi almak isterseniz yazmanız yeterli.
            </p>
            <div className="relative mt-10 flex flex-wrap gap-4">
              <a
                href={`mailto:${iletisim.eposta}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#2a1708] px-6 py-3 text-sm font-bold text-white transition hover:scale-[1.03] focus-visible:ring-4 focus-visible:ring-[#2a1708]/40 focus-visible:outline-none"
              >
                <Mail className="size-4" /> {iletisim.eposta}
              </a>
              {iletisim.telefon && (
                <a
                  href={`tel:${iletisim.telefon.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#2a1708]/60 px-6 py-3 text-sm font-bold transition hover:bg-[#2a1708]/10 focus-visible:ring-4 focus-visible:ring-[#2a1708]/40 focus-visible:outline-none"
                >
                  <Phone className="size-4" /> {iletisim.telefon}
                </a>
              )}
            </div>
            </div>
            {/* Kartvizit */}
            <div className="relative mx-auto w-full max-w-[520px]">
              <Kartvizit on={kartvizit.on} arka={kartvizit.arka} />
            </div>
            </div>
          </div>
        </Reveal>
        <footer className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-2 pt-8 pb-4 text-sm text-[#2a1708]/50">
          <span>© {new Date().getFullYear()} Ece Özenir</span>
          {firma.site ? (
            <a href={firma.site} target="_blank" rel="noopener noreferrer" className="hover:text-[#e8590c]">
              {firma.ad}
            </a>
          ) : (
            <span>{firma.ad}</span>
          )}
        </footer>
      </section>
    </main>
  )
}
