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
import { Kap, BolumBaslik } from "@/components/site/ui"
import { ProjeKart } from "@/components/site/proje-kart"
import { ReferansIzgara } from "@/components/site/referanslar"
import { AlbumKart } from "@/components/site/album-kart"
import { IletisimBolum } from "@/components/site/iletisim"
import { albumler } from "@/lib/galeri"
import { cozumler, firma, fotograf, giris, hakkimda, iletisim, projeler, rakamlar, referanslar, sertifikalar, tosfed } from "../bilgilerim"

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
    { deger: String(tosfed.ralliler.length), ad: "Görev alınan ralli" },
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

      {/* ── TANITIM: ekran genişliğinde fotoğraf + acı kahve panel ── */}
      <section className="px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="grid overflow-hidden rounded-2xl md:min-h-[88svh] md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={fotograf} alt="Ece Özenir" className="aspect-[4/5] w-full object-cover md:aspect-auto md:h-full" />
          <div className="flex flex-col justify-between gap-14 bg-[#4a2b1d] p-7 text-[#fbfaf6] sm:p-12 lg:p-16">
            <div>
              <h2 className="text-[clamp(48px,7.4vw,128px)] leading-[0.95] font-light">
                Merhaba,
                <br />
                ben Ece.
              </h2>
              <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-12">
                <p className="text-[clamp(20px,1.8vw,26px)] leading-snug font-light">{hakkimda.trim()}</p>
                <div>
                  <p className="leading-relaxed text-[#fbfaf6]/70">{firma.metin}</p>
                  <Link
                    href="/hakkimda"
                    data-miknatis
                    className="group mt-6 inline-flex items-center gap-2.5 text-[13px] tracking-[0.06em] uppercase"
                  >
                    <span className="flex size-7 items-center justify-center rounded-full bg-[#fbfaf6] text-[#4a2b1d] transition-transform group-hover:rotate-45">
                      <ArrowUpRight className="size-4" />
                    </span>
                    Hakkımda
                  </Link>
                </div>
              </div>
            </div>
            {/* Rakamlar */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
              {istatistik.map((s) => (
                <div key={s.ad}>
                  <Sayac deger={s.deger} className="mono block text-[clamp(36px,4vw,56px)] leading-none font-light tracking-tight" />
                  <p className="mt-2 text-sm text-[#fbfaf6]/60">{s.ad}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
                  <div data-egim className="flex h-full flex-col rounded-2xl bg-white p-6 hover:shadow-[0_18px_40px_-24px_rgba(20,20,20,0.35)]">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-[#fbfaf6] text-[#4a2b1d]">
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
                className="group flex h-full flex-col justify-between rounded-2xl bg-[#4a2b1d] p-6 text-[#fbfaf6]"
              >
                <p className="text-lg leading-snug font-semibold">Aklınızda bir proje mi var?</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm text-[#fbfaf6]/70 transition-colors group-hover:text-white">
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
