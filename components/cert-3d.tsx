"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { X, ZoomIn, ZoomOut } from "lucide-react"

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
  const [buyuk, setBuyuk] = useState(false)
  const acRef = useRef(() => {})
  acRef.current = () => setBuyuk(true)

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
      if (moved < 6) acRef.current()
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
      className="relative mx-auto w-full max-w-[760px] cursor-grab touch-pan-y select-none active:cursor-grabbing"
      style={{ perspective: "1400px" }}
      role="img"
      aria-label={`${kurum}, ${baslik} sertifikası`}
    >
      {/* Arkadaki sıcak hale */}
      <div aria-hidden className="absolute inset-[8%] rounded-[40px] bg-[#4a2b1d]/15 blur-3xl" />

      <div className="relative">
      <div ref={cardRef} className="relative aspect-[1754/1240] w-full will-change-transform" style={{ transformStyle: "preserve-3d" }}>
        {/* Kenar kalınlığı */}
        {Array.from({ length: KALINLIK }).map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-[14px]"
            style={{
              transform: `translateZ(${i - KALINLIK / 2}px)`,
              background: i % 2 ? "#5a3727" : "#4a2b1d",
            }}
          />
        ))}

        {/* Ön yüz: sertifika */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[14px] bg-white ring-1 ring-black/10"
          style={{ transform: `translateZ(${KALINLIK / 2}px)`, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
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
          className="absolute inset-0 overflow-hidden rounded-[14px] bg-gradient-to-br from-[#5a3727] via-[#4a2b1d] to-[#2e1a10] text-[#fbfaf6] [container-type:size]"
          style={{ transform: `rotateY(180deg) translateZ(${KALINLIK / 2}px)`, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div className="flex size-full flex-col justify-between p-[6cqw]">
            <p className="text-[2.6cqw] font-semibold tracking-[0.25em] text-[#e6cdb6]">SERTİFİKA</p>
            <div className="min-w-0">
              <p className="text-[6.2cqw] leading-[1.05] font-semibold tracking-tight">{baslik}</p>
              <p className="mt-[1.5cqw] text-[3cqw] text-[#e6cdb6]">{kurum}</p>
              {detay && <p className="mt-[2cqw] line-clamp-3 max-w-[85%] text-[2.5cqw] leading-relaxed text-[#fbfaf6]/75">{detay}</p>}
            </div>
            <div className="flex items-end justify-between text-[2.5cqw] text-[#fbfaf6]/80">
              <span>{tarih}</span>
              <span>Ece Özenir</span>
            </div>
          </div>
        </div>
      </div>

      </div>

      {/* Kullanım ipucu */}
      <div
        ref={ipucuRef}
        className="pointer-events-none mt-6 text-center text-sm text-[#6b665e] transition-opacity duration-500"
      >
        Sürükleyerek çevir · tıklayınca büyüsün
      </div>
      {buyuk && <SertifikaBuyuk gorsel={gorsel} baslik={baslik} kapat={() => setBuyuk(false)} />}
    </div>
  )
}

// Sertifikayı tam ekranda gösterir. Görsele tıklayınca/dokununca yakınlaşır,
// yakınken fareyle (ya da parmakla sürükleyerek) gezilir.
function SertifikaBuyuk({ gorsel, baslik, kapat }: { gorsel: string; baslik: string; kapat: () => void }) {
  const [yakin, setYakin] = useState(false)
  const [nokta, setNokta] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const tus = (e: KeyboardEvent) => e.key === "Escape" && kapat()
    window.addEventListener("keydown", tus)
    const eski = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", tus)
      document.body.style.overflow = eski
    }
  }, [kapat])

  const konum = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setNokta({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${baslik} sertifikası`}
      className="foto-gir fixed inset-0 z-[200] flex items-center justify-center bg-[#141414]/90 p-3 sm:p-8"
      onClick={kapat}
    >
      <div className="absolute top-3 right-3 flex gap-2 sm:top-5 sm:right-5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setYakin((y) => !y)
          }}
          className="flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label={yakin ? "Uzaklaştır" : "Yakınlaştır"}
        >
          {yakin ? <ZoomOut className="size-5" /> : <ZoomIn className="size-5" />}
        </button>
        <button
          type="button"
          onClick={kapat}
          className="flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Kapat"
        >
          <X className="size-5" />
        </button>
      </div>
      <div
        className={`relative max-h-full w-full max-w-6xl overflow-hidden rounded-xl bg-white shadow-2xl ${yakin ? "cursor-zoom-out touch-none" : "cursor-zoom-in"}`}
        style={{ aspectRatio: "1754 / 1240", maxHeight: "calc(100dvh - 7rem)" }}
        onClick={(e) => {
          e.stopPropagation()
          konum(e as unknown as React.PointerEvent<HTMLDivElement>)
          setYakin((y) => !y)
        }}
        onPointerMove={(e) => yakin && konum(e)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={gorsel}
          alt={`${baslik} sertifikası`}
          draggable={false}
          className="size-full object-contain transition-transform duration-300 ease-out select-none"
          style={{ transform: yakin ? "scale(2.4)" : "scale(1)", transformOrigin: `${nokta.x}% ${nokta.y}%` }}
        />
      </div>
      <p className="pointer-events-none absolute bottom-4 left-0 w-full text-center text-sm text-white/60">
        {yakin ? "Gezmek için imleci gezdir · tekrar tıkla" : "Yakınlaştırmak için tıkla"}
      </p>
    </div>,
    document.body
  )
}
