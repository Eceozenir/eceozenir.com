import fs from "node:fs"
import path from "node:path"
import { galeri } from "@/app/bilgilerim"

// Galeri fotoğraflarını public/galeri/<slug> klasöründen otomatik okur.
const FOTO = /\.(jpe?g|png|webp|avif)$/i

export function albumFotograflari(slug: string): string[] {
  const klasor = path.join(process.cwd(), "public", "galeri", slug)
  try {
    return fs
      .readdirSync(klasor)
      .filter((f) => FOTO.test(f) && !f.startsWith("."))
      .sort((a, b) => a.localeCompare(b, "tr", { numeric: true }))
      .map((f) => `/galeri/${slug}/${encodeURIComponent(f)}`)
  } catch {
    return []
  }
}

export type Album = (typeof galeri)[number] & { fotolar: string[]; kapakFoto: string }

export function albumler(): Album[] {
  return galeri.map((a) => {
    const fotolar = albumFotograflari(a.slug)
    return { ...a, fotolar, kapakFoto: a.kapak || fotolar[0] || "" }
  })
}

export function album(slug: string): Album | undefined {
  return albumler().find((a) => a.slug === slug)
}

export const KATEGORI_AD: Record<string, string> = { ralli: "Ralli", etkinlik: "Etkinlik", ofis: "Ofis" }
