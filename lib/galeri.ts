import fs from "node:fs"
import path from "node:path"
import { galeri as trGaleri } from "@/app/bilgilerim"

type Galeri = typeof trGaleri

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

export type Album = Galeri[number] & { fotolar: string[]; kapakFoto: string }

// galeri: seçili dildeki albüm listesi (fotoğraflar iki dilde aynı klasörden gelir)
export function albumler(galeri: Galeri = trGaleri): Album[] {
  return galeri.map((a) => {
    const fotolar = albumFotograflari(a.slug)
    return { ...a, fotolar, kapakFoto: a.kapak || fotolar[0] || "" }
  })
}

export function album(slug: string, galeri: Galeri = trGaleri): Album | undefined {
  return albumler(galeri).find((a) => a.slug === slug)
}

