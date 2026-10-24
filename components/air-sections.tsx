"use client"

import { useEffect, useRef } from "react"

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
    // Sadece bölüm ekrandayken ve sayfa kaydırılırken hesapla (sürekli çalışmasın)
    let raf = 0
    let gorunur = false
    const hesapla = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      cb(reduce ? 0.5 : clamp((vh - r.top) / (vh + r.height)))
    }
    const kaydir = () => {
      if (gorunur && !raf) raf = requestAnimationFrame(hesapla)
    }
    const io = new IntersectionObserver(([e]) => {
      gorunur = e.isIntersecting
      if (gorunur) kaydir()
    })
    io.observe(el)
    hesapla()
    window.addEventListener("scroll", kaydir, { passive: true })
    window.addEventListener("resize", kaydir)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", kaydir)
      window.removeEventListener("resize", kaydir)
    }
  }, [cb])
  return ref
}

export function GiantStatement({ satirlar, elYazisi }: { satirlar: string[]; elYazisi?: string }) {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const yaziRef = useRef<HTMLSpanElement>(null)
  const kureRef = useRef<HTMLDivElement>(null)
  const cb = useRef((p: number) => {
    // Küre kaydırdıkça büyür ve renkleri döner
    if (kureRef.current) {
      kureRef.current.style.transform = `translate(-50%,-50%) scale(${0.75 + p * 0.45}) rotate(${(p - 0.5) * 120}deg)`
    }
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
    <section ref={sectionRef} className="relative overflow-hidden py-32 sm:py-40" aria-label={satirlar.join(" ")}>
      {/* İnce eş merkezli halkalar */}
      <svg
        aria-hidden
        viewBox="0 0 1000 1000"
        className="pointer-events-none absolute top-1/2 left-1/2 size-[min(150vw,1100px)] -translate-x-1/2 -translate-y-1/2"
        fill="none"
        stroke="#141414"
        strokeOpacity="0.14"
      >
        <circle cx="500" cy="500" r="250" vectorEffect="non-scaling-stroke" />
        <circle cx="500" cy="500" r="360" vectorEffect="non-scaling-stroke" />
        <circle cx="500" cy="500" r="480" vectorEffect="non-scaling-stroke" />
      </svg>
      {/* Yanardöner küre */}
      <div
        ref={kureRef}
        aria-hidden
        className="kure pointer-events-none absolute top-1/2 left-1/2 size-[min(62vw,520px)] will-change-transform"
        style={{ transform: "translate(-50%,-50%) scale(0.95)" }}
      />
      <div aria-hidden className="relative">
        {satirlar.map((s, i) => (
          <div
            key={i}
            ref={(el) => {
              refs.current[i] = el
            }}
            className="text-center leading-[1] whitespace-nowrap text-[#141414] uppercase will-change-transform"
            style={{
              fontWeight: 300,
              letterSpacing: "-0.05em",
              fontSize: "clamp(76px, 17vw, 240px)",
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
        className="pointer-events-none absolute top-1/2 left-1/2 bg-gradient-to-r from-[#f8a55e] via-[#f47b2a] to-[#fbbf91] bg-clip-text px-4 text-transparent"
        style={{
          fontFamily: "var(--font-caveat), cursive",
          fontSize: "clamp(64px, 11vw, 170px)",
          lineHeight: 1,
          opacity: 0,
          filter: "drop-shadow(0 4px 0 #fffaf2) drop-shadow(0 -4px 0 #fffaf2) drop-shadow(4px 0 0 #fffaf2) drop-shadow(-4px 0 0 #fffaf2)",
        }}
      >
        {elYazisi}
      </span>
      )}
    </section>
  )
}
