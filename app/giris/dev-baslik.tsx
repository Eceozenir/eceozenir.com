"use client"

import { useEffect, useRef } from "react"

// Başlığı ekran genişliğini tam dolduracak boyuta getirir; harfler sırayla yukarı süzülür.
export function DevBaslik({ metin }: { metin: string }) {
  const kapRef = useRef<HTMLDivElement>(null)
  const yaziRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const kap = kapRef.current
    const yazi = yaziRef.current
    if (!kap || !yazi) return
    const sigdir = () => {
      yazi.style.fontSize = "100px"
      const oran = kap.clientWidth / yazi.scrollWidth
      yazi.style.fontSize = `${Math.floor(100 * oran * 0.995)}px`
    }
    sigdir()
    document.fonts?.ready.then(sigdir)
    const ro = new ResizeObserver(sigdir)
    ro.observe(kap)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={kapRef} className="w-full overflow-x-clip">
      <h1
        ref={yaziRef}
        aria-label={metin}
        className="giris-baslik inline-block whitespace-nowrap"
        style={{
          fontWeight: 300,
          letterSpacing: "-0.04em",
          lineHeight: 0.9,
          textTransform: "uppercase",
          fontSize: "15vw",
          paddingTop: "0.2em",
          paddingBottom: "0.04em",
          color: "#111",
        }}
      >
        {Array.from(metin).map((h, i) => (
          <span
            key={i}
            aria-hidden
            className="giris-harf inline-block"
            style={{ animationDelay: `${120 + i * 55}ms`, whiteSpace: "pre" }}
          >
            {h}
          </span>
        ))}
      </h1>
    </div>
  )
}
