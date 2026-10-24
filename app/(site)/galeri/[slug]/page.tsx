import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Camera } from "lucide-react"
import { Kap, BolumBaslik } from "@/components/site/ui"
import { FotoGaleri } from "@/components/site/foto-galeri"
import { AlbumKart } from "@/components/site/album-kart"
import { album, albumler } from "@/lib/galeri"
import { icerik } from "@/lib/dil"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const a = album(slug, (await icerik()).v.galeri)
  return a ? { title: a.baslik, description: a.aciklama } : {}
}

export default async function AlbumSayfa({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { v, t } = await icerik()
  const a = album(slug, v.galeri)
  if (!a) notFound()
  const kategoriAd: Record<string, string> = { ralli: t.katRalli, etkinlik: t.katEtkinlik, ofis: t.katOfis }
  const digerleri = albumler(v.galeri).filter((x) => x.slug !== a.slug).slice(0, 3)

  return (
    <>
      <Kap className="pt-10 pb-12 sm:pt-16 sm:pb-16">
        <Link href="/galeri" className="inline-flex items-center gap-2 text-sm text-[#6b665e] transition-colors hover:text-[#141414]">
          <ArrowLeft className="size-4" /> {t.galeri}
        </Link>
        <p className="mono mt-8 text-sm text-[#6b665e]">
          {[kategoriAd[a.kategori] ?? a.kategori, a.yer, a.tarih].filter(Boolean).join(" · ")}
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
            <p>{t.albumYakinda}</p>
          </div>
        )}
      </Kap>

      {digerleri.length > 0 && (
        <section className="pt-24 sm:pt-32">
          <Kap>
            <BolumBaslik baslik={t.digerAlbumler} link="/galeri" linkYazi={t.tumGaleri} />
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
