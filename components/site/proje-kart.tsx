import { ArrowUpRight } from "lucide-react"
import { ProjeOnizleme } from "@/components/project-preview"

type Proje = { ad: string; aciklama: string; etiketler: string[]; link: string; onizleme?: string; canli?: boolean }

export function ProjeKart({ p, kucuk = false }: { p: Proje; kucuk?: boolean }) {
  return (
    <article data-egim data-imlec="Siteyi gez" className="group flex h-full flex-col rounded-3xl bg-white p-3 hover:shadow-[0_24px_50px_-30px_rgba(20,20,20,0.4)] sm:p-4">
      <ProjeOnizleme src={p.onizleme || undefined} ad={p.ad} link={p.canli === false ? undefined : p.link} className="rounded-2xl" />
      <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
        <p className="mono text-xs text-[#6b665e]">{p.etiketler.join(" · ")}</p>
        <a href={p.link} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-start justify-between gap-3">
          <h3 className={`${kucuk ? "text-lg" : "text-xl sm:text-2xl"} leading-snug font-semibold`}>{p.ad}</h3>
          <ArrowUpRight className="mt-1 size-5 shrink-0 text-[#6b665e] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#c2410c]" />
        </a>
        <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-[#6b665e]">{p.aciklama}</p>
      </div>
    </article>
  )
}
