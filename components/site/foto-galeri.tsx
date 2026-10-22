"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

// Fotoğraf ızgarası + tam ekran görüntüleyici (klavye oklarıyla ve parmakla kaydırarak gezilir).
export function FotoGaleri({ fotolar, baslik }: { fotolar: string[]; baslik: string }) {
  const [acik, setAcik] = useState<number | null>(null)
  const dokunX = useRef(0)

  const kapat = useCallback(() => setAcik(null), [])
  const git = useCallback(
    (yon: number) => setAcik((i) => (i === null ? null : (i + yon + fotolar.length) % fotolar.length)),
    [fotolar.length]
  )

  useEffect(() => {
    if (acik === null) return
    const tus = (e: KeyboardEvent) => {
      if (e.key === "Escape") kapat()
      if (e.key === "ArrowRight") git(1)
      if (e.key === "ArrowLeft") git(-1)
    }
    window.addEventListener("keydown", tus)
    document.documentElement.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", tus)
      document.documentElement.style.overflow = ""
    }
  }, [acik, kapat, git])

  return (
    <>
      <div className="columns-2 gap-3 sm:gap-4 lg:columns-3">
        {fotolar.map((f, i) => (
          <button
            key={f}
            type="button"
            onClick={() => setAcik(i)}
            className="group mb-3 block w-full overflow-hidden rounded-xl bg-[#ebe6dc] sm:mb-4"
            aria-label={`${baslik}, fotoğraf ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={f}
              alt=""
              loading="lazy"
              decoding="async"
              className="w-full transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {acik !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${baslik} fotoğraf görüntüleyici`}
          className="fixed inset-0 z-[100] flex flex-col bg-[#0d0d0d]/95 backdrop-blur-sm"
          onTouchStart={(e) => (dokunX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const fark = e.changedTouches[0].clientX - dokunX.current
            if (Math.abs(fark) > 50) git(fark < 0 ? 1 : -1)
          }}
        >
          <div className="flex items-center justify-between px-4 py-3 text-sm text-white/70 sm:px-6">
            <span className="mono">
              {acik + 1} / {fotolar.length}
            </span>
            <button
              type="button"
              onClick={kapat}
              className="flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Kapat"
            >
              <X className="size-5" />
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-6 sm:px-20" onClick={kapat}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={acik}
              src={fotolar[acik]}
              alt={`${baslik}, fotoğraf ${acik + 1}`}
              className="foto-gir max-h-full max-w-full rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            {fotolar.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    git(-1)
                  }}
                  className="absolute top-1/2 left-3 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:flex"
                  aria-label="Önceki"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    git(1)
                  }}
                  className="absolute top-1/2 right-3 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:flex"
                  aria-label="Sonraki"
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
