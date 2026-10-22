"use client"

import { useState } from "react"
import { AlbumKart } from "./album-kart"

type AlbumOzet = Parameters<typeof AlbumKart>[0]["a"]

const SECENEKLER = [
  { id: "hepsi", ad: "Tümü" },
  { id: "ralli", ad: "Ralliler" },
  { id: "etkinlik", ad: "Toplantı ve etkinlikler" },
  { id: "ofis", ad: "Ofisten kareler" },
]

export function AlbumFiltre({ albumler }: { albumler: AlbumOzet[] }) {
  const [secili, setSecili] = useState("hepsi")
  const liste = secili === "hepsi" ? albumler : albumler.filter((a) => a.kategori === secili)

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Albüm türü">
        {SECENEKLER.map((s) => {
          const sayi = s.id === "hepsi" ? albumler.length : albumler.filter((a) => a.kategori === s.id).length
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={secili === s.id}
              onClick={() => setSecili(s.id)}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                secili === s.id ? "bg-[#141414] text-[#fbfaf6]" : "bg-white text-[#141414]/70 hover:text-[#141414]"
              }`}
            >
              {s.ad} <span className="mono ml-1 opacity-60">{sayi}</span>
            </button>
          )
        })}
      </div>
      <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {liste.map((a) => (
          <AlbumKart key={a.slug} a={a} />
        ))}
      </div>
      {liste.length === 0 && <p className="mt-10 text-[#6b665e]">Bu türde henüz albüm yok.</p>}
    </div>
  )
}
