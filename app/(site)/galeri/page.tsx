import type { Metadata } from "next"
import { Kap, SayfaBaslik } from "@/components/site/ui"
import { AlbumFiltre } from "@/components/site/album-filtre"
import { albumler } from "@/lib/galeri"

export const metadata: Metadata = {
  title: "Galeri",
  description: "TOSFED rallilerinden ve toplantılardan fotoğraflar.",
}

export default function GaleriSayfa() {
  const liste = albumler()
  const toplam = liste.reduce((t, a) => t + a.fotolar.length, 0)
  return (
    <>
      <SayfaBaslik
        ust={`${liste.length} albüm · ${toplam} fotoğraf`}
        baslik="Galeri"
        aciklama="TOSFED görevlerimde ralli parkurlarından, proje toplantılarından, etkinliklerden ve ofisten kareler."
      />
      <Kap>
        <AlbumFiltre albumler={liste} />
      </Kap>
    </>
  )
}
