"use client"

import { useEffect, useRef } from "react"
import { Award, Briefcase, GraduationCap } from "lucide-react"

type Durak = {
  tur: "is" | "okul" | "sertifika"
  tarih: string
  baslik: string
  alt: string
  aciklama?: string
}

// Deneyim + eğitim tek bir yolculuk çizgisinde.
// Kaydırdıkça ortadaki çizgi sarı→turuncu→pembe dolar, her durakta bir işaret belirir.
export function Journey({ duraklar }: { duraklar: Durak[] }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const ucRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    // Çizgi ilk duraktan başlar, son durakta (şu anki işte) biter
    const olc = () => {
      const noktalar = wrap.querySelectorAll<HTMLElement>("[data-nokta]")
      const line = lineRef.current
      if (!line || noktalar.length < 2) return
      const w = wrap.getBoundingClientRect()
      const merkez = (el: HTMLElement) => {
        const r = el.getBoundingClientRect()
        return r.top - w.top + r.height / 2
      }
      const bas = merkez(noktalar[0])
      const son = merkez(noktalar[noktalar.length - 1])
      line.style.top = `${bas}px`
      line.style.height = `${son - bas}px`
    }

    // Çizginin dolması
    let raf = 0
    const update = () => {
      raf = 0
      const line = lineRef.current
      if (!line) return
      const r = line.getBoundingClientRect()
      const vh = window.innerHeight
      const p = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / Math.max(1, r.height)))
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`
      // Çizginin ucundaki parlak nokta dolan kısımla birlikte ilerler
      if (ucRef.current) {
        ucRef.current.style.transform = `translate(-50%, ${(p * r.height).toFixed(1)}px)`
        ucRef.current.style.opacity = p > 0.001 && p < 0.999 ? "1" : "0"
      }
    }
    olc()
    const ro = new ResizeObserver(() => {
      olc()
      update()
    })
    ro.observe(wrap)
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    // Durakların ekrana girince açılması
    const items = wrap.querySelectorAll<HTMLElement>("[data-durak]")
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-open")
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0, rootMargin: "0px 0px -18% 0px" }
    )
    items.forEach((el) => io.observe(el))

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
    }
  }, [])

  return (
    <div ref={wrapRef} className="relative">
      {/* Çizgi: ilk duraktan son durağa kadar, aşağı indikçe dolar (mobilde solda, masaüstünde ortada) */}
      <div ref={lineRef} className="absolute top-7 left-[26px] w-1.5 -translate-x-1/2 rounded-full bg-[#e6cdb6]/45 md:left-1/2">
        <div
          ref={fillRef}
          className="h-full w-full origin-top rounded-full bg-gradient-to-b from-[#e6cdb6] via-[#a87556] to-[#4a2b1d] shadow-[0_0_14px_rgba(168,117,86,0.45)]"
          style={{ transform: "scaleY(0)" }}
        />
        {/* Uçtaki parlak nokta */}
        <div
          ref={ucRef}
          aria-hidden
          className="absolute top-0 left-1/2 -mt-2.5 size-5 rounded-full opacity-0 transition-opacity duration-300"
          style={{ transform: "translate(-50%, 0)" }}
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-[#a87556]/50" />
          <span className="absolute inset-0 rounded-full bg-[#4a2b1d] ring-4 ring-[#fbfaf6] shadow-[0_0_18px_rgba(74,43,29,0.55)]" />
        </div>
      </div>

      <ol className="relative space-y-12 md:space-y-16">
        {duraklar.map((d, i) => {
          const sag = i % 2 === 1
          const Ikon = d.tur === "okul" ? GraduationCap : d.tur === "sertifika" ? Award : Briefcase
          const simdi = /bugün/i.test(d.tarih)
          if (simdi) {
            return (
              <li
                key={i}
                data-durak
                className="durak durak-simdi relative grid grid-cols-[56px_1fr] items-start gap-5 md:grid-cols-[1fr_88px_1fr] md:gap-8"
              >
                {/* Durak işareti: nabız gibi atan nokta */}
                <div className="relative z-10 flex justify-center md:col-start-2 md:row-start-1">
                  <span aria-hidden className="simdi-nabiz absolute top-0 size-14 rounded-full bg-[#4a2b1d]/30 md:size-[88px]" />
                  <div
                    data-nokta
                    className="durak-cicek relative flex size-14 items-center justify-center rounded-full bg-[#4a2b1d] ring-[6px] ring-[#fbfaf6] md:size-[88px]"
                  >
                    <Ikon className="size-6 text-[#fbfaf6] md:size-8" />
                  </div>
                </div>

                {/* Kart: acı kahve */}
                <div className="durak-kart relative md:col-span-3 md:col-start-1 md:row-start-2 md:mx-auto md:w-full md:max-w-2xl md:text-center">
                  <div className="rounded-2xl bg-[#4a2b1d] p-7 text-[#fbfaf6] sm:p-10">
                    <div className="flex flex-wrap items-center gap-3 md:justify-center">
                      <span className="inline-flex items-center gap-2 text-xs tracking-[0.12em] text-[#4ade80] uppercase">
                        <span className="relative flex size-2">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#4ade80] opacity-75" />
                          <span className="relative inline-flex size-2 rounded-full bg-[#4ade80]" />
                        </span>
                        Şu an
                      </span>
                      <span className="text-sm text-[#e6cdb6]">{d.tarih}</span>
                    </div>
                    <h3 className="mt-5 text-[clamp(32px,5vw,56px)] leading-[1] font-light">{d.baslik}</h3>
                    <p className="mt-3 text-lg text-[#fbfaf6]/80">{d.alt}</p>
                    {d.aciklama && <p className="mx-auto mt-4 max-w-xl leading-relaxed text-[#fbfaf6]/65">{d.aciklama}</p>}
                  </div>
                </div>
              </li>
            )
          }
          return (
            <li
              key={i}
              data-durak
              className={`durak relative grid grid-cols-[56px_1fr] items-start gap-5 md:grid-cols-[1fr_72px_1fr] md:gap-8 ${sag ? "durak-sag" : "durak-sol"}`}
            >
              {/* Durak işareti */}
              <div className="relative z-10 flex justify-center md:col-start-2 md:row-start-1">
                <div
                  data-nokta
                  className={`durak-cicek flex size-14 items-center justify-center rounded-full ring-[6px] ring-[#fbfaf6] md:size-[72px] ${
                    d.tur === "is" ? "bg-[#4a2b1d] text-[#fbfaf6]" : "bg-white text-[#4a2b1d]"
                  }`}
                >
                  <Ikon className="size-6" />
                </div>
              </div>

              {/* Kart */}
              <div className={`durak-kart relative md:row-start-1 ${sag ? "md:col-start-3" : "md:col-start-1 md:text-right"}`}>
                <div className="rounded-2xl bg-white p-6 transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(20,20,20,0.35)] sm:p-8">
                  <p className="text-[12.5px] tracking-[0.06em] text-[#4a2b1d] uppercase">{d.tarih}</p>
                  <h3 className="mt-3 text-2xl leading-snug font-medium">{d.baslik}</h3>
                  <p className="mt-1 text-[#6b665e]">{d.alt}</p>
                  {d.aciklama && <p className="mt-3 leading-relaxed text-[#141414]/70">{d.aciklama}</p>}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
