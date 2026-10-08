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
      { threshold: 0, rootMargin: "0px 0px -12% 0px" }
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
      {/* Çizgi: mobilde solda, masaüstünde ortada */}
      <div ref={lineRef} className="absolute top-7 left-[26px] w-1 rounded-full bg-[#ecdcc0]/60 md:left-1/2 md:-translate-x-1/2">
        <div
          ref={fillRef}
          className="h-full w-full origin-top rounded-full bg-gradient-to-b from-[#f2cf7e] via-[#eda57a] to-[#e7a1b4]"
          style={{ transform: "scaleY(0)" }}
        />
      </div>

      <ol className="space-y-14 md:space-y-20">
        {duraklar.map((d, i) => {
          const sag = i % 2 === 1
          const Ikon = d.tur === "okul" ? GraduationCap : d.tur === "sertifika" ? Award : Briefcase
          const simdi = /bugün/i.test(d.tarih)
          if (simdi) {
            return (
              <li
                key={i}
                data-durak
                className="durak durak-simdi relative grid grid-cols-[56px_1fr] items-start gap-5 md:grid-cols-[1fr_96px_1fr] md:gap-8"
              >
                {/* Durak işareti: nabız gibi atan büyük nokta */}
                <div className="relative z-10 flex justify-center md:col-start-2 md:row-start-1">
                  <span aria-hidden className="simdi-nabiz absolute top-0 size-14 rounded-full bg-[#eda57a]/40 md:size-24" />
                  <div
                    data-nokta
                    className="durak-cicek relative flex size-14 items-center justify-center rounded-full bg-[#2a1708] ring-[6px] ring-white shadow-[0_12px_30px_-6px_rgba(184,92,50,0.7)] md:size-24"
                  >
                    <span className="absolute inset-[3px] rounded-full bg-gradient-to-br from-[#f2cf7e] via-[#eda57a] to-[#e7a1b4] opacity-90" />
                    <Ikon className="relative size-6 text-white md:size-9" />
                  </div>
                </div>

                {/* Kart: koyu, renkli çerçeveli */}
                <div className="durak-kart relative md:col-span-3 md:col-start-1 md:row-start-2 md:mx-auto md:w-full md:max-w-2xl md:text-center">
                  <div className="relative rounded-[30px] bg-gradient-to-br from-[#f2cf7e] via-[#eda57a] to-[#e7a1b4] p-[2px] shadow-[0_30px_70px_-25px_rgba(184,92,50,0.75)]">
                    <div className="relative overflow-hidden rounded-[28px] bg-[#2a1708] p-7 text-[#fff8ea] sm:p-10">
                      <div aria-hidden className="pointer-events-none absolute -top-24 -right-16 size-64 rounded-full bg-[#e7a1b4]/30 blur-3xl" />
                      <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 size-64 rounded-full bg-[#f2cf7e]/25 blur-3xl" />
                      <div className="relative flex flex-wrap items-center gap-3 md:justify-center">
                        <span className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.2em] text-[#4ade80]">
                          <span className="relative flex size-2">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#4ade80] opacity-75" />
                            <span className="relative inline-flex size-2 rounded-full bg-[#4ade80]" />
                          </span>
                          ŞU AN
                        </span>
                        <span className="text-sm font-bold text-[#f4d98f]">{d.tarih}</span>
                      </div>
                      <h3 className="relative mt-5 text-4xl leading-[1] font-extrabold tracking-tight sm:text-6xl">
                        <span className="vurgu vurgu-acik">
                          {d.baslik}
                        </span>
                      </h3>
                      <p className="relative mt-3 text-lg font-bold text-[#fff8ea]/85 sm:text-xl">{d.alt}</p>
                      {d.aciklama && (
                        <p className="relative mx-auto mt-4 max-w-xl leading-relaxed text-[#fff8ea]/70">{d.aciklama}</p>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            )
          }
          return (
            <li
              key={i}
              data-durak
              className={`durak relative grid grid-cols-[56px_1fr] items-start gap-5 md:grid-cols-[1fr_80px_1fr] md:gap-8 ${sag ? "durak-sag" : "durak-sol"}`}
            >
              {/* Durak işareti */}
              <div className="relative z-10 flex justify-center md:col-start-2 md:row-start-1">
                <div
                  data-nokta
                  className={`durak-cicek flex size-14 items-center justify-center rounded-full ring-[6px] ring-white shadow-[0_8px_20px_-6px_rgba(184,92,50,0.45)] md:size-16 ${
                    d.tur === "okul"
                      ? "bg-gradient-to-br from-[#eda57a] to-[#e7a1b4]"
                      : "bg-gradient-to-br from-[#f2cf7e] to-[#eda57a]"
                  }`}
                >
                  <Ikon className="size-6 text-white" />
                </div>
              </div>

              {/* Kart */}
              <div
                className={`durak-kart relative md:row-start-1 ${sag ? "md:col-start-3" : "md:col-start-1 md:text-right"}`}
              >
                <div className="group relative overflow-hidden rounded-[28px] bg-white p-6 shadow-[0_20px_50px_-25px_rgba(184,92,50,0.45)] ring-1 ring-[#ecdcc0] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-25px_rgba(184,92,50,0.6)] sm:p-8">
                  {/* Köşede renkli şerit */}
                  <div
                    className={`absolute top-0 h-full w-1.5 ${sag ? "left-0" : "left-0 md:right-0 md:left-auto"} ${
                      d.tur === "okul"
                        ? "bg-gradient-to-b from-[#e7a1b4] to-[#eda57a]"
                        : "bg-gradient-to-b from-[#f2cf7e] to-[#eda57a]"
                    }`}
                  />
                  <div className={`flex flex-wrap items-center gap-2 ${sag ? "" : "md:justify-end"}`}>
                    <span className="text-sm font-bold text-[#b85c32]">{d.tarih}</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-extrabold tracking-tight">{d.baslik}</h3>
                  <p className="mt-1 font-semibold text-[#2a1708]/60">{d.alt}</p>
                  {d.aciklama && <p className="mt-3 leading-relaxed text-[#2a1708]/75">{d.aciklama}</p>}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
