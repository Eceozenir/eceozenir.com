import type { Metadata } from "next"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { ProjeOnizleme } from "@/components/project-preview"
import { Reveal } from "@/components/reveal"
import { katkilar, projeler } from "../bilgilerim"

// Tüm projeler sayfası (/projeler).
// Şimdilik sade bir düzen; tasarımı daha sonra değiştireceğiz.

export const metadata: Metadata = { title: "Projeler — Ece Özenir" }

export default function ProjelerSayfa() {
  return (
    <main className="min-h-screen bg-[#fff8ea] text-[#2a1708]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
        <a
          href="/#projeler"
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold ring-1 ring-[#fbd99a] transition hover:-translate-x-0.5"
        >
          <ArrowLeft className="size-4" /> Ana sayfa
        </a>

        <h1 className="mt-10 text-5xl font-extrabold tracking-tight sm:text-7xl">
          Tüm{" "}
          <span className="bg-gradient-to-r from-[#f59f00] via-[#f76707] to-[#e64980] bg-clip-text text-transparent">projeler</span>
        </h1>
        <p className="mt-4 font-semibold text-[#2a1708]/60">{projeler.length} proje</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projeler.map((p, i) => {
            return (
              <Reveal key={i} delay={(i % 3) * 80} className="h-full">
                <article
                  className="group flex h-full flex-col rounded-[12px] bg-white p-4 ring-1 ring-[#fbd99a] transition duration-300 hover:-translate-y-1"
                >
                  <ProjeOnizleme src={p.onizleme} ad={p.ad} link={"canli" in p && p.canli === false ? undefined : p.link} />
                  <h2 className="mt-4 text-xl font-extrabold">
                    {p.link ? (
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1 hover:text-[#e8590c]">
                        {p.ad}
                        <ArrowUpRight className="mt-0.5 size-5 shrink-0 text-[#e8590c]" />
                      </a>
                    ) : (
                      p.ad
                    )}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#2a1708]/70">{p.aciklama}</p>
                  <p className="mt-auto pt-4 text-xs font-bold text-[#e8590c]">{p.etiketler.join(" · ")}</p>
                </article>
              </Reveal>
            )
          })}
        </div>

        {/* KATKIDA BULUNDUKLARIM */}
        <section id="katkilar" className="mt-24 sm:mt-32">
          <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
              Katkıda{" "}
              <span className="bg-gradient-to-r from-[#f59f00] via-[#f76707] to-[#e64980] bg-clip-text text-transparent">
                bulunduklarım
              </span>
            </h2>
            <p className="max-w-sm font-semibold text-[#2a1708]/60">
              Ekibin bir parçası olarak geliştirilmesine katkı sağladığım siteler.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {katkilar.map((k, i) => (
              <Reveal key={k.ad} delay={(i % 2) * 100} className="h-full">
                <article className="group flex h-full flex-col rounded-[20px] bg-white p-4 ring-1 ring-[#fbd99a] transition duration-300 hover:-translate-y-1 sm:p-5">
                  <ProjeOnizleme
                    src={k.onizleme || undefined}
                    ad={k.ad}
                    link={"canli" in k && k.canli === false ? undefined : k.link}
                  />
                  <h3 className="mt-5 text-2xl font-extrabold tracking-tight">
                    <a href={k.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1.5 hover:text-[#e8590c]">
                      {k.ad}
                      <ArrowUpRight className="mt-1 size-5 shrink-0 text-[#e8590c]" />
                    </a>
                  </h3>
                  <p className="mt-2 leading-relaxed text-[#2a1708]/70">{k.aciklama}</p>
                  <p className="mt-auto pt-4 text-xs font-bold text-[#e8590c]">{k.etiketler.join(" · ")}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
