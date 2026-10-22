"use client"

import { useEffect, useRef, useState } from "react"
import { Flag, Play, RotateCcw, Square } from "lucide-react"

// TOSFED bölümündeki oynanabilir kronometre: zaman kayıt işine küçük bir gönderme.
function bicim(ms: number) {
  const dk = Math.floor(ms / 60000)
  const sn = Math.floor((ms % 60000) / 1000)
  const sl = Math.floor(ms % 1000)
  return `${String(dk).padStart(2, "0")}:${String(sn).padStart(2, "0")}.${String(sl).padStart(3, "0")}`
}

export function Kronometre() {
  const [sure, setSure] = useState(0)
  const [calisiyor, setCalisiyor] = useState(false)
  const [turlar, setTurlar] = useState<number[]>([])
  const basRef = useRef(0)
  const birikmisRef = useRef(0)

  useEffect(() => {
    if (!calisiyor) return
    let raf = 0
    const kare = () => {
      setSure(birikmisRef.current + performance.now() - basRef.current)
      raf = requestAnimationFrame(kare)
    }
    raf = requestAnimationFrame(kare)
    return () => cancelAnimationFrame(raf)
  }, [calisiyor])

  const baslatDurdur = () => {
    if (calisiyor) {
      birikmisRef.current += performance.now() - basRef.current
      setCalisiyor(false)
    } else {
      basRef.current = performance.now()
      setCalisiyor(true)
    }
  }
  const tur = () => calisiyor && setTurlar((t) => [sure, ...t].slice(0, 4))
  const sifirla = () => {
    setCalisiyor(false)
    birikmisRef.current = 0
    setSure(0)
    setTurlar([])
  }
  const enIyi = turlar.length
    ? Math.min(...turlar.map((t, i) => t - (turlar[i + 1] ?? 0)))
    : 0

  return (
    <div className="rounded-2xl bg-white/[0.05] p-5 sm:p-6">
      <div className="flex items-center justify-between text-xs text-[#fbfaf6]/45">
        <span>ETAP ZAMANI</span>
        <span className="flex items-center gap-1.5">
          <span className={`size-1.5 rounded-full ${calisiyor ? "animate-pulse bg-[#4ade80]" : "bg-white/30"}`} />
          {calisiyor ? "KAYITTA" : "HAZIR"}
        </span>
      </div>
      <p className="mt-4 text-center text-[clamp(44px,7vw,68px)] leading-none font-light tracking-tight tabular-nums">{bicim(sure)}</p>
      <div className="mt-6 grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={baslatDurdur}
          data-miknatis
          className={`flex items-center justify-center gap-2 rounded-full py-3 text-sm font-medium transition-colors ${
            calisiyor ? "bg-[#f4c7a1] text-[#813413]" : "bg-[#fbfaf6] text-[#813413]"
          }`}
        >
          {calisiyor ? <Square className="size-3.5" /> : <Play className="size-3.5" />}
          {calisiyor ? "Durdur" : "Başlat"}
        </button>
        <button
          type="button"
          onClick={tur}
          disabled={!calisiyor}
          data-miknatis
          className="flex items-center justify-center gap-2 rounded-full bg-white/10 py-3 text-sm transition-colors hover:bg-white/15 disabled:opacity-40"
        >
          <Flag className="size-3.5" /> Tur
        </button>
        <button
          type="button"
          onClick={sifirla}
          data-miknatis
          className="flex items-center justify-center gap-2 rounded-full bg-white/10 py-3 text-sm transition-colors hover:bg-white/15"
        >
          <RotateCcw className="size-3.5" /> Sıfırla
        </button>
      </div>
      {turlar.length > 0 && (
        <ol className="mt-5 space-y-1.5 text-sm tabular-nums">
          {turlar.map((t, i) => {
            const fark = t - (turlar[i + 1] ?? 0)
            return (
              <li key={t} className="foto-gir flex justify-between rounded-lg bg-white/[0.04] px-4 py-2.5">
                <span className="text-[#fbfaf6]/55">Tur {turlar.length - i}</span>
                <span className={fark === enIyi && turlar.length > 1 ? "text-[#4ade80]" : ""}>+{bicim(fark)}</span>
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}
