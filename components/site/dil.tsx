"use client"

import { createContext, useContext } from "react"
import { useRouter } from "next/navigation"
import { SOZLUK, type Dil, type Sozluk } from "@/lib/sozluk"

const DilBaglam = createContext<{ dil: Dil; t: Sozluk }>({ dil: "tr", t: SOZLUK.tr })

// Seçili dili tarayıcıdaki bileşenlere ulaştırır
export function DilSaglayici({ dil, children }: { dil: Dil; children: React.ReactNode }) {
  return <DilBaglam.Provider value={{ dil, t: SOZLUK[dil] }}>{children}</DilBaglam.Provider>
}

export function useDil() {
  return useContext(DilBaglam)
}

// TR / EN düğmesi: seçimi çereze yazar ve sayfayı o dilde yeniden çizer
export function DilDugmesi({ beyaz = false, buyuk = false }: { beyaz?: boolean; buyuk?: boolean }) {
  const { dil, t } = useDil()
  const router = useRouter()
  const sec = (yeni: Dil) => {
    if (yeni === dil) return
    document.cookie = `dil=${yeni}; path=/; max-age=31536000; samesite=lax`
    document.documentElement.lang = yeni
    router.refresh()
  }
  const sinif = (aktif: boolean) =>
    `rounded-full px-2.5 py-1 transition-colors ${
      aktif
        ? beyaz
          ? "bg-white text-[#141414]"
          : "bg-[#141414] text-[#fbfaf6]"
        : beyaz
          ? "text-white/75 hover:text-white"
          : "text-[#141414]/60 hover:text-[#141414]"
    }`
  return (
    <div
      role="group"
      aria-label={t.dilDegistir}
      className={`inline-flex items-center gap-0.5 rounded-full p-0.5 font-medium tracking-[0.06em] ${buyuk ? "text-sm" : "text-[11.5px]"} ${
        beyaz ? "bg-white/10" : "bg-[#141414]/[0.06]"
      }`}
    >
      <button type="button" onClick={() => sec("tr")} aria-pressed={dil === "tr"} lang="tr" className={sinif(dil === "tr")}>
        TR
      </button>
      <button type="button" onClick={() => sec("en")} aria-pressed={dil === "en"} lang="en" className={sinif(dil === "en")}>
        EN
      </button>
    </div>
  )
}
