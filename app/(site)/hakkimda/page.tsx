import type { Metadata } from "next"
import fs from "node:fs"
import path from "node:path"
import { Download } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { Certificate3D } from "@/components/cert-3d"
import { Kap, BolumBaslik, SayfaBaslik } from "@/components/site/ui"
import { IletisimBolum } from "@/components/site/iletisim"
import { deneyim, egitim, firma, fotograf, hakkimda, sertifikalar, tosfed, yetkinlikler } from "../../bilgilerim"

export const metadata: Metadata = {
  title: "Hakkımda",
  description: "Ece Özenir'in deneyimi, eğitimi, sertifikaları ve uzmanlık alanları.",
}

// "2025-Bugün" gibi tarihleri sıralamak için
function yil(t: string) {
  if (/bugün/i.test(t)) return 9999
  const y = t.match(/(19|20)\d{2}/)
  return y ? Number(y[0]) : 5000
}

// CV'ni public klasörüne "cv.pdf" adıyla koyarsan "CV'mi indir" düğmesi görünür.
const CV = "/cv.pdf"

export default function HakkimdaSayfa() {
  const fotoVar = fs.existsSync(path.join(process.cwd(), "public", fotograf))
  const cvVar = fs.existsSync(path.join(process.cwd(), "public", CV))
  const isler = [...deneyim].sort((a, b) => yil(b.tarih) - yil(a.tarih))
  const okullar = [...egitim].sort((a, b) => yil(b.tarih) - yil(a.tarih))
  const sertifika3d = sertifikalar.find((s) => s.gorsel)

  return (
    <>
      <SayfaBaslik
        ust="Hakkımda"
        baslik={
          <>
            Merhaba, ben <span className="vurgu">Ece.</span>
          </>
        }
      />

      <Kap>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          {fotoVar && (
            <div className="overflow-hidden rounded-[28px] bg-[#ebe6dc]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={fotograf} alt="Ece Özenir" className="aspect-[4/5] w-full object-cover" />
            </div>
          )}
          <div className="flex flex-col justify-center">
            <p className="text-[clamp(22px,2.4vw,30px)] leading-snug font-medium tracking-tight">{hakkimda.trim()}</p>
            <p className="mt-6 text-lg leading-relaxed text-[#6b665e]">{firma.metin}</p>
            <p className="mt-4 text-lg leading-relaxed text-[#6b665e]">
              Bunun yanında {tosfed.kurumTam}&apos;nda {tosfed.rol.toLocaleLowerCase("tr-TR")} olarak ralli yarışlarında görev alıyorum.
            </p>
            {cvVar && (
              <a
                href={CV}
                download
                className="mt-8 inline-flex items-center gap-2 self-start rounded-full bg-[#141414] px-6 py-3.5 text-[15px] font-medium text-[#fbfaf6] transition-colors hover:bg-[#813413]"
              >
                <Download className="size-4" /> CV&apos;mi indir
              </a>
            )}
          </div>
        </div>
      </Kap>

      {/* Deneyim ve eğitim */}
      <section className="pt-24 sm:pt-32">
        <Kap>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            <div>
              <h2 className="text-[clamp(28px,3.4vw,40px)] font-semibold">Deneyim</h2>
              <div className="mt-8 space-y-3">
                {isler.map((d, i) => {
                  const simdi = /bugün/i.test(d.tarih)
                  return (
                    <Reveal key={i} delay={i * 60}>
                      <div className={`rounded-2xl p-6 ${simdi ? "bg-[#813413] text-[#fbfaf6]" : "bg-white"}`}>
                        <p className={`mono flex items-center gap-2 text-sm ${simdi ? "text-[#f4c7a1]" : "text-[#6b665e]"}`}>
                          {simdi && <span className="size-2 animate-pulse rounded-full bg-[#4ade80]" />}
                          {d.tarih}
                        </p>
                        <p className="mt-3 text-xl font-semibold tracking-tight">{d.rol}</p>
                        <p className={`mt-1 ${simdi ? "text-[#fbfaf6]/70" : "text-[#6b665e]"}`}>{d.sirket}</p>
                        {d.aciklama && (
                          <p className={`mt-3 text-[15px] leading-relaxed ${simdi ? "text-[#fbfaf6]/60" : "text-[#6b665e]"}`}>{d.aciklama}</p>
                        )}
                      </div>
                    </Reveal>
                  )
                })}
              </div>
            </div>
            <div>
              <h2 className="text-[clamp(28px,3.4vw,40px)] font-semibold">Eğitim ve sertifikalar</h2>
              <div className="mt-8 space-y-3">
                {[
                  ...okullar.map((e) => ({ tarih: e.tarih, baslik: e.okul, alt: e.bolum })),
                  ...sertifikalar.map((s) => ({ tarih: s.tarih, baslik: s.ad, alt: s.kurum })),
                ]
                  .sort((a, b) => yil(b.tarih) - yil(a.tarih))
                  .map((e, i) => (
                    <Reveal key={i} delay={i * 60}>
                      <div className="rounded-2xl bg-white p-6">
                        <p className="mono text-sm text-[#6b665e]">{e.tarih}</p>
                        <p className="mt-3 text-xl font-semibold tracking-tight">{e.baslik}</p>
                        <p className="mt-1 text-[#6b665e]">{e.alt}</p>
                      </div>
                    </Reveal>
                  ))}
              </div>
            </div>
          </div>
        </Kap>
      </section>

      {/* Sertifika */}
      {sertifika3d && (
        <section className="pt-24 sm:pt-32">
          <Kap>
            <div className="grid items-center gap-10 rounded-[32px] bg-white p-6 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14 lg:p-14">
              <div className="rounded-3xl bg-[#fbfaf6] px-4 pt-10 pb-8 sm:px-10 sm:pt-14">
                <Certificate3D
                  gorsel={sertifika3d.gorsel}
                  baslik={sertifika3d.ad}
                  kurum={sertifika3d.kurum}
                  detay={sertifika3d.aciklama}
                  tarih={sertifika3d.tarih}
                />
              </div>
              <div>
                {sertifika3d.saat && (
                  <p className="mono text-[clamp(56px,7vw,88px)] leading-none">
                    {sertifika3d.saat}
                    <span className="ml-2 font-sans text-base text-[#6b665e]">saat</span>
                  </p>
                )}
                <h2 className="mt-6 text-[clamp(26px,3vw,36px)] leading-tight font-semibold">{sertifika3d.ad}</h2>
                <p className="mt-2 text-[#6b665e]">{sertifika3d.kurum}</p>
                {sertifika3d.aciklama && <p className="mt-5 leading-relaxed text-[#141414]/75">{sertifika3d.aciklama}</p>}
              </div>
            </div>
          </Kap>
        </section>
      )}

      {/* Uzmanlık */}
      <section className="pt-24 sm:pt-32">
        <Kap>
          <BolumBaslik baslik="Uzmanlık alanlarım" />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {yetkinlikler.map((g, i) => (
              <Reveal key={g.baslik} delay={i * 70} className="h-full">
                <div className="flex h-full flex-col rounded-2xl bg-white p-6">
                  <h3 className="text-xl font-semibold">{g.baslik}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#6b665e]">{g.aciklama}</p>
                  <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1.5 text-sm text-[#141414]/80">
                    {g.maddeler.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Kap>
      </section>

      <IletisimBolum />
    </>
  )
}
