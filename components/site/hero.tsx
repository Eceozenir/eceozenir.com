"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

// Giriş: tam ekran video.
//  - Üstte ekran genişliğini dolduran dev isim (harfleri fareden kaçar)
//  - Ortada kısa slogan ve çerçeveli düğme
//  - Altta akan referans isimleri
//  - Fare: video karanlık, imlecin olduğu yer el feneri gibi aydınlanır
export function Hero({
  video,
  isim,
  slogan,
  referanslar,
}: {
  video: string
  isim: string
  slogan: string
  referanslar: string[]
}) {
  const bolumRef = useRef<HTMLElement>(null)
  const kapRef = useRef<HTMLDivElement>(null)
  const isimRef = useRef<HTMLHeadingElement>(null)

  // Dev ismi ekran genişliğine sığdır
  useEffect(() => {
    const kap = kapRef.current
    const yazi = isimRef.current
    if (!kap || !yazi) return
    const sigdir = () => {
      yazi.style.fontSize = "100px"
      const st = getComputedStyle(kap)
      const alan = kap.clientWidth - parseFloat(st.paddingLeft) - parseFloat(st.paddingRight)
      yazi.style.fontSize = `${Math.floor(100 * (alan / yazi.scrollWidth) * 0.98)}px`
    }
    sigdir()
    document.fonts?.ready.then(sigdir)
    const ro = new ResizeObserver(sigdir)
    ro.observe(kap)
    return () => ro.disconnect()
  }, [])

  // El feneri + kaçan harfler (yalnızca fare olan cihazlarda)
  useEffect(() => {
    const bolum = bolumRef.current
    const yazi = isimRef.current
    if (!bolum || !yazi) return
    const fare = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const sakin = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fare || sakin) return
    bolum.classList.add("fener-acik")

    const harfler = Array.from(yazi.querySelectorAll<HTMLSpanElement>("[data-harf]"))
    let merkezler: { x: number; y: number }[] = []
    const olc = () => {
      harfler.forEach((h) => (h.style.transform = ""))
      merkezler = harfler.map((h) => {
        const r = h.getBoundingClientRect()
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 + window.scrollY }
      })
    }
    olc()
    const ro = new ResizeObserver(olc)
    ro.observe(yazi)
    document.fonts?.ready.then(olc)
    const gec = window.setTimeout(olc, 1300)

    let mx = -9999, my = -9999, raf = 0
    const ofset = harfler.map(() => ({ x: 0, y: 0, d: 0 }))
    const kare = () => {
      raf = 0
      let hareketli = mx > -9000
      const sy = window.scrollY
      const yaricap = Math.max(140, (merkezler[1]?.x ?? 0) - (merkezler[0]?.x ?? 0)) * 1.4
      harfler.forEach((h, i) => {
        const m = merkezler[i]
        if (!m) return
        const dx = m.x - mx
        const dy = m.y - sy - my
        const d = Math.hypot(dx, dy)
        let tx = 0, ty = 0, rot = 0
        if (d < yaricap && d > 0.1) {
          const g = (1 - d / yaricap) ** 2
          tx = (dx / d) * g * 46
          ty = (dy / d) * g * 46
          rot = (dx / d) * g * 14
        }
        const o = ofset[i]
        o.x += (tx - o.x) * 0.14
        o.y += (ty - o.y) * 0.14
        o.d += (rot - o.d) * 0.14
        if (Math.abs(o.x) + Math.abs(o.y) > 0.05) hareketli = true
        h.style.transform =
          Math.abs(o.x) + Math.abs(o.y) > 0.05 ? `translate(${o.x.toFixed(1)}px, ${o.y.toFixed(1)}px) rotate(${o.d.toFixed(1)}deg)` : ""
      })
      // Fare dışarıda ve harfler yerine oturduysa dur (boşuna çalışmasın)
      if (hareketli) raf = requestAnimationFrame(kare)
    }
    const baslat = () => {
      if (!raf) raf = requestAnimationFrame(kare)
    }

    const hareket = (e: MouseEvent) => {
      const r = bolum.getBoundingClientRect()
      mx = e.clientX
      my = e.clientY
      bolum.style.setProperty("--mx", `${e.clientX - r.left}px`)
      bolum.style.setProperty("--my", `${e.clientY - r.top}px`)
      baslat()
    }
    const cik = () => {
      mx = my = -9999
      baslat()
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

  const seritYazilari = [...referanslar, ...referanslar]

  return (
    <section
      ref={bolumRef}
      className="hero-fener relative -mt-16 flex min-h-[100svh] flex-col overflow-hidden bg-[#1a0f0a] text-[#fbfaf6] sm:-mt-[72px]"
    >
      <video src={video} autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 size-full object-cover" />
      <div aria-hidden className="hero-karanlik absolute inset-0" />

      {/* Dev isim */}
      <div ref={kapRef} className="relative mx-auto w-full max-w-[1400px] px-4 pt-24 sm:px-8 sm:pt-28">
        <h1
          ref={isimRef}
          aria-label={isim}
          className="foto-gir inline-block leading-[0.86] font-light whitespace-nowrap uppercase"
          style={{ fontSize: "17vw", letterSpacing: "-0.055em", whiteSpace: "nowrap", textWrap: "nowrap" }}
        >
          {Array.from(isim).map((h, i) =>
            h === " " ? (
              <span key={i} aria-hidden className="inline-block w-[0.22em]" />
            ) : (
              <span key={i} aria-hidden data-harf className="inline-block will-change-transform">
                {h}
              </span>
            )
          )}
        </h1>
      </div>

      {/* Ortada slogan ve düğmeler */}
      <div className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-5 py-12 text-center">
        <p className="foto-gir text-[clamp(22px,2.6vw,30px)] leading-[1.2] font-light text-[#fbfaf6]" style={{ animationDelay: "200ms" }}>
          {slogan}
        </p>
        <div className="foto-gir mt-8 flex flex-col items-center gap-3 sm:flex-row" style={{ animationDelay: "320ms" }}>
          <Link
            href="/projeler"
            data-miknatis
            className="inline-flex items-center gap-2 rounded-full border border-[#fbfaf6] px-8 py-3.5 text-[13px] tracking-[0.06em] uppercase transition-colors hover:bg-[#fbfaf6] hover:text-black"
          >
            <ArrowUpRight className="size-4" /> Projeleri gör
          </Link>
          <a
            href="#iletisim"
            data-miknatis
            className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[13px] tracking-[0.06em] text-[#fbfaf6]/80 uppercase transition-colors hover:text-[#fbfaf6]"
          >
            İletişime geç
          </a>
        </div>
      </div>

      {/* Altta akan referans isimleri */}
      <div aria-label="Referanslar" className="relative overflow-hidden pb-6 sm:pb-8">
        <div className="marquee-track flex w-max">
          {seritYazilari.map((r, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center px-6 text-[clamp(34px,5.4vw,72px)] leading-[1.3] font-light tracking-[-0.03em] whitespace-nowrap text-[#fbfaf6]/85 sm:px-10"
            >
              {r}
              <span aria-hidden className="ml-12 inline-block size-2 rounded-full bg-[#fbfaf6]/50 sm:ml-20" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
