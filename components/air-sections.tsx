"use client"

import { useEffect, useRef } from "react"
import { ProjeOnizleme } from "@/components/project-preview"

type Proje = { ad: string; yil?: string; onizleme?: string }

function clamp(v: number, a = 0, b = 1) {
  return Math.min(b, Math.max(a, v))
}

// Bir bölümün ekrandaki ilerlemesini (0 → 1) her karede verir.
function useScrollProgress(cb: (p: number) => void) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let raf = 0
    const frame = () => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = clamp((vh - r.top) / (vh + r.height))
      cb(reduce ? 0.5 : p)
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [cb])
  return ref
}

// İki satır, kaydırdıkça zıt yönlere kayan proje önizlemeleri
export function PreviewRows({ projeler, baslik, vurgu }: { projeler: Proje[]; baslik?: string; vurgu?: string }) {
  const row1 = useRef<HTMLDivElement>(null)
  const row2 = useRef<HTMLDivElement>(null)
  const cb = useRef((p: number) => {
    const w = window.innerWidth
    const kay = Math.min(900, w * 0.6)
    if (row1.current) row1.current.style.transform = `translate3d(${-kay * p + kay * 0.15}px,0,0)`
    if (row2.current) row2.current.style.transform = `translate3d(${kay * p - kay * 0.85}px,0,0)`
  }).current
  const sectionRef = useScrollProgress(cb)

  // Satırlar boş kalmasın diye listeyi çoğalt
  const dolu = projeler.length ? projeler : [{ ad: "Proje" }]
  const uzat = (arr: Proje[]) => {
    const out: Proje[] = []
    while (out.length < 8) out.push(...arr)
    return out.slice(0, Math.max(8, arr.length))
  }
  const satir1 = uzat(dolu)
  const satir2 = uzat([...dolu].reverse())

  const Kart = ({ p }: { p: Proje }) => (
    <figure className="w-[260px] shrink-0 sm:w-[340px] lg:w-[400px]">
      <ProjeOnizleme src={p.onizleme} ad={p.ad} />
      <figcaption className="mt-2 flex items-center justify-between px-1 text-[13px] font-medium text-[#2a1708]/70">
        <span className="truncate">{p.ad}</span>
        <span>{p.yil}</span>
      </figcaption>
    </figure>
  )

  return (
    <section ref={sectionRef} className="overflow-hidden py-24 sm:py-32" aria-label="Proje önizlemeleri">
      {(baslik || vurgu) && (
      <h2 className="mx-auto mb-14 max-w-[1150px] px-6 text-center text-[clamp(32px,5vw,56px)] leading-[1] font-medium tracking-tight text-[#2a1708]">
        {baslik}{" "}
        <span
          className="inline-block -rotate-3 bg-gradient-to-r from-[#f59f00] via-[#f76707] to-[#e64980] bg-clip-text pr-2 text-[1.25em] text-transparent"
          style={{ fontFamily: "var(--font-caveat), cursive" }}
        >
          {vurgu}
        </span>
      </h2>
      )}
      <div className="space-y-5 sm:space-y-6">
        <div ref={row1} className="flex w-max gap-5 will-change-transform sm:gap-6">
          {satir1.map((p, i) => (
            <Kart key={`a${i}`} p={p} />
          ))}
        </div>
        <div ref={row2} className="flex w-max gap-5 will-change-transform sm:gap-6">
          {satir2.map((p, i) => (
            <Kart key={`b${i}`} p={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Ekran kenarlarına taşan dev yazı; satırlar kaydırdıkça zıt yönlere kayar
export function GiantStatement({ satirlar, elYazisi }: { satirlar: string[]; elYazisi?: string }) {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const yaziRef = useRef<HTMLSpanElement>(null)
  const cb = useRef((p: number) => {
    refs.current.forEach((el, i) => {
      if (!el) return
      const yon = i % 2 === 0 ? -1 : 1
      el.style.transform = `translate3d(${yon * (p - 0.5) * 18}vw,0,0)`
    })
    if (yaziRef.current) {
      const s = clamp((p - 0.25) / 0.3)
      yaziRef.current.style.opacity = String(s)
      yaziRef.current.style.transform = `translate(-50%,-50%) rotate(-8deg) scale(${0.6 + s * 0.4})`
    }
  }).current
  const sectionRef = useScrollProgress(cb)

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-16 sm:py-24" aria-label={satirlar.join(" ")}>
      <div aria-hidden>
        {satirlar.map((s, i) => (
          <div
            key={i}
            ref={(el) => {
              refs.current[i] = el
            }}
            className="text-center leading-[0.85] whitespace-nowrap text-[#2a1708] uppercase will-change-transform"
            style={{
              fontFamily: "var(--font-anton), Impact, sans-serif",
              fontSize: "clamp(88px, 19vw, 259px)",
            }}
          >
            {s}
          </div>
        ))}
      </div>
      {elYazisi && (
      <span
        ref={yaziRef}
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 bg-gradient-to-r from-[#ffc21a] via-[#ff8a1f] to-[#ff4f8b] bg-clip-text px-4 text-transparent"
        style={{
          fontFamily: "var(--font-caveat), cursive",
          fontSize: "clamp(64px, 11vw, 170px)",
          lineHeight: 1,
          opacity: 0,
          filter: "drop-shadow(0 4px 0 #fff8ea) drop-shadow(0 -4px 0 #fff8ea) drop-shadow(4px 0 0 #fff8ea) drop-shadow(-4px 0 0 #fff8ea)",
        }}
      >
        {elYazisi}
      </span>
      )}
    </section>
  )
}
