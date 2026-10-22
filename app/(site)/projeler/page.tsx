import type { Metadata } from "next"
import { Reveal } from "@/components/reveal"
import { Kap, BolumBaslik, SayfaBaslik } from "@/components/site/ui"
import { ProjeKart } from "@/components/site/proje-kart"
import { ReferansIzgara } from "@/components/site/referanslar"
import { IletisimBolum } from "@/components/site/iletisim"
import { katkilar, projeler } from "../../bilgilerim"

export const metadata: Metadata = {
  title: "Projeler",
  description: "Ece Özenir'in yönettiği e-ticaret, kurumsal site ve B2B projeleri.",
}

export default function ProjelerSayfa() {
  return (
    <>
      <SayfaBaslik
        ust={`${projeler.length} proje · ${katkilar.length} katkı`}
        baslik={
          <>
            Yönettiğim <span className="vurgu">projeler</span>
          </>
        }
        aciklama="E-ticaret, kurumsal site ve B2B alanlarında fikir aşamasından yayına kadar yürüttüğüm işler. Önizlemeye tıklayarak siteleri buradan gezebilirsiniz."
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
          <BolumBaslik baslik="Katkıda bulunduklarım" aciklama="Ekibin bir parçası olarak geliştirilmesine katkı sağladığım siteler." />
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
          <BolumBaslik baslik="Referanslar" aciklama="Birlikte çalıştığımız markalardan bazıları." />
          <div className="mt-12">
            <ReferansIzgara />
          </div>
        </Kap>
      </section>

      <IletisimBolum />
    </>
  )
}
