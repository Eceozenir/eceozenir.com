import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Ortak, sade yapı taşları

export function Kap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>
}

// Bölüm başlığı: büyük başlık + isteğe bağlı açıklama + sağda "Tümünü gör" bağlantısı
export function BolumBaslik({
  baslik,
  aciklama,
  link,
  linkYazi = "Tümünü gör",
  koyu = false,
}: {
  baslik: React.ReactNode
  aciklama?: React.ReactNode
  link?: string
  linkYazi?: string
  koyu?: boolean
}) {
  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div className="max-w-2xl">
        <h2 className="text-[clamp(34px,4.8vw,60px)] leading-[1.02] font-light">{baslik}</h2>
        {aciklama && <p className={`mt-4 text-lg leading-relaxed ${koyu ? "text-[#fbfaf6]/65" : "text-[#6b665e]"}`}>{aciklama}</p>}
      </div>
      {link && (
        <Link
          href={link}
          className={`group inline-flex shrink-0 items-center gap-2 self-start rounded-full px-5 py-2.5 text-sm font-medium transition-colors md:self-auto ${
            koyu ? "bg-[#fbfaf6] text-[#141414] hover:bg-white" : "bg-white text-[#141414] hover:bg-[#141414] hover:text-[#fbfaf6]"
          }`}
        >
          {linkYazi} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  )
}

// İç sayfaların başlığı
export function SayfaBaslik({ ust, baslik, aciklama }: { ust?: string; baslik: React.ReactNode; aciklama?: React.ReactNode }) {
  return (
    <Kap className="pt-12 pb-14 sm:pt-20 sm:pb-20">
      {ust && <p className="text-[12.5px] tracking-[0.06em] text-[#6b665e] uppercase">{ust}</p>}
      <h1 className="mt-4 max-w-4xl text-[clamp(44px,7vw,96px)] leading-[0.98] font-light">{baslik}</h1>
      {aciklama && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#6b665e]">{aciklama}</p>}
    </Kap>
  )
}
