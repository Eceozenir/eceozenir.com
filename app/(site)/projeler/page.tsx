import type { Metadata } from "next"
import { Reveal } from "@/components/reveal"
import { Kap, BolumBaslik, SayfaBaslik } from "@/components/site/ui"
import { ProjeKart } from "@/components/site/proje-kart"
import { ReferansIzgara } from "@/components/site/referanslar"
import { IletisimBolum } from "@/components/site/iletisim"
import { icerik } from "@/lib/dil"
import { doldur } from "@/lib/sozluk"

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await icerik()
  return { title: t.projeler, description: t.metaProjeler }
}

export default async function ProjelerSayfa() {
  const { v, t } = await icerik()
  const { katkilar, projeler } = v
  return (
    <>
      <SayfaBaslik
        ust={doldur(t.projeKatki, { p: projeler.length, k: katkilar.length })}
        baslik={
          <>
            {t.projelerBaslik} <span className="vurgu">{t.projelerVurgu}</span>
          </>
        }
        aciklama={t.projelerAciklama}
      />
      <Kap>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projeler.map((p, i) => (
            <Reveal key={p.ad} delay={(i % 3) * 70} className="h-full">
              <ProjeKart p={p} kucuk />
            </Reveal>
          ))}
        </div>
      </Kap>

      <section className="pt-24 sm:pt-32">
        <Kap>
          <BolumBaslik baslik={t.katkilar} aciklama={t.katkiAciklama} />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {katkilar.map((k, i) => (
              <Reveal key={k.ad} delay={(i % 2) * 70} className="h-full">
                <ProjeKart p={k} />
              </Reveal>
            ))}
          </div>
        </Kap>
      </section>

      <section className="pt-24 sm:pt-32">
        <Kap>
          <BolumBaslik baslik={t.referanslar} aciklama={t.referansAciklama} />
          <div className="mt-12">
            <ReferansIzgara />
          </div>
        </Kap>
      </section>

      <IletisimBolum />
    </>
  )
}
