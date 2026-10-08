"use client"

import { useEffect, useRef } from "react"

// Fareyle eğilen, sürükleyerek çevrilebilen 3B sertifika kartı.
// Ön yüz: sertifika görseli. Arka yüz: kısa bilgi.
export function Certificate3D({
  gorsel,
  baslik,
  kurum,
  detay,
  tarih,
}: {
  gorsel: string
  baslik: string
  kurum: string
  detay?: string
  tarih?: string
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const ipucuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const card = cardRef.current
    if (!wrap || !card) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let hx = 0 // fare eğimi (hedef)
    let hy = 0
    let tx = 0 // fare eğimi (yumuşatılmış)
    let ty = 0
    let spin = 0 // sürükleyerek çevirme açısı
    let spinTarget = 0
    let dragging = false
    let moved = 0
    let lastX = 0
    let t = 0
    let raf = 0

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect()
      hx = ((e.clientX - r.left) / r.width - 0.5) * 2
      hy = ((e.clientY - r.top) / r.height - 0.5) * 2
      if (dragging) {
        const dx = e.clientX - lastX
        lastX = e.clientX
        moved += Math.abs(dx)
        spinTarget += dx * 0.6
      }
    }
    const onLeave = () => {
      hx = 0
      hy = 0
    }
    const onDown = (e: PointerEvent) => {
      dragging = true
      moved = 0
      lastX = e.clientX
      try {
        wrap.setPointerCapture(e.pointerId)
      } catch {}
      if (ipucuRef.current) ipucuRef.current.style.opacity = "0"
    }
    const onUp = (e: PointerEvent) => {
      if (!dragging) return
      dragging = false
      // En yakın yüze (ön ya da arka) otur
      spinTarget = Math.round(spinTarget / 180) * 180
      // Sürüklemeden tıklandıysa: kartı çevir
      if (moved < 6) spinTarget += 180
      try {
        wrap.releasePointerCapture(e.pointerId)
      } catch {}
    }

    wrap.addEventListener("pointermove", onMove)
    wrap.addEventListener("pointerleave", onLeave)
    wrap.addEventListener("pointerdown", onDown)
    wrap.addEventListener("pointerup", onUp)
    wrap.addEventListener("pointercancel", onUp)

    const frame = () => {
      t += 1 / 60
      const r = wrap.getBoundingClientRect()
      const vh = window.innerHeight
      // Ekrana girerken yatık, ortaya gelince düz
      const giris = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.9)))
      tx += (hx - tx) * 0.08
      ty += (hy - ty) * 0.08
      spin += (spinTarget - spin) * 0.1
      const bekleme = reduce ? 0 : Math.sin(t * 0.8) * 4
      const rx = (1 - giris) * 40 - ty * 14 + (reduce ? 0 : Math.sin(t * 0.6) * 2)
      const ry = spin + tx * 18 + bekleme
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
      // Işık parlaması fareyi takip eder
      card.style.setProperty("--gx", `${50 + tx * 40}%`)
      card.style.setProperty("--gy", `${50 + ty * 40}%`)
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      wrap.removeEventListener("pointermove", onMove)
      wrap.removeEventListener("pointerleave", onLeave)
      wrap.removeEventListener("pointerdown", onDown)
      wrap.removeEventListener("pointerup", onUp)
      wrap.removeEventListener("pointercancel", onUp)
    }
  }, [])

  const KALINLIK = 10

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto w-full max-w-[600px] cursor-grab touch-pan-y select-none active:cursor-grabbing"
      style={{ perspective: "1400px" }}
      role="img"
      aria-label={`${kurum} — ${baslik} sertifikası`}
    >
      {/* Arkadaki sıcak hale */}
      <div aria-hidden className="absolute inset-[8%] rounded-[40px] bg-gradient-to-br from-[#f2cf7e]/40 via-[#eda57a]/30 to-[#e7a1b4]/30 blur-3xl" />

      <div className="relative">
      {/* 360° dönüş halkası — arka yarısı (kartın arkasında kalır) */}
      <svg aria-hidden viewBox="0 0 400 100" preserveAspectRatio="none" className="pointer-events-none absolute -inset-x-[9%] top-[52%] h-[72%] w-[118%]">
        <defs>
          <linearGradient id="halka-renk" x1="0" x2="1">
            <stop offset="0" stopColor="#f2cf7e" />
            <stop offset="0.5" stopColor="#eda57a" />
            <stop offset="1" stopColor="#e7a1b4" />
          </linearGradient>
          <marker id="halka-ok" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#e7a1b4" />
          </marker>
        </defs>
        <path d="M12,50 A188,40 0 0 1 388,50" fill="none" stroke="url(#halka-renk)" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="4 8" className="halka-akis" vectorEffect="non-scaling-stroke" />
      </svg>

      <div ref={cardRef} className="relative aspect-[1754/1240] w-full will-change-transform" style={{ transformStyle: "preserve-3d" }}>
        {/* Kenar kalınlığı */}
        {Array.from({ length: KALINLIK }).map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-[14px]"
            style={{
              transform: `translateZ(${i - KALINLIK / 2}px)`,
              background: i % 2 ? "#f2d9b0" : "#e9c995",
            }}
          />
        ))}

        {/* Ön yüz: sertifika */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[14px] bg-white ring-1 ring-black/10"
          style={{ transform: `translateZ(${KALINLIK / 2}px)`, backfaceVisibility: "hidden" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={gorsel} alt={`${baslik} sertifikası`} draggable={false} className="size-full object-cover" />
          {/* Parlama */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
            style={{ background: "radial-gradient(600px circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,0.75), transparent 45%)" }}
          />
        </div>

        {/* Arka yüz */}
        <div
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[14px] bg-gradient-to-br from-[#f2cf7e] via-[#eda57a] to-[#e7a1b4] p-6 text-[#2a1708] sm:p-10"
          style={{ transform: `rotateY(180deg) translateZ(${KALINLIK / 2}px)`, backfaceVisibility: "hidden" }}
        >
          <p className="text-xs font-extrabold tracking-[0.25em] sm:text-sm">SERTİFİKA</p>
          <div>
            <p className="text-3xl leading-[0.95] font-extrabold tracking-tight sm:text-5xl">{baslik}</p>
            <p className="mt-2 text-sm font-bold opacity-80 sm:text-lg">{kurum}</p>
            {detay && <p className="mt-3 max-w-md text-xs leading-relaxed font-semibold opacity-75 sm:text-sm">{detay}</p>}
          </div>
          <div className="flex items-end justify-between text-xs font-bold sm:text-sm">
            <span>{tarih}</span>
            <span className="opacity-70">Ece Özenir</span>
          </div>
        </div>
      </div>

      {/* 360° dönüş halkası — ön yarısı, uçlarında oklar */}
      <svg aria-hidden viewBox="0 0 400 100" preserveAspectRatio="none" className="pointer-events-none absolute -inset-x-[9%] top-[52%] h-[72%] w-[118%] overflow-visible">
        <path
          d="M388,50 A188,40 0 0 1 12,50"
          fill="none"
          stroke="url(#halka-renk)"
          strokeWidth="3"
          strokeLinecap="round"
          markerEnd="url(#halka-ok)"
          vectorEffect="non-scaling-stroke"
        />
        <path d="M388,50 A188,40 0 0 1 12,50" fill="none" stroke="#fff8ea" strokeWidth="3" strokeDasharray="2 22" className="halka-akis" vectorEffect="non-scaling-stroke" />
      </svg>
      {/* 360° etiketi */}
      <div className="pointer-events-none absolute top-[118%] left-1/2 -translate-x-1/2">
        <span className="inline-flex items-center gap-1.5 text-sm font-extrabold tracking-[0.15em] text-[#b85c32]">
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M21 12a9 9 0 1 1-3-6.7" />
            <path d="M21 4v5h-5" />
          </svg>
          360°
        </span>
      </div>
      </div>

      {/* Kullanım ipucu */}
      <div
        ref={ipucuRef}
        className="pointer-events-none mt-24 text-center text-sm font-semibold text-[#2a1708]/55 transition-opacity duration-500 sm:mt-28"
      >
        Sürükleyerek çevir · tıklayınca arkası dönsün
      </div>
    </div>
  )
}
