import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ArrowUpRight, Mail, Phone, Plus } from "lucide-react"
import { DevBaslik } from "./dev-baslik"
import { Reveal } from "@/components/reveal"
import { ProjeOnizleme } from "@/components/project-preview"
import { Kartvizit } from "@/components/business-card"
import { Certificate3D } from "@/components/cert-3d"
import {
  cozumler,
  deneyim,
  egitim,
  firma,
  fotograf,
  giris,
  hakkimda,
  iletisim,
  katkilar,
  kartvizit,
  projeler,
  rakamlar,
  sertifikalar,
  yetkinlikler,
} from "../bilgilerim"

// İkinci arayüz (/giris): "Creative Giants" tarzı editoryal tema.
// Krem kâğıt zemin, siyah yazı, ince (300) dev başlıklar, köşesiz görseller,
// siyah hap düğmeler. Renk sadece küçük dokunuşlarda: nane, şeker pembesi, pudra mavisi, lacivert.
// İçerikler ana sayfayla aynı: hepsi app/bilgilerim.ts dosyasından gelir.

export const metadata: Metadata = { title: "Ece Özenir — Proje Yöneticisi" }

const inter = Inter({ subsets: ["latin", "latin-ext"], weight: ["300", "400"], variable: "--font-giris" })

const TONLAR = ["#a5ebd6", "#ffacea", "#a5c8eb", "#101731"] // nane, şeker pembesi, pudra mavisi, lacivert
const alanAdi = (link: string) => link.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")

function yilAnahtari(t: string) {
  if (/bugün/i.test(t)) return 9999
  const y = t.match(/(19|20)\d{2}/)
  return y ? Number(y[0]) : 5000
}

// Bölüm açılış başlığı: ince, büyük, sola yaslı
function Baslik({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <Reveal>
      <h2 className={`max-w-5xl text-[clamp(38px,6vw,84px)] ${className}`}>{children}</h2>
    </Reveal>
  )
}

