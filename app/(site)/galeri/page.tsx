import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Camera } from "lucide-react"
import { FotoGaleri } from "@/components/site/foto-galeri"
import { Kap, SayfaBaslik } from "@/components/site/ui"
import { AlbumKart } from "@/components/site/album-kart"
import { albumler } from "@/lib/galeri"

export const metadata: Metadata = {
  title: "Galeri",
  description: "Ofisten, ralli parkurlarından ve toplantılardan fotoğraflar.",
}

// Galeri üç bölümden oluşur. Albümler bilgilerim.ts'teki "kategori" alanına göre dağılır.
const BOLUMLER = [
  { id: "ofis", baslik: "Ofis görselleri", aciklama: "Webadası ekibiyle ofisteki günlerimizden kareler." },
  { id: "ralli", baslik: "Ralli görselleri", aciklama: "TOSFED zaman kayıt ve netice görevlerimde parkurdan kareler." },
  { id: "etkinlik", baslik: "Toplantı görselleri", aciklama: "Proje toplantılarından ve iş görüşmelerinden kareler." },
]

export default function GaleriSayfa() {
  const liste = albumler()
  // Ofis bölümünde albüm yerine fotoğraflar doğrudan gösterilir
  const ofisAlbum = liste.find((a) => a.kategori === "ofis" && a.fotolar.length > 0)
  const OFIS_ONIZLEME = 4

  return (
    <>
      <SayfaBaslik
        baslik="Galeri"
        aciklama="Ofisten, ralli parkurlarından ve toplantılardan kareler."
      />

      {/* Bölümlere hızlı geçiş */}
      <Kap>
        <nav className="flex flex-wrap gap-2" aria-label="Galeri bölümleri">
          {BOLUMLER.map((b) => (
            <a
              key={b.id}
              href={`#${b.id}`}
              data-miknatis
              className="rounded-full bg-white px-5 py-2.5 text-[12.5px] tracking-[0.06em] text-[#141414]/75 uppercase transition-colors hover:bg-[#4a2b1d] hover:text-[#fbfaf6]"
            >
              {b.baslik}
            </a>
          ))}
        </nav>
      </Kap>

      {BOLUMLER.map((b) => {
        const bolumAlbumleri = liste.filter((a) => a.kategori === b.id)
        return (
          <section key={b.id} id={b.id} className="scroll-mt-24 pt-20 sm:pt-28">
            <Kap>
              <div className="max-w-2xl">
                <h2 className="text-[clamp(34px,4.8vw,60px)] leading-[1.02] font-light">{b.baslik}</h2>
                <p className="mt-4 text-lg leading-relaxed text-[#6b665e]">{b.aciklama}</p>
              </div>
              {b.id === "ofis" && ofisAlbum ? (
                <div className="mt-10">
                  <FotoGaleri fotolar={ofisAlbum.fotolar} baslik={ofisAlbum.baslik} onizleme={OFIS_ONIZLEME} />
                  {ofisAlbum.fotolar.length > 0 && (
                    <Link
                      href={`/galeri/${ofisAlbum.slug}`}
                      data-miknatis
                      className="group mt-6 inline-flex items-center gap-2 rounded-full bg-[#141414] px-6 py-3.5 text-[13px] tracking-[0.06em] text-[#fbfaf6] uppercase transition-colors hover:bg-[#4a2b1d]"
                    >
                      Daha fazlasını gör <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  )}
                </div>
              ) : bolumAlbumleri.length > 0 ? (
                <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                  {bolumAlbumleri.map((a) => (
                    <AlbumKart key={a.slug} a={a} />
                  ))}
                </div>
              ) : (
                <div className="mt-10 flex items-center gap-3 rounded-2xl bg-white px-6 py-10 text-[#6b665e]">
                  <Camera className="size-5" /> Bu bölümün fotoğrafları yakında eklenecek.
                </div>
              )}
            </Kap>
          </section>
        )
      })}
    </>
  )
}
