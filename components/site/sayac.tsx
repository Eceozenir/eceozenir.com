"use client"

import { useEffect, useRef, useState } from "react"

// "12+", "%95", "260" gibi değerleri ekrana gelince sıfırdan sayarak gösterir.
export function Sayac({ deger, className = "" }: { deger: string; className?: string }) {
  const m = deger.match(/^(\D*)(\d+)(\D*)$/)
  const hedef = m ? Number(m[2]) : 0
  const [n, setN] = useState(m ? 0 : hedef)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!m || !ref.current) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(hedef)
      return
    }
    let raf = 0
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const bas = performance.now()
        const sure = 1400
        const kare = (t: number) => {
          const p = Math.min(1, (t - bas) / sure)
          setN(Math.round(hedef * (1 - Math.pow(1 - p, 3))))
          if (p < 1) raf = requestAnimationFrame(kare)
        }
        raf = requestAnimationFrame(kare)
      },
      { threshold: 0.5 }
    )
    io.observe(ref.current)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hedef])

  return (
    <span ref={ref} className={className}>
      {m ? `${m[1]}${n}${m[3]}` : deger}
    </span>
  )
}
