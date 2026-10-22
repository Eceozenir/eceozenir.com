"use client"

import { useEffect, useRef } from "react"

// Geniş fotoğraf bandı: sayfa aşağı kaydıkça fotoğraf yavaşça yakınlaşır (zoom-out → normal).
export function YakinlasanFoto({
  src,
  alt,
  className = "",
  children,
}: {
  src: string
  alt: string
  className?: string
  children?: React.ReactNode
}) {
  const kapRef = useRef<HTMLDivElement>(null)
  const fotoRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const kap = kapRef.current
    const foto = fotoRef.current
    if (!kap || !foto) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let raf = 0
    let gorunur = false
    const hesapla = () => {
      raf = 0
      const r = kap.getBoundingClientRect()
      const vh = window.innerHeight
      // 0: bant ekranın altına yeni giriyor, 1: bant ekranın ortasına geldi
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.5 + r.height * 0.5)))
      foto.style.transform = `scale(${(1.18 - p * 0.18).toFixed(4)})`
    }
    const kaydir = () => {
      if (gorunur && !raf) raf = requestAnimationFrame(hesapla)
    }
    const io = new IntersectionObserver(([e]) => {
      gorunur = e.isIntersecting
      if (gorunur) kaydir()
    })
    io.observe(kap)
    hesapla()
    window.addEventListener("scroll", kaydir, { passive: true })
    window.addEventListener("resize", kaydir)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", kaydir)
      window.removeEventListener("resize", kaydir)
    }
  }, [])

  return (
    <div ref={kapRef} className={`relative overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={fotoRef} src={src} alt={alt} className="size-full object-cover object-[50%_40%] will-change-transform" style={{ transform: "scale(1.18)" }} />
      {children}
    </div>
  )
}
