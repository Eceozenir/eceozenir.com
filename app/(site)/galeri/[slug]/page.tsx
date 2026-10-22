import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Camera } from "lucide-react"
import { Kap, BolumBaslik } from "@/components/site/ui"
import { FotoGaleri } from "@/components/site/foto-galeri"
import { AlbumKart } from "@/components/site/album-kart"
import { album, albumler, KATEGORI_AD } from "@/lib/galeri"
import { galeri } from "../../../bilgilerim"

export function generateStaticParams() {
  return galeri.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const a = album(slug)
  return a ? { title: a.baslik, description: a.aciklama } : {}
}

export default async function AlbumSayfa({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const a = album(slug)
  if (!a) notFound()
  const digerleri = albumler().filter((x) => x.slug !== a.slug).slice(0, 3)

  return (
    <>
      <Kap className="pt-10 pb-12 sm:pt-16 sm:pb-16">
        <Link href="/galeri" className="inline-flex items-center gap-2 text-sm text-[#6b665e] transition-colors hover:text-[#141414]">
          <ArrowLeft className="size-4" /> Galeri
        </Link>
        <p className="mono mt-8 text-sm text-[#6b665e]">
          {[KATEGORI_AD[a.kategori] ?? a.kategori, a.yer, a.tarih].filter(Boolean).join(" · ")}
        </p>
        <h1 className="mt-4 max-w-4xl text-[clamp(36px,5.6vw,68px)] leading-[1.04] font-semibold">{a.baslik}</h1>
        {a.aciklama && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#6b665e]">{a.aciklama}</p>}
      </Kap>

      <Kap>
        {a.fotolar.length ? (
          <FotoGaleri fotolar={a.fotolar} baslik={a.baslik} />
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 rounded-3xl bg-white py-24 text-center text-[#6b665e]">
            <Camera className="size-8" />
            <p>Bu albümün fotoğrafları yakında eklenecek.</p>
          </div>
        )}
      </Kap>

      {digerleri.length > 0 && (
        <section className="pt-24 sm:pt-32">
          <Kap>
            <BolumBaslik baslik="Diğer albümler" link="/galeri" linkYazi="Tüm galeri" />
            <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {digerleri.map((x) => (
                <AlbumKart key={x.slug} a={x} />
              ))}
            </div>
          </Kap>
        </section>
      )}
    </>
  )
}
