"use client"

import { useRef, useState } from "react"
import { RotateCw } from "lucide-react"

// Kartvizit: fareyle hafifçe eğilir, tıklayınca çevrilip diğer yüzü (İngilizce) görünür.
export function Kartvizit({ on, arka }: { on: string; arka?: string }) {
  const [ters, setTers] = useState(false)
  const kartRef = useRef<HTMLDivElement>(null)

  const egil = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse" || !kartRef.current) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    kartRef.current.style.setProperty("--ex", `${-y * 10}deg`)
    kartRef.current.style.setProperty("--ey", `${x * 14}deg`)
  }
  const sifirla = () => {
    kartRef.current?.style.setProperty("--ex", "0deg")
    kartRef.current?.style.setProperty("--ey", "0deg")
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => arka && setTers((t) => !t)}
        onPointerMove={egil}
        onPointerLeave={sifirla}
        className="block w-full cursor-pointer rounded-[14px] focus-visible:ring-4 focus-visible:ring-[#2a1708]/40 focus-visible:outline-none"
        style={{ perspective: "1200px" }}
        aria-label={arka ? "Kartviziti çevir" : "Kartvizit"}
      >
        <div
          ref={kartRef}
          className="relative aspect-[1700/1100] w-full transition-transform duration-700 [transform-style:preserve-3d]"
          style={{
            transform: `rotateX(var(--ex, 0deg)) rotateY(calc(var(--ey, 0deg) + ${ters ? 180 : 0}deg))`,
            transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        >
          <Yuz src={on} alt="Ece Özenir kartviziti — Türkçe" />
          {arka && <Yuz src={arka} alt="Ece Özenir kartviziti — İngilizce" arka />}
        </div>
      </button>
      {arka && (
        <p className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-[#2a1708]/70">
          <RotateCw className="size-4" /> Tıkla, çevir · {ters ? "English" : "Türkçe"}
        </p>
      )}
    </div>
  )
}

function Yuz({ src, alt, arka = false }: { src: string; alt: string; arka?: boolean }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-[14px] bg-white shadow-[0_30px_60px_-20px_rgba(42,23,8,0.55)] ring-1 ring-black/5 [backface-visibility:hidden]"
      style={arka ? { transform: "rotateY(180deg)" } : undefined}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} draggable={false} className="size-full object-cover" />
    </div>
  )
}
