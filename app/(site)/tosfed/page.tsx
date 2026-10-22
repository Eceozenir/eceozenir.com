import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Camera } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { Kap, BolumBaslik, SayfaBaslik } from "@/components/site/ui"
import { AlbumKart } from "@/components/site/album-kart"
import { albumler } from "@/lib/galeri"
import { tosfed } from "../../bilgilerim"

export const metadata: Metadata = {
  title: "TOSFED",
  description: "Türkiye Otomobil Sporları Federasyonu'nda zaman kayıt netice sorumlusu olarak görev aldığım ralliler ve galeri.",
}

export default function TosfedSayfa() {
  const tum = albumler()
  const ralliAlbumleri = tum.filter((a) => a.kategori === "ralli")
  // Rallileri sezona (yıla) göre grupla, yeni sezon üstte
  const sezonlar = Object.entries(
    tosfed.ralliler.reduce<Record<string, typeof tosfed.ralliler>>((acc, r) => {
      ;(acc[r.yil] ||= []).push(r)
      return acc
    }, {})
  ).sort(([a], [b]) => b.localeCompare(a, "tr", { numeric: true }))
  const sehirSayisi = new Set(tosfed.ralliler.map((r) => r.sehir)).size

  return (
    <>
      <SayfaBaslik ust={`${tosfed.kurum} · ${tosfed.kurumTam}`} baslik={tosfed.rol} aciklama={tosfed.ozet} />

      {/* Rakamlar + metin */}
      <Kap>
        <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
          <div className="mono grid grid-cols-3 gap-3 lg:grid-cols-1">
            {[
              { d: tosfed.baslangic, a: "Görev başlangıcı" },
              { d: String(tosfed.ralliler.length), a: "Ralli" },
              { d: String(sehirSayisi), a: "Şehir" },
            ].map((s) => (
              <div key={s.a} className="rounded-2xl bg-[#141414] px-5 py-6 text-[#f6f4ef] sm:px-6">
                <p className="text-[clamp(26px,4vw,44px)] leading-none">{s.d}</p>
                <p className="mt-3 font-sans text-sm text-[#f6f4ef]/55">{s.a}</p>
              </div>
            ))}
          </div>
          <div className="rounded-3xl bg-white p-8 sm:p-10">
            {tosfed.metin.map((m, i) => (
              <p key={i} className={`text-lg leading-relaxed text-[#141414]/80 ${i ? "mt-5" : ""}`}>
                {m}
              </p>
            ))}
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {tosfed.gorevler.map((g) => (
                <div key={g.baslik} className="rounded-2xl bg-[#f6f4ef] p-5">
                  <p className="font-semibold">{g.baslik}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#6b665e]">{g.aciklama}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Kap>

      {/* Sezonlar */}
      <section className="pt-24 sm:pt-32">
        <Kap>
          <BolumBaslik baslik="Görev aldığım ralliler" aciklama="Sezon sezon, şehir şehir." />
          <div className="mt-12 space-y-10">
            {sezonlar.map(([yil, liste]) => (
              <Reveal key={yil}>
                <div className="grid gap-4 md:grid-cols-[160px_1fr]">
                  <p className="mono text-3xl text-[#c2410c]">{yil}</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {liste.map((r, i) => {
                      const alb = r.album ? tum.find((a) => a.slug === r.album) : undefined
                      const icerik = (
                        <>
                          <div>
                            <p className="text-lg leading-snug font-semibold">{r.ad}</p>
                            <p className="mono mt-1 text-sm text-[#6b665e]">
                              {r.sehir} · {r.tarih}
                            </p>
                          </div>
                          {alb && (
                            <span className="mt-6 inline-flex items-center gap-2 text-sm text-[#6b665e] group-hover:text-[#c2410c]">
                              <Camera className="size-4" />
                              {alb.fotolar.length ? `${alb.fotolar.length} fotoğraf` : "Albüm"}
                              <ArrowUpRight className="size-4" />
                            </span>
                          )}
                        </>
                      )
                      return alb ? (
                        <Link key={i} href={`/galeri/${alb.slug}`} className="group flex flex-col justify-between rounded-2xl bg-white p-6 transition-shadow hover:shadow-[0_12px_30px_-18px_rgba(20,20,20,0.35)]">
                          {icerik}
                        </Link>
                      ) : (
                        <div key={i} className="flex flex-col justify-between rounded-2xl bg-white p-6">
                          {icerik}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Kap>
      </section>

      {/* Ralli albümleri */}
      {ralliAlbumleri.length > 0 && (
        <section className="pt-24 sm:pt-32">
          <Kap>
            <BolumBaslik baslik="Parkurdan kareler" link="/galeri" linkYazi="Tüm galeri" />
            <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {ralliAlbumleri.map((a) => (
                <AlbumKart key={a.slug} a={a} />
              ))}
            </div>
          </Kap>
        </section>
      )}
    </>
  )
}
