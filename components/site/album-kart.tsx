import Link from "next/link"
import { ArrowUpRight, Camera } from "lucide-react"

type AlbumOzet = {
  slug: string
  baslik: string
  kategori: string
  yer: string
  tarih: string
  fotolar: string[]
  kapakFoto: string
}

const KATEGORI: Record<string, string> = { ralli: "Ralli", etkinlik: "Toplantı", ofis: "Ofis" }

export function AlbumKart({ a }: { a: AlbumOzet }) {
  return (
    <Link href={`/galeri/${a.slug}`} data-imlec="Aç" className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#ebe6dc]">
        {a.kapakFoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={a.kapakFoto}
            alt={a.baslik}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2 text-[#6b665e]">
            <Camera className="size-7" />
            <span className="text-sm">Fotoğraflar yakında</span>
          </div>
        )}
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium backdrop-blur">
          {KATEGORI[a.kategori] ?? a.kategori}
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg leading-snug font-semibold">{a.baslik}</h3>
          <p className="mono mt-1 text-sm text-[#6b665e]">
            {[a.yer, a.tarih, a.fotolar.length ? `${a.fotolar.length} fotoğraf` : ""].filter(Boolean).join(" · ")}
          </p>
        </div>
        <ArrowUpRight className="mt-1 size-5 shrink-0 text-[#6b665e] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#4a2b1d]" />
      </div>
    </Link>
  )
}