export default function GirisTema() {
  const yolculuk = [
    ...egitim.map((e) => ({ tarih: e.tarih, baslik: e.okul, alt: e.bolum, tur: "Eğitim" })),
    ...deneyim.map((d) => ({ tarih: d.tarih, baslik: d.rol, alt: d.sirket, tur: "Deneyim" })),
    ...sertifikalar.map((s) => ({ tarih: s.tarih, baslik: s.ad, alt: s.kurum, tur: "Sertifika" })),
  ].sort((a, b) => yilAnahtari(a.tarih) - yilAnahtari(b.tarih))
  const simdi = deneyim.find((d) => /bugün/i.test(d.tarih))
  const sertifika = sertifikalar.find((s) => s.gorsel)
  const tel = iletisim.telefon ? `tel:+9${iletisim.telefon.replace(/\D/g, "")}` : ""

  return (
    <main
      className={`${inter.variable} tema-giris min-h-screen overflow-x-clip bg-[#fffef7] text-black`}
      style={{ fontFamily: "var(--font-giris), sans-serif" }}
    >
      {/* ── Üst şerit ── */}
      <header className="flex items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-full bg-black text-[11px] tracking-tight text-[#fffef7]">
            EÖ
          </span>
          <p className="text-[11px] leading-tight uppercase sm:text-xs">
            Proje yönetimi //
            <br className="sm:hidden" /> Yazılım ve e-ticaret projeleri
          </p>
        </div>
        <a href="#iletisim" className="rounded-full bg-black px-6 py-3 text-base text-[#fffef7] transition-opacity hover:opacity-80">
          İletişim
        </a>
      </header>

      {/* ── Kocaman başlık ── */}
      <section className="px-4 pt-[3vh] pb-[3vh] sm:px-8 sm:pt-[5vh]">
        <DevBaslik metin="Ece Özenir" />
      </section>

      {/* ── Kenardan kenara video ── */}
      <section className="relative">
        <video src={giris.video} autoPlay muted loop playsInline className="giris-video block h-[78vh] w-full object-cover" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-4 pt-32 pb-6 sm:px-8 sm:pb-8">
          <p className="text-xs text-[#fffef7] uppercase">Proje Yöneticisi · {firma.ad}</p>
          <p className="mt-3 max-w-2xl text-[clamp(24px,3.4vw,34px)] leading-[1.15] font-light tracking-[-0.02em] text-[#fffef7]">
            {giris.slogan}
          </p>
        </div>
      </section>

      {/* ── Hakkımda ── */}
      <section className="grid gap-10 px-4 py-20 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={fotograf} alt="Ece Özenir" className="aspect-[4/5] w-full object-cover" />
        </Reveal>
        <div className="flex flex-col justify-between gap-12">
          <Reveal>
            <h2 className="text-[clamp(32px,4.4vw,60px)]">Merhaba, ben Ece. {hakkimda}</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-xl text-lg leading-relaxed text-[#666]">{firma.metin}</p>
          </Reveal>
          {/* Rakamlar */}
          <div className="grid grid-cols-2 border-t border-[#aaa]">
            {rakamlar.map((r, i) => (
              <Reveal key={r.aciklama} delay={i * 100} className={`pt-6 ${i ? "border-l border-[#aaa] pl-6" : ""}`}>
                <p className="text-[clamp(56px,7vw,96px)] leading-none font-light tracking-[-0.04em]">{r.deger}</p>
                <p className="mt-3 text-sm text-[#666]">{r.aciklama}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hizmetler ── */}
      <section className="px-4 py-20 sm:px-8 sm:py-28">
        <Baslik>İşletmeniz için ne yapabiliriz?</Baslik>
        <div className="mt-14 border-t border-black">
          {cozumler.map((c, i) => (
            <details key={c.baslik} className="group border-b border-[#aaa]">
              <summary className="flex cursor-pointer list-none items-center gap-4 py-6 sm:gap-8 sm:py-8 [&::-webkit-details-marker]:hidden">
                <span className="w-8 text-sm text-[#666] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 text-[clamp(26px,3.6vw,48px)] leading-[1.05] font-light tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-1">
                  {c.baslik}
                </span>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#aaa] transition duration-300 group-open:rotate-45 group-open:border-black group-open:bg-black group-open:text-[#fffef7]">
                  <Plus className="size-4" />
                </span>
              </summary>
              <div className="grid gap-8 pb-10 sm:pl-16 lg:grid-cols-2 lg:gap-14">
                <div>
                  <p className="text-xl leading-snug font-light">{c.aciklama}</p>
                  {"detay" in c && c.detay && <p className="mt-4 leading-relaxed text-[#666]">{c.detay}</p>}
                  <ul className="mt-6 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                    {c.maddeler.map((m) => (
                      <li key={m} className="border-t border-[#ddd] pt-2">
                        {m}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={`mailto:${iletisim.eposta}?subject=${encodeURIComponent(`${c.baslik} hakkında bilgi almak istiyorum`)}`}
                      className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm text-[#fffef7]"
                    >
                      <Mail className="size-4" /> {iletisim.eposta}
                    </a>
                    {tel && (
                      <a href={tel} className="inline-flex items-center gap-2 rounded-full border border-black px-5 py-3 text-sm">
                        <Phone className="size-4" /> {iletisim.telefon}
                      </a>
                    )}
                  </div>
                </div>
                {"gorsel" in c && c.gorsel ? (
                  <div className="p-6" style={{ background: TONLAR[i % 3] }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.gorsel} alt={c.baslik} loading="lazy" referrerPolicy="no-referrer" className="aspect-[4/3] w-full bg-white object-contain" />
                  </div>
                ) : (
                  <div className="hidden lg:block" />
                )}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ── Projeler ── */}
      <section className="px-4 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Baslik>Yürüttüğüm projeler</Baslik>
          <p className="text-sm text-[#666]">{projeler.length} proje</p>
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {projeler.map((p, i) => {
            const ton = TONLAR[i % TONLAR.length]
            return (
              <Reveal key={p.ad} delay={(i % 3) * 80}>
                <article className="group">
                  <div className="p-3 sm:p-4" style={{ background: ton }}>
                    <ProjeOnizleme
                      src={p.onizleme || undefined}
                      ad={p.ad}
                      link={"canli" in p && p.canli === false ? undefined : p.link}
                      koyu={ton === "#101731"}
                      className="rounded-none"
                    />
                  </div>
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-start justify-between gap-3">
                    <h3 className="text-xl">{p.ad}</h3>
                    <ArrowUpRight className="mt-1 size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#666]">{p.aciklama}</p>
                  <p className="mt-3 text-xs text-[#666] uppercase">{p.etiketler.join(" · ")}</p>
                </article>
              </Reveal>
            )
          })}
        </div>

        {/* Katkıda bulunduklarım */}
        <div className="mt-28">
          <Reveal>
            <h2 className="text-[clamp(30px,4vw,54px)]">Katkıda bulunduklarım</h2>
          </Reveal>
          <div className="mt-10 grid gap-x-8 gap-y-10 border-t border-[#aaa] pt-10 sm:grid-cols-2 lg:grid-cols-2">
            {katkilar.map((k) => (
              <article key={k.ad}>
                <ProjeOnizleme
                  src={k.onizleme || undefined}
                  ad={k.ad}
                  link={"canli" in k && k.canli === false ? undefined : k.link}
                  className="rounded-none"
                />
                <a href={k.link} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-start justify-between gap-2">
                  <h3 className="text-lg">{k.ad}</h3>
                  <ArrowUpRight className="mt-1 size-4 shrink-0" />
                </a>
                <p className="mt-1 text-xs text-[#666]">{alanAdi(k.link)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Yolculuk ── */}
      <section className="px-4 py-20 sm:px-8 sm:py-28">
        <Baslik>Bugüne kadarki yolculuğum</Baslik>

        {simdi && (
          <Reveal className="mt-14">
            <div className="grid gap-6 bg-[#101731] p-8 text-[#fffef7] sm:p-12 lg:grid-cols-[1fr_2fr]">
              <p className="flex items-center gap-3 text-sm">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#a5ebd6] opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-[#a5ebd6]" />
                </span>
                Şu an · {simdi.tarih}
              </p>
              <div>
                <h3 className="text-[clamp(34px,5vw,64px)] leading-none">{simdi.rol}</h3>
                <p className="mt-3 text-xl font-light text-[#fffef7]/80">{simdi.sirket}</p>
                {simdi.aciklama && <p className="mt-6 max-w-xl leading-relaxed text-[#fffef7]/60">{simdi.aciklama}</p>}
              </div>
            </div>
          </Reveal>
        )}

        <ol className="mt-10 border-t border-black">
          {yolculuk
            .filter((d) => !/bugün/i.test(d.tarih))
            .reverse()
            .map((d, i) => (
              <li key={i} className="grid grid-cols-[88px_1fr] gap-4 border-b border-[#aaa] py-6 sm:grid-cols-[160px_1fr_160px] sm:gap-8 sm:py-8">
                <span className="text-sm text-[#666] tabular-nums">{d.tarih}</span>
                <div>
                  <h3 className="text-[clamp(22px,2.6vw,34px)] leading-tight">{d.baslik}</h3>
                  <p className="mt-1 text-[#666]">{d.alt}</p>
                </div>
                <span className="col-start-2 text-xs text-[#666] uppercase sm:col-start-3 sm:text-right">{d.tur}</span>
              </li>
            ))}
        </ol>
      </section>

      {/* ── Sertifika ── */}
      {sertifika && (
        <section className="grid items-center gap-10 px-4 py-20 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <Reveal>
            <div className="bg-[#a5c8eb] px-4 pt-12 pb-10 sm:px-10 sm:pt-16">
              <Certificate3D
                gorsel={sertifika.gorsel}
                baslik={sertifika.ad}
                kurum={sertifika.kurum}
                detay={sertifika.aciklama}
                tarih={sertifika.tarih}
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            {sertifika.saat && (
              <p className="text-[clamp(72px,10vw,140px)] leading-none font-light tracking-[-0.05em]">
                {sertifika.saat}
                <span className="ml-2 align-top text-base tracking-normal text-[#666]">saat</span>
              </p>
            )}
            <h2 className="mt-6 text-[clamp(30px,3.6vw,48px)]">{sertifika.ad}</h2>
            <p className="mt-3 text-[#666]">{sertifika.kurum}</p>
            <p className="mt-1 text-sm text-[#666]">{sertifika.tarih}</p>
            {sertifika.aciklama && <p className="mt-6 max-w-md leading-relaxed">{sertifika.aciklama}</p>}
          </Reveal>
        </section>
      )}

      {/* ── Uzmanlık ── */}
      <section className="px-4 py-20 sm:px-8 sm:py-28">
        <Baslik>Uzmanlık alanlarım</Baslik>
        <div className="mt-14 grid gap-px border border-[#aaa] bg-[#aaa] sm:grid-cols-2 lg:grid-cols-4">
          {yetkinlikler.map((g, i) => (
            <Reveal key={g.baslik} delay={i * 80} className="h-full">
              <div className={`flex h-full flex-col p-6 sm:p-8 ${i === 0 ? "bg-[#a5ebd6]" : "bg-[#fffef7]"}`}>
                <span className="text-sm text-[#666] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-10 text-[28px] leading-tight">{g.baslik}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#444]">{g.aciklama}</p>
                <ul className="mt-auto space-y-1.5 pt-8 text-sm">
                  {g.maddeler.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── İletişim ── */}
      <section id="iletisim" className="px-4 pt-20 pb-10 sm:px-8 sm:pt-28">
        <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="text-[clamp(44px,7.5vw,112px)]">Projeniz mi var? Birlikte hayata geçirelim.</h2>
            </Reveal>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={`mailto:${iletisim.eposta}`} className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-[#fffef7] transition-opacity hover:opacity-80">
                <Mail className="size-4" /> {iletisim.eposta}
              </a>
              {tel && (
                <a href={tel} className="inline-flex items-center gap-2 rounded-full border border-black px-6 py-3.5 transition-colors hover:bg-black hover:text-[#fffef7]">
                  <Phone className="size-4" /> {iletisim.telefon}
                </a>
              )}
            </div>
          </div>
          {kartvizit.on && (
            <Reveal delay={120}>
              <Kartvizit on={kartvizit.on} arka={kartvizit.arka} />
            </Reveal>
          )}
        </div>
        <footer className="mt-24 flex flex-wrap justify-between gap-3 border-t border-[#aaa] pt-6 text-sm">
          <span>© {new Date().getFullYear()} Ece Özenir</span>
          <span className="text-[#666]">{firma.ad}</span>
          <a href="/" className="underline-offset-4 hover:underline">
            Diğer tasarıma geç →
          </a>
        </footer>
      </section>
    </main>
  )
}
