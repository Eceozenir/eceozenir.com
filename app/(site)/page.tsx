import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Globe,
  Handshake,
  Plane,
  Server,
  ShoppingCart,
  Smartphone,
  UtensilsCrossed,
} from "lucide-react"
import { Reveal } from "@/components/reveal"
import { GiantStatement } from "@/components/air-sections"
import { Sayac } from "@/components/site/sayac"
import { Kap, BolumBaslik } from "@/components/site/ui"
import { ProjeKart } from "@/components/site/proje-kart"
import { ReferansIzgara } from "@/components/site/referanslar"
import { AlbumKart } from "@/components/site/album-kart"
import { IletisimBolum } from "@/components/site/iletisim"
import { albumler } from "@/lib/galeri"
import { cozumler, firma, giris, hakkimda, iletisim, projeler, rakamlar, sertifikalar, tosfed } from "../bilgilerim"

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

export default function AnaSayfa() {
  const sehirSayisi = new Set(tosfed.ralliler.map((r) => r.sehir)).size
  const egitimSaati = sertifikalar.find((s) => s.saat)?.saat
  const istatistik = [
    ...rakamlar.map((r) => ({ deger: r.deger, ad: r.aciklama })),
    { deger: String(tosfed.ralliler.length), ad: "Görev alınan ralli" },
    ...(egitimSaati ? [{ deger: egitimSaati, ad: "Saat yazılım eğitimi" }] : []),
  ]
  const vurguParcalari = giris.slogan.split(giris.sloganVurgu)
  const galeriOzet = albumler().slice(0, 3)

  return (
    <>
      {/* ── GİRİŞ ── */}
      <Kap className="grid items-center gap-10 pt-8 pb-16 sm:pt-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pb-24">
        <div>
          <p className="mono text-sm text-[#6b665e]">Ece Özenir</p>
          <h1 className="mt-5 text-[clamp(36px,4.9vw,62px)] leading-[1.04] font-semibold">
            {vurguParcalari.length > 1 ? (
              <>
                {vurguParcalari[0]}
                <span className="vurgu">{giris.sloganVurgu}</span>
                {vurguParcalari.slice(1).join(giris.sloganVurgu)}
              </>
            ) : (
              giris.slogan
            )}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#6b665e]">
            {hakkimda.trim()} {firma.metin}
          </p>
          <dl className="mt-8 grid gap-3 text-[15px] sm:grid-cols-2">
            <div className="rounded-2xl bg-white px-5 py-4">
              <dt className="font-semibold">Proje Yöneticisi</dt>
              <dd className="mt-0.5 text-[#6b665e]">{firma.ad}</dd>
            </div>
            <div className="rounded-2xl bg-white px-5 py-4">
              <dt className="font-semibold">{tosfed.rol}</dt>
              <dd className="mt-0.5 text-[#6b665e]">{tosfed.kurumTam}</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/projeler"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#141414] px-6 py-3.5 text-[15px] font-medium text-[#f6f4ef] transition-colors hover:bg-[#c2410c]"
            >
              Projeleri incele <ArrowRight className="size-4" />
            </Link>
            <a
              href={`mailto:${iletisim.eposta}`}
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-medium bg-[#141414]/[0.06] transition-colors hover:bg-[#141414]/[0.1]"
            >
              İletişime geç
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-[28px] bg-[#141414]">
            <video
              src={giris.video}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/6]"
            />
          </div>
        </div>
      </Kap>

      {/* ── RAKAMLAR ── */}
      <Kap>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {istatistik.map((s, i) => (
            <Reveal key={s.ad} delay={i * 70}>
              <div className="h-full rounded-2xl bg-white px-6 py-7">
                <Sayac deger={s.deger} className="mono block text-[clamp(32px,4vw,48px)] leading-none font-semibold tracking-tight" />
                <p className="mt-3 text-sm text-[#6b665e]">{s.ad}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Kap>

      {/* ── HİZMETLER ── */}
      <section className="pt-24 sm:pt-32">
        <Kap>
          <BolumBaslik
            baslik={
              <>
                {firma.ad} ile <span className="vurgu">neler yapıyoruz?</span>
              </>
            }
            aciklama="İşletmelere fikirden canlıya kadar uçtan uca yazılım çözümleri."
          />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cozumler.map((c, i) => {
              const Ikon = IKON[c.ikon as keyof typeof IKON] ?? Globe
              return (
                <Reveal key={c.baslik} delay={(i % 4) * 60} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(20,20,20,0.35)]">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-[#f6f4ef] text-[#c2410c]">
                      <Ikon className="size-5" />
                    </span>
                    <h3 className="mt-6 text-lg leading-snug font-semibold">{c.baslik}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-[#6b665e]">{c.aciklama}</p>
                  </div>
                </Reveal>
              )
            })}
            <Reveal delay={180} className="h-full">
              <a
                href={`mailto:${iletisim.eposta}?subject=${encodeURIComponent("Proje hakkında bilgi almak istiyorum")}`}
                className="group flex h-full flex-col justify-between rounded-2xl bg-[#141414] p-6 text-[#f6f4ef]"
              >
                <p className="text-lg leading-snug font-semibold">Aklınızda bir proje mi var?</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm text-[#f6f4ef]/70 transition-colors group-hover:text-white">
                  Bilgi alın <ArrowUpRight className="size-4" />
                </span>
              </a>
            </Reveal>
          </div>
        </Kap>
      </section>

      {/* ── FİKİRDEN TESLİMATA (kaydırdıkça satırlar kayar, küre büyür) ── */}
      <div className="pt-12 sm:pt-16">
        <GiantStatement satirlar={["Fikirden", "teslimata"]} />
      </div>

      {/* ── ÖNE ÇIKAN PROJELER ── */}
      <section className="pt-8 sm:pt-12">
        <Kap>
          <BolumBaslik
            baslik="Öne çıkan projeler"
            aciklama={`Yönettiğim ${projeler.length} projeden bazıları. Önizlemeye tıklayıp siteyi buradan gezebilirsiniz.`}
            link="/projeler"
            linkYazi="Tüm projeler"
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {projeler.slice(0, 4).map((p, i) => (
              <Reveal key={p.ad} delay={(i % 2) * 80} className="h-full">
                <ProjeKart p={p} />
              </Reveal>
            ))}
          </div>
        </Kap>
      </section>

      {/* ── REFERANSLAR ── */}
      <section className="pt-24 sm:pt-32">
        <Kap>
          <BolumBaslik baslik="Referanslar" aciklama="Birlikte çalıştığımız markalardan bazıları." />
          <div className="mt-12">
            <ReferansIzgara />
          </div>
        </Kap>
      </section>

      {/* ── TOSFED ── */}
      <section className="pt-24 sm:pt-32">
        <Kap>
          <div className="overflow-hidden rounded-[32px] bg-[#141414] text-[#f6f4ef]">
            <div className="grid gap-12 p-8 sm:p-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:p-16">
              <div className="flex flex-col">
                <p className="mono text-sm text-[#f6f4ef]/50">
                  {tosfed.kurum} · {tosfed.kurumTam}
                </p>
                <h2 className="mt-5 text-[clamp(32px,4.4vw,52px)] leading-[1.05] font-semibold">{tosfed.rol}</h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-[#f6f4ef]/65">{tosfed.ozet}</p>
                <Link
                  href="/tosfed"
                  className="group mt-10 inline-flex items-center gap-2 self-start rounded-full bg-[#f6f4ef] px-5 py-3 text-sm font-medium text-[#141414] lg:mt-auto"
                >
                  Ralliler ve galeri <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
              {/* Netice tablosu görünümünde ralli listesi */}
              <div className="rounded-2xl bg-white/[0.05] p-5 sm:p-6">
                <div className="mono flex justify-between text-xs text-[#f6f4ef]/40">
                  <span>SEZON · RALLİ</span>
                  <span>ŞEHİR</span>
                </div>
                <ol className="mt-4 space-y-2">
                  {tosfed.ralliler.slice(0, 5).map((r, i) => (
                    <li key={i} className="flex items-center justify-between gap-4 rounded-xl bg-white/[0.04] px-4 py-3.5">
                      <span className="flex min-w-0 items-center gap-4">
                        <span className="mono text-sm text-[#fb923c]">{r.yil}</span>
                        <span className="truncate text-[15px]">{r.ad}</span>
                      </span>
                      <span className="mono shrink-0 text-sm text-[#f6f4ef]/55">{r.sehir}</span>
                    </li>
                  ))}
                </ol>
                <div className="mono mt-5 grid grid-cols-2 gap-2 text-center">
                  <div className="rounded-xl bg-white/[0.04] py-4">
                    <p className="text-2xl">{tosfed.ralliler.length}</p>
                    <p className="mt-1 text-xs text-[#f6f4ef]/45">RALLİ</p>
                  </div>
                  <div className="rounded-xl bg-white/[0.04] py-4">
                    <p className="text-2xl">{sehirSayisi}</p>
                    <p className="mt-1 text-xs text-[#f6f4ef]/45">ŞEHİR</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Kap>
      </section>

      {/* ── GALERİ ── */}
      {galeriOzet.length > 0 && (
        <section className="pt-24 sm:pt-32">
          <Kap>
            <BolumBaslik
              baslik="Galeri"
              aciklama="Ralli parkurlarından ve toplantılardan kareler."
              link="/galeri"
              linkYazi="Galeriye git"
            />
            <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {galeriOzet.map((a) => (
                <AlbumKart key={a.slug} a={a} />
              ))}
            </div>
          </Kap>
        </section>
      )}

      <IletisimBolum />
    </>
  )
}
