"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, ArrowUpRight, MoveRight } from "lucide-react"
import { ProjeOnizleme } from "@/components/project-preview"

type Proje = {
  ad: string
  yil?: string
  rol?: string
  aciklama: string
  etiketler: string[]
  link: string
  onizleme?: string
  canli?: boolean
}

// Her kart farklı bir ayçiçeği tonunda
const TEMALAR = [
  { bg: "#ffc21a", fg: "#2a1708", soft: "rgba(42,23,8,0.12)", stroke: "rgba(42,23,8,0.18)" },
  { bg: "#ff8a1f", fg: "#2a1708", soft: "rgba(42,23,8,0.12)", stroke: "rgba(42,23,8,0.2)" },
  { bg: "#ff4f8b", fg: "#ffffff", soft: "rgba(255,255,255,0.18)", stroke: "rgba(255,255,255,0.3)" },
  { bg: "#fff8ea", fg: "#2a1708", soft: "rgba(255,138,31,0.15)", stroke: "rgba(255,138,31,0.35)" },
]

function clamp(v: number, a: number, b: number) {
  return Math.min(b, Math.max(a, v))
}

// Masaüstü: sayfa aşağı kaydıkça kartlar yatay olarak akar (bölüm sabitlenir).
// Mobil: parmakla sağa-sola kaydırılan kart dizisi.
export function ProjectsShowcase({
  projeler,
  toplam,
  devamLink = "/projeler",
}: {
  projeler: Proje[]
  toplam?: number
  devamLink?: string
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [pinned, setPinned] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)")
    const apply = () => setPinned(mq.matches)
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    if (!pinned) {
      section.style.height = ""
      track.style.transform = ""
      return
    }

    let raf = 0
    const update = () => {
      raf = 0
      const dist = Math.max(0, track.scrollWidth - window.innerWidth)
      section.style.height = `${window.innerHeight + dist}px`
      const top = section.getBoundingClientRect().top
      const p = dist > 0 ? clamp(-top / dist, 0, 1) : 0
      track.style.transform = `translate3d(${-p * dist}px,0,0)`
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`
      section.style.setProperty("--p", String(p))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [pinned])

  // Mobil (ve hareket azaltma açıkken): /giris'teki gibi alt alta kartlar,
  // her önizleme sitenin ayçiçeği tonlarından birinde çerçevelenir.
  if (!pinned) {
    return (
      <section ref={sectionRef} id="projeler" className="relative bg-[#2a1708] px-5 py-20 text-[#fff8ea] sm:px-8">
        <h2 className="text-[clamp(38px,10vw,64px)] leading-[0.95] font-extrabold tracking-tight">
          Yürüttüğüm <span className="vurgu vurgu-acik">projeler</span>
        </h2>
        <div className="mt-12 grid gap-y-14 sm:grid-cols-2 sm:gap-x-6">
          {projeler.map((p, i) => {
            const t = TEMALAR[i % TEMALAR.length]
            return (
              <article key={i}>
                <div className="p-3" style={{ background: t.bg }}>
                  <ProjeOnizleme
                    src={p.onizleme || undefined}
                    ad={p.ad}
                    link={p.canli === false ? undefined : p.link}
                    koyu={t.bg === "#fff8ea"}
                    className="rounded-none"
                  />
                </div>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-start justify-between gap-3"
                >
                  <h3 className="text-2xl font-extrabold tracking-tight">{p.ad}</h3>
                  <ArrowUpRight className="mt-1 size-5 shrink-0 text-[#ffd24a]" />
                </a>
                <p className="mt-2 text-sm leading-relaxed text-[#fff8ea]/65">{p.aciklama}</p>
                <p className="mt-3 text-xs font-bold tracking-wide text-[#ffd24a]/80 uppercase">{p.etiketler.join(" · ")}</p>
              </article>
            )
          })}
        </div>
        <a
          href={devamLink}
          className="mt-14 flex items-center justify-between gap-4 border-t border-white/15 pt-6 text-lg font-bold"
        >
          <span>
            Tüm projeler <span className="text-[#ffd24a]">({toplam ?? projeler.length})</span>
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#ffc21a] px-5 py-2.5 text-sm text-[#2a1708]">
            Devamını gör <ArrowRight className="size-4" />
          </span>
        </a>
      </section>
    )
  }

  return (
    <section ref={sectionRef} id="projeler" className="relative bg-[#2a1708] text-[#fff8ea]">
      <div className={pinned ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : "py-20"}>

        <div
          ref={trackRef}
          className={
            pinned
              ? "flex w-max items-stretch gap-8 px-[8vw] will-change-transform"
              : "flex snap-x snap-mandatory scroll-px-5 items-stretch gap-4 overflow-x-auto px-5 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          }
        >
          {/* Giriş kartı */}
          <div className="flex w-[78vw] shrink-0 snap-start flex-col justify-center md:w-[520px]">
            <h2 className="text-[clamp(38px,10vw,64px)] leading-[0.95] font-extrabold tracking-tight">
              Yürüttüğüm
              <br />
              <span className="vurgu vurgu-acik">
                projeler
              </span>
            </h2>
            <p className="mt-6 flex items-center gap-3 text-sm font-semibold text-[#fff8ea]/60">
              <MoveRight className="size-5 animate-pulse" />
              {pinned ? "Aşağı kaydırdıkça projeler akar" : "Sağa kaydır"}
            </p>
          </div>

          {projeler.map((p, i) => {
            const t = TEMALAR[i % TEMALAR.length]
            return (
              <article
                key={i}
                className="group relative flex min-h-[460px] w-[82vw] shrink-0 snap-center flex-col overflow-hidden rounded-[32px] p-7 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:-translate-y-2 sm:p-10 md:h-[min(700px,86vh)] md:w-[540px]"
                style={{ background: t.bg, color: t.fg }}
              >

                {/* Site önizlemesi (fotoğraf / video) */}
                <ProjeOnizleme
                  src={p.onizleme}
                  ad={p.ad}
                  link={p.canli === false ? undefined : p.link}
                  koyu={t.bg === "#fff8ea"}
                  className="relative transition-transform duration-700 group-hover:-translate-y-1 group-hover:rotate-[-1deg]"
                />

                <h3 className="relative mt-6 text-3xl leading-[0.95] font-extrabold tracking-tight text-balance sm:text-5xl">
                  {p.link ? (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="group/l hover:underline hover:decoration-2 hover:underline-offset-4">
                      {p.ad}
                      <ArrowUpRight className="ml-2 inline size-8 transition-transform duration-300 group-hover/l:translate-x-1 group-hover/l:-translate-y-1" />
                    </a>
                  ) : (
                    p.ad
                  )}
                </h3>

                <p className="relative mt-3 line-clamp-3 max-w-md leading-relaxed opacity-85">{p.aciklama}</p>

                <p className="relative mt-auto pt-5 text-sm font-bold opacity-70">{p.etiketler.join(" · ")}</p>
              </article>
            )
          })}

          {/* Bitiş kartı: tüm projeler sayfasına git */}
          <a
            href={devamLink}
            className="group relative flex min-h-[460px] w-[78vw] shrink-0 snap-center flex-col items-start justify-center overflow-hidden rounded-[32px] border-2 border-dashed border-[#ffd24a]/40 p-10 transition-colors hover:border-[#ffd24a] md:h-[min(700px,86vh)] md:w-[420px]"
          >
            <span className="text-[120px] leading-none font-extrabold text-transparent [-webkit-text-stroke:2px_#ffd24a]">
              {toplam ?? projeler.length}
            </span>
            <p className="mt-4 text-4xl leading-tight font-extrabold tracking-tight">
              Toplam proje.
              <br />
              <span className="text-[#ffd24a]">Hepsini görmek ister misin?</span>
            </p>
            <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ffc21a] px-5 py-2.5 text-sm font-bold text-[#2a1708]">
              Devamını gör <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        </div>

        {/* İlerleme çubuğu (masaüstü) */}
        {pinned && (
          <div className="absolute inset-x-[8vw] bottom-10 h-1 overflow-hidden rounded-full bg-white/10">
            <div
              ref={barRef}
              className="h-full origin-left rounded-full bg-gradient-to-r from-[#ffc21a] via-[#ff8a1f] to-[#ff4f8b]"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        )}
      </div>
    </section>
  )
}
