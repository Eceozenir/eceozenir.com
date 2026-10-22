"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Giriş: tam ekran video.
//  - Fare: video karanlık, imlecin olduğu yer el feneri gibi aydınlanır.
//  - Başlığın harfleri fareden kaçar, sonra yerine döner.
export function Hero({
  video,
  slogan,
  vurgu,
  rozet,
  metin,
}: {
  video: string
  slogan: string
  vurgu: string
  rozet: string
  metin: string
}) {
  const bolumRef = useRef<HTMLElement>(null)
  const baslikRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const bolum = bolumRef.current
    const baslik = baslikRef.current
    if (!bolum || !baslik) return
    const fare = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const sakin = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fare || sakin) return
    bolum.classList.add("fener-acik")

    const harfler = Array.from(baslik.querySelectorAll<HTMLSpanElement>("[data-harf]"))
    let merkezler: { x: number; y: number }[] = []
    const olc = () => {
      merkezler = harfler.map((h) => {
        const r = h.getBoundingClientRect()
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 + window.scrollY }
      })
    }
    olc()
    const ro = new ResizeObserver(olc)
    ro.observe(baslik)
    document.fonts?.ready.then(olc)
    const gec = window.setTimeout(olc, 1300)

    let mx = -9999, my = -9999, raf = 0
    const ofset = harfler.map(() => ({ x: 0, y: 0 }))
    const YARICAP = 110

    const kare = () => {
      const sy = window.scrollY
      harfler.forEach((h, i) => {
        const m = merkezler[i]
        if (!m) return
        const dx = m.x - mx
        const dy = m.y - sy - my
        const d = Math.hypot(dx, dy)
        let tx = 0, ty = 0
        if (d < YARICAP && d > 0.1) {
          const g = (1 - d / YARICAP) ** 2 * 22
          tx = (dx / d) * g
          ty = (dy / d) * g
        }
        const o = ofset[i]
        o.x += (tx - o.x) * 0.16
        o.y += (ty - o.y) * 0.16
        h.style.transform = Math.abs(o.x) + Math.abs(o.y) > 0.05 ? `translate(${o.x.toFixed(2)}px, ${o.y.toFixed(2)}px)` : ""
      })
      raf = requestAnimationFrame(kare)
    }
    raf = requestAnimationFrame(kare)

    const hareket = (e: MouseEvent) => {
      const r = bolum.getBoundingClientRect()
      mx = e.clientX
      my = e.clientY
      bolum.style.setProperty("--mx", `${e.clientX - r.left}px`)
      bolum.style.setProperty("--my", `${e.clientY - r.top}px`)
    }
    const cik = () => {
      mx = my = -9999
    }
    bolum.addEventListener("mousemove", hareket)
    bolum.addEventListener("mouseleave", cik)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(gec)
      ro.disconnect()
      bolum.removeEventListener("mousemove", hareket)
      bolum.removeEventListener("mouseleave", cik)
    }
  }, [])

  // Başlığı harflere böl (kelimeler bölünmesin diye kelime kelime sarılır)
  const parcala = (yazi: string, italik = false) =>
    yazi.split(/(\s+)/).map((kelime, k) =>
      /^\s+$/.test(kelime) ? (
        kelime
      ) : (
        <span key={k} className={`inline-block whitespace-nowrap ${italik ? "text-[#fdba74]" : ""}`}>
          {Array.from(kelime).map((h, i) => (
            <span key={i} data-harf className="inline-block will-change-transform">
              {h}
            </span>
          ))}
        </span>
      )
    )
  const parcalar = slogan.split(vurgu)

  return (
    <section
      ref={bolumRef}
      className="hero-fener relative -mt-16 flex min-h-[100svh] items-end overflow-hidden bg-[#0b252a] text-white sm:-mt-[72px]"
    >
      <video src={video} autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 size-full object-cover" />
      <div aria-hidden className="hero-karanlik absolute inset-0" />
      <div className="relative mx-auto w-full max-w-6xl px-5 pt-40 pb-14 sm:px-8 sm:pb-20">
        <span className="foto-gir inline-flex items-center gap-2 rounded-lg bg-black/35 px-3 py-1.5 text-sm backdrop-blur-sm">
          <span className="size-1.5 rounded-full bg-[#4ade80]" />
          {rozet}
        </span>
        <h1
          ref={baslikRef}
          aria-label={slogan}
          className="foto-gir mt-6 max-w-5xl text-[clamp(42px,6.8vw,104px)] leading-[1] text-white"
          style={{ animationDelay: "120ms" }}
        >
          <span aria-hidden>
            {parcalar.length > 1 ? (
              <>
                {parcala(parcalar[0])}
                {parcala(vurgu, true)}
                {parcala(parcalar.slice(1).join(vurgu))}
              </>
            ) : (
              parcala(slogan)
            )}
          </span>
        </h1>
        <p className="foto-gir mt-6 max-w-xl text-lg leading-relaxed text-white/80" style={{ animationDelay: "240ms" }}>
          {metin}
        </p>
        <div className="foto-gir mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "360ms" }}>
          <Link
            href="/projeler"
            data-miknatis
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[15px] font-medium text-black transition-[background-color] hover:bg-[#f6f4ef]"
          >
            Projeleri incele <ArrowRight className="size-4" />
          </Link>
          <a
            href="#iletisim"
            data-miknatis
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white/15 px-6 py-3.5 text-[15px] font-medium text-white backdrop-blur-sm transition-[background-color] hover:bg-white/25"
          >
            İletişime geç
          </a>
        </div>
      </div>
    </section>
  )
}
