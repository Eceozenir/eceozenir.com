"use client"

import { useEffect, useRef } from "react"

// Sitedeki fare etkileşimleri (yalnızca fare kullanılan cihazlarda):
//  - data-imlec="Yazı": fare okunun yanında küçük bir etiket çıkar (ör. "Siteyi gez")
//  - data-miknatis: düğme fareye doğru hafifçe çekilir
//  - data-egim: kart fareye göre 3B eğilir, üstünden ışık geçer (--gx, --gy)
export function Etkilesim() {
  const etiketRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const uygun = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const sakin = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!uygun || sakin) return
    const etiket = etiketRef.current!
    let miknatis: HTMLElement | null = null
    let egim: HTMLElement | null = null

    const birak = () => {
      if (miknatis) miknatis.style.transform = ""
      if (egim) egim.style.transform = ""
      miknatis = egim = null
    }

    const hareket = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      const hedef = e.target as HTMLElement

      // Etiket: okun sağ altında durur
      const etiketli = hedef.closest<HTMLElement>("[data-imlec]")
      if (etiketli) {
        etiket.textContent = etiketli.dataset.imlec || ""
        etiket.style.transform = `translate(${x + 18}px, ${y + 20}px)`
        etiket.classList.add("acik")
      } else {
        etiket.classList.remove("acik")
      }

      // Mıknatıs
      const m = hedef.closest<HTMLElement>("[data-miknatis]")
      if (m !== miknatis && miknatis) miknatis.style.transform = ""
      miknatis = m
      if (m) {
        const r = m.getBoundingClientRect()
        m.style.transform = `translate(${(x - (r.left + r.width / 2)) * 0.22}px, ${(y - (r.top + r.height / 2)) * 0.3}px)`
      }

      // 3B eğim
      const g = hedef.closest<HTMLElement>("[data-egim]")
      if (g !== egim && egim) egim.style.transform = ""
      egim = g
      if (g) {
        const r = g.getBoundingClientRect()
        const px = (x - r.left) / r.width - 0.5
        const py = (y - r.top) / r.height - 0.5
        g.style.transform = `perspective(1000px) rotateX(${-py * 6}deg) rotateY(${px * 8}deg) translateY(-4px)`
        g.style.setProperty("--gx", `${(px + 0.5) * 100}%`)
        g.style.setProperty("--gy", `${(py + 0.5) * 100}%`)
      }
    }

    // Fare sayfadan ya da bir canlı önizlemenin içine çıkınca etiketi gizle
    const cikis = (e: MouseEvent) => {
      const r = e.relatedTarget as HTMLElement | null
      if (!r || r.tagName === "IFRAME") {
        etiket.classList.remove("acik")
        birak()
      }
    }

    window.addEventListener("mousemove", hareket, { passive: true })
    document.addEventListener("mouseout", cikis)
    return () => {
      window.removeEventListener("mousemove", hareket)
      document.removeEventListener("mouseout", cikis)
      birak()
    }
  }, [])

  return <div ref={etiketRef} aria-hidden className="imlec-etiket" />
}
