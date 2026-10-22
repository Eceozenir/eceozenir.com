"use client"

import { useEffect, useRef } from "react"

// Sitedeki fare etkileşimleri (yalnızca fare kullanılan cihazlarda çalışır):
//  - Özel imleç: fareyi yumuşakça takip eden halka. Bağlantılarda büyür;
//    data-imlec="Yazı" verilen öğelerde halkanın içinde o yazı görünür.
//  - data-miknatis: düğme fareye doğru çekilir.
//  - data-egim: kart fareye göre 3B eğilir, üstünden ışık geçer (--gx, --gy).
export function Etkilesim() {
  const noktaRef = useRef<HTMLDivElement>(null)
  const halkaRef = useRef<HTMLDivElement>(null)
  const etiketRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const uygun = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const sakin = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!uygun || sakin) return
    const nokta = noktaRef.current!
    const halka = halkaRef.current!
    const etiket = etiketRef.current!
    document.documentElement.classList.add("ozel-imlec")

    let x = -100, y = -100, hx = -100, hy = -100
    let olcek = 1, hedefOlcek = 1
    let gorunur = false
    let miknatis: HTMLElement | null = null
    let egim: HTMLElement | null = null
    let raf = 0

    const goster = (v: boolean) => {
      gorunur = v
      nokta.style.opacity = halka.style.opacity = v ? "1" : "0"
    }

    const birak = () => {
      if (miknatis) {
        miknatis.style.transform = ""
        miknatis = null
      }
      if (egim) {
        egim.style.transform = ""
        egim = null
      }
    }

    const hareket = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      if (!gorunur) goster(true)
      const hedef = e.target as HTMLElement

      // Halka: bağlantı/düğme üstünde büyür, etiket varsa yazar
      const etiketli = hedef.closest<HTMLElement>("[data-imlec]")
      const tiklanir = hedef.closest("a, button, [role=tab], summary, label")
      if (etiketli) {
        etiket.textContent = etiketli.dataset.imlec || ""
        hedefOlcek = 3.4
        halka.classList.add("imlec-dolu")
      } else {
        etiket.textContent = ""
        hedefOlcek = tiklanir ? 1.8 : 1
        halka.classList.remove("imlec-dolu")
      }

      // Mıknatıs
      const m = hedef.closest<HTMLElement>("[data-miknatis]")
      if (m !== miknatis && miknatis) miknatis.style.transform = ""
      miknatis = m
      if (m) {
        const r = m.getBoundingClientRect()
        const dx = x - (r.left + r.width / 2)
        const dy = y - (r.top + r.height / 2)
        m.style.transform = `translate(${dx * 0.28}px, ${dy * 0.38}px)`
      }

      // 3B eğim
      const g = hedef.closest<HTMLElement>("[data-egim]")
      if (g !== egim && egim) egim.style.transform = ""
      egim = g
      if (g) {
        const r = g.getBoundingClientRect()
        const px = (x - r.left) / r.width - 0.5
        const py = (y - r.top) / r.height - 0.5
        g.style.transform = `perspective(1000px) rotateX(${-py * 7}deg) rotateY(${px * 9}deg) translateY(-4px)`
        g.style.setProperty("--gx", `${(px + 0.5) * 100}%`)
        g.style.setProperty("--gy", `${(py + 0.5) * 100}%`)
      }
    }

    // Fare sayfadan ya da bir iframe'in (canlı site önizlemesi) içine çıkınca imleci gizle
    const cikis = (e: MouseEvent) => {
      const r = e.relatedTarget as HTMLElement | null
      if (!r || r.tagName === "IFRAME") {
        goster(false)
        birak()
      }
    }
    const bas = () => (hedefOlcek *= 0.75)
    const birakTus = () => (hedefOlcek /= 0.75)

    const kare = () => {
      hx += (x - hx) * 0.18
      hy += (y - hy) * 0.18
      olcek += (hedefOlcek - olcek) * 0.2
      nokta.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      halka.style.transform = `translate(${hx}px, ${hy}px) translate(-50%, -50%) scale(${olcek})`
      raf = requestAnimationFrame(kare)
    }
    raf = requestAnimationFrame(kare)

    window.addEventListener("mousemove", hareket, { passive: true })
    document.addEventListener("mouseout", cikis)
    window.addEventListener("mousedown", bas)
    window.addEventListener("mouseup", birakTus)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", hareket)
      document.removeEventListener("mouseout", cikis)
      window.removeEventListener("mousedown", bas)
      window.removeEventListener("mouseup", birakTus)
      document.documentElement.classList.remove("ozel-imlec")
      birak()
    }
  }, [])

  return (
    <>
      <div ref={noktaRef} aria-hidden className="imlec-nokta" />
      <div ref={halkaRef} aria-hidden className="imlec-halka">
        <span ref={etiketRef} />
      </div>
    </>
  )
}
