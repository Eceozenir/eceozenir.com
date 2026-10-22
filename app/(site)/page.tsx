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
import { Hero } from "@/components/site/hero"
import { HizmetVitrini } from "@/components/site/hizmet-vitrini"
import { YakinlasanFoto } from "@/components/site/yakinlasan-foto"
import { Kap, BolumBaslik } from "@/components/site/ui"
import { ProjeKart } from "@/components/site/proje-kart"
import { ReferansIzgara } from "@/components/site/referanslar"
import { AlbumKart } from "@/components/site/album-kart"
import { IletisimBolum } from "@/components/site/iletisim"
import { albumler } from "@/lib/galeri"
import { cozumler, firma, fotograf, giris, hakkimda, iletisim, projeler, rakamlar, referanslar, sertifikalar } from "../bilgilerim"

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
  const egitimSaati = sertifikalar.find((s) => s.saat)?.saat
  const istatistik = [
    ...rakamlar.map((r) => ({ deger: r.deger, ad: r.aciklama })),
    ...(egitimSaati ? [{ deger: egitimSaati, ad: "Saat yazılım eğitimi" }] : []),
  ]
  const vurguParcalari = giris.slogan.split(giris.sloganVurgu)
  const galeriOzet = albumler().slice(0, 3)

  return (
    <>
      {/* ── GİRİŞ: tam ekran video, el feneri ve kaçan harfler ── */}
      <Hero
        video={giris.video}
        isim="Ece Özenir"
        slogan={giris.slogan}
        referanslar={referanslar.map((r) => r.ad)}
      />

      {/* ── TANITIM: üstte metin, altta geniş fotoğraf bandı ── */}
      <section className="pt-24 sm:pt-32">
        <Kap>
          <div className="grid items-end gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <Reveal>
              <h2 className="text-[clamp(52px,8vw,128px)] leading-[0.92] font-light">
                Merhaba,
                <br />
                ben <span className="text-[#4a2b1d]">Ece.</span>
              </h2>
            </Reveal>
            <Reveal delay={120} className="lg:pb-3">
              <p className="text-[clamp(20px,1.9vw,26px)] leading-snug font-light">{hakkimda.trim()}</p>
              <p className="mt-4 leading-relaxed text-[#6b665e]">{firma.metin}</p>
              <Link
                href="/hakkimda"
                data-miknatis
                className="group mt-6 inline-flex items-center gap-2.5 text-[13px] tracking-[0.06em] uppercase"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-[#4a2b1d] text-[#fbfaf6] transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="size-4" />
                </span>
                Hakkımda
              </Link>
            </Reveal>
          </div>
        </Kap>

        {/* Geniş fotoğraf bandı: aşağı indikçe yakınlaşır, rakamlar alt kısımda */}
        <div className="mt-12 px-2 sm:mt-16 sm:px-3">
          <YakinlasanFoto
            src={fotograf}
            alt="Ece Özenir"
            className="aspect-square rounded-2xl bg-[#141414] sm:aspect-[16/9] lg:aspect-[21/9]"
          >
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 gap-x-6 gap-y-6 p-6 text-[#fbfaf6] sm:p-10 lg:grid-cols-4 lg:p-14">
              {istatistik.map((s) => (
                <div key={s.ad}>
                  <Sayac deger={s.deger} className="mono block text-[clamp(34px,4vw,60px)] leading-none font-light tracking-tight" />
                  <p className="mt-2 text-sm text-[#fbfaf6]/70">{s.ad}</p>
                </div>
              ))}
            </div>
          </YakinlasanFoto>
        </div>
      </section>

      {/* ── HİZMETLER: Webadası vitrini ── */}
      <HizmetVitrini hizmetler={cozumler} firmaAd={firma.ad} eposta={iletisim.eposta} telefon={iletisim.telefon} />

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
